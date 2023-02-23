import React from 'react';
import styles from '../css/app.module.scss';
import { IBeatDrawData } from '../models/visualization/beat-draw-data.interface';

interface IProps {
    drawData: IBeatDrawData;
}

interface IState {
    isHovered: boolean;
}

export class VisualizerSlice extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    // TODO: Seek on click
    render() {
        return (
            <path
                className={styles['beat-path']}
                fill={
                    this.props.drawData.beat.isPlaying || this.state.isHovered
                        ? this.props.drawData.activeColor
                        : this.props.drawData.color
                }
                d={this.props.drawData.drawCommand}
                onMouseOver={() => this.setState(() => ({ isHovered: true }))}
                onMouseOut={() => this.setState(() => ({ isHovered: false }))}
            >
                <title>Beat {this.props.drawData.beat.index}</title>
            </path>
        );
    }
}
