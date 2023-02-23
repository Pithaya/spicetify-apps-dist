import styles from '../css/app.module.scss';
import React from 'react';
import tinycolor from 'tinycolor2';
import { Beat } from '../models/graph/beat';
import { Segment } from '@shared';
import { RemixedTimeInterval } from '../models/remixer.types';
import { Point } from '../models/visualization/point';
import { getPercentOfValue, getPointFromPercent } from '../utils/math-utils';
import { IBeatDrawData } from '../models/visualization/beat-draw-data.interface';
import { VisualizerSlice } from './visualizer-slice.component';
import { IEdgeDrawData } from '../models/visualization/edge-draw-data.interface';
import { VisualizerEdge } from './visualizer-edge.component';

// TODO: Update tile height depending on each beat's play count.

interface IProps {
    beats: Beat[];
    remixedBeats: RemixedTimeInterval[];
    segments: Segment[];
}

interface IState {}

// Reference: https://dev.to/mustapha/how-to-create-an-interactive-svg-donut-chart-using-angular-19eo
export class JukeboxVisualizer extends React.Component<IProps, IState> {
    private cmin: number[] = [];
    private cmax: number[] = [];

    private beatsDrawData: IBeatDrawData[] = [];
    private edgesDrawData: IEdgeDrawData[] = [];

    constructor(props: IProps) {
        super(props);
    }

    render() {
        if (this.props.beats.length === 0 || this.props.segments.length === 0) {
            return <div>Loading...</div>;
        }

        // TODO: Could be responsive
        const svgSize = 600;
        const halfSize = svgSize / 2;

        // TODO: memoize this
        this.initSvgDrawData(svgSize, halfSize);

        return (
            <div>
                <svg
                    id="#jukebox-graph"
                    height={svgSize}
                    width={svgSize}
                    viewBox={`0 0 ${svgSize} ${svgSize}`}
                    className={styles['jukebox-graph']}
                >
                    <g
                        transform={`scale(-1,1) translate(${-svgSize}, 0) rotate(-90,${halfSize},${halfSize}) `}
                    >
                        {this.beatsDrawData.map((currentData) => (
                            <VisualizerSlice drawData={currentData} />
                        ))}
                        {this.edgesDrawData.map((currentData) => (
                            <VisualizerEdge drawData={currentData} />
                        ))}
                    </g>
                </svg>
            </div>
        );
    }

    private initSvgDrawData(svgSize: number, halfSize: number): void {
        this.normalizeColor();

        // Prevent an empty first slice if the first beat doesn't start at 0
        const offset = this.props.beats[0].start;

        // Use the run time from the last beat
        const totalDuration =
            this.props.beats[this.props.beats.length - 1].start +
            this.props.beats[this.props.beats.length - 1].duration -
            offset;

        const innerCircleRadius = getPercentOfValue(40, svgSize);
        const tileHeight = getPercentOfValue(2, svgSize);
        const outerCircleRadius = innerCircleRadius + tileHeight;

        this.beatsDrawData = this.getBeatsDrawData(
            offset,
            totalDuration,
            outerCircleRadius,
            innerCircleRadius,
            svgSize,
            tileHeight
        );
        this.edgesDrawData = this.getEdgesDrawData(
            this.beatsDrawData,
            halfSize
        );
    }

    private getBeatsDrawData(
        offset: number,
        totalDuration: number,
        outerCircleRadius: number,
        innerCircleRadius: number,
        svgSize: number,
        tileHeight: number
    ): IBeatDrawData[] {
        return this.props.beats.map((beat) => {
            const percentFromStart =
                ((beat.start - offset) * 100) / totalDuration;
            const percentOfSong = (beat.duration * 100) / totalDuration;

            // Outer arc
            const outerArcStart = getPointFromPercent(
                percentFromStart,
                outerCircleRadius + (beat.isPlaying ? tileHeight : 0),
                svgSize
            );
            const outerArcEnd = getPointFromPercent(
                percentFromStart + percentOfSong,
                outerCircleRadius + (beat.isPlaying ? tileHeight : 0),
                svgSize
            );

            // Inner arc
            const innerArcStart = getPointFromPercent(
                percentFromStart,
                innerCircleRadius,
                svgSize
            );
            const innerArcEnd = getPointFromPercent(
                percentFromStart + percentOfSong,
                innerCircleRadius,
                svgSize
            );

            const color = this.getBeatColor(beat);

            const drawCommand = `M ${outerArcStart.toString()} 
            A ${outerCircleRadius},${outerCircleRadius} 0 0 0 ${outerArcEnd.toString()}
            L ${innerArcEnd.toString()}
            A ${innerCircleRadius},${innerCircleRadius} 0 0 1 ${innerArcStart.toString()}`;

            return {
                beat,
                percentFromStart,
                percentOfSong,
                outerArcStart,
                outerArcEnd,
                innerArcStart,
                innerArcEnd,
                drawCommand: drawCommand,
                color: color,
                activeColor: tinycolor(color)
                    .complement()
                    .saturate(100)
                    .toHexString(),
            } as IBeatDrawData;
        });
    }

    private getEdgesDrawData(
        beatDrawData: IBeatDrawData[],
        halfSize: number
    ): IEdgeDrawData[] {
        const result = [];

        for (const drawData of beatDrawData) {
            for (const neighbour of drawData.beat.neighbours) {
                const startData = beatDrawData[neighbour.source.index];
                const endData = beatDrawData[neighbour.destination.index];

                const edgeStart = Point.getMiddlePoint(
                    startData.innerArcStart,
                    startData.innerArcEnd
                );
                const edgeEnd = Point.getMiddlePoint(
                    endData.innerArcStart,
                    endData.innerArcEnd
                );

                const startWidth = Point.getDistanceBetweenPoints(
                    startData.innerArcStart,
                    startData.innerArcEnd
                );

                const endWidth = Point.getDistanceBetweenPoints(
                    endData.innerArcStart,
                    endData.innerArcEnd
                );

                result.push({
                    edge: neighbour,
                    strokeWidth: Math.min(startWidth, endWidth),
                    drawCommand: `
                        M ${edgeStart.toString()}
                        Q ${halfSize},${halfSize} ${edgeEnd.toString()}`,
                    color: drawData.color,
                    activeColor: drawData.activeColor,
                } as IEdgeDrawData);
            }
        }

        return result;
    }

    public componentDidUpdate(prevProps: IProps) {
        const activeBranch = document.querySelector('svg path.is-active');
        if (activeBranch !== null) {
            this.pathToFront(activeBranch);
        }
    }

    private pathToFront(node: Node): void {
        const svg = document.getElementById('#jukebox-graph');
        svg?.firstChild?.appendChild(node);
    }

    private normalizeColor() {
        this.cmin = [100, 100, 100];
        this.cmax = [-100, -100, -100];

        for (const segment of this.props.segments) {
            for (let j = 0; j < 3; j++) {
                let timbre = segment.timbre[j + 1];

                if (timbre < this.cmin[j]) {
                    this.cmin[j] = timbre;
                }

                if (timbre > this.cmax[j]) {
                    this.cmax[j] = timbre;
                }
            }
        }
    }

    /**
     * Get a color for this beat, in hex format.
     * @param beat The beat.
     * @returns The color.
     */
    private getBeatColor(beat: Beat): string {
        const segment =
            this.props.remixedBeats[beat.index].firstOverlappingSegment ?? null;

        if (segment !== null) {
            return this.getSegmentColor(segment);
        } else {
            return '#000';
        }
    }

    /**
     * Use the segment's timbre to get a color in hex format.
     * @param segment The segment.
     * @returns The color.
     */
    private getSegmentColor(segment: Segment): string {
        let results = [];

        for (let i = 0; i < 3; i++) {
            const timbre = segment.timbre[i + 1];
            var norm = (timbre - this.cmin[i]) / (this.cmax[i] - this.cmin[i]);

            results[i] = norm;
        }

        const rgb = tinycolor.fromRatio({
            r: results[1],
            g: results[2],
            b: results[0],
        });
        return rgb.toHexString();
    }
}
