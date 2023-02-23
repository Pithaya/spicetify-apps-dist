import styles from '../css/app.module.scss';
import React from 'react';
import { JukeboxSongState } from '../models/jukebox-song-state';
import { JukeboxVisualizer } from './jukebox-visualizer.component';
import { Subscription } from 'rxjs';

// TODO: Add settings button and modal
// TODO: Show branch chance below the visualization
// TODO: Add artist name

interface IProps {
    songState: JukeboxSongState;
}

interface IState {
    playedBeats: number;
    listenTime: number;
}

export class HomeComponent extends React.Component<IProps, IState> {
    private subscription: Subscription = new Subscription();

    constructor(props: IProps) {
        super(props);

        this.state = {
            playedBeats: 0,
            listenTime: 0,
        };
    }

    componentDidMount(): void {
        this.subscription.add(
            window.jukebox.statsChanged$.subscribe(() => {
                this.setState(() => {
                    return {
                        playedBeats: this.props.songState.beatsPlayed,
                        listenTime:
                            new Date().getTime() -
                            this.props.songState.startTime,
                    };
                });
            })
        );
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className={styles.container}>
                <h1 style={{ textAlign: 'center' }}>
                    {this.props.songState.track.metadata?.title}
                </h1>

                <JukeboxVisualizer
                    beats={this.props.songState.graph.beats}
                    segments={this.props.songState.analysis.segments}
                    remixedBeats={this.props.songState.analysis.beats}
                ></JukeboxVisualizer>

                <div className={styles.stats}>
                    <span id="sbeats">
                        Total Beats:
                        <span id="beats">{this.state.playedBeats}</span>
                    </span>
                    <span id="stime">
                        Listen Time:
                        <span id="time">
                            {this.millisToMinutesAndSeconds(
                                this.state.listenTime
                            )}
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    private millisToMinutesAndSeconds(millis: number): string {
        var minutes = Math.floor(millis / 60000);
        var seconds = Math.floor((millis % 60000) / 1000);
        return seconds === 60
            ? minutes + 1 + ':00'
            : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
}
