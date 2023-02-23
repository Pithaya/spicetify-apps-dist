import React from 'react';
import styles from '../css/app.module.scss';
import { IEdgeDrawData } from '../models/visualization/edge-draw-data.interface';

interface IProps {
    drawData: IEdgeDrawData;
}

interface IState {
    isHovered: boolean;
}

export class VisualizerEdge extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    render() {
        return (
            <path
                className={`${styles['edge-path']} ${
                    this.props.drawData.edge.isPlaying ? 'is-active' : ''
                }`}
                fill="none"
                stroke={
                    this.props.drawData.edge.isPlaying || this.state.isHovered
                        ? this.props.drawData.activeColor
                        : this.props.drawData.color
                }
                strokeWidth={this.props.drawData.strokeWidth}
                d={this.props.drawData.drawCommand}
                onMouseOver={(event) => this.onMouseOver(event.target as Node)}
                onMouseOut={() => this.setState(() => ({ isHovered: false }))}
            >
                <title>
                    {`${this.props.drawData.edge.source.index} - ${this.props.drawData.edge.destination.index}`}
                </title>
            </path>
        );
    }

    private onMouseOver(node: Node) {
        const svg = document.getElementById('#jukebox-graph');
        svg?.firstChild?.appendChild(node);

        this.setState(() => ({ isHovered: true }));
    }
}
