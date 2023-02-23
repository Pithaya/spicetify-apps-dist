import { Beat } from '../graph/beat';
import { Point } from './point';

export interface IBeatDrawData {
    beat: Beat;

    percentFromStart: number;
    percentOfSong: number;

    // Outer arc
    outerArcStart: Point;
    outerArcEnd: Point;

    // Inner arc
    innerArcStart: Point;
    innerArcEnd: Point;

    drawCommand: string;

    color: string;
    activeColor: string;
}
