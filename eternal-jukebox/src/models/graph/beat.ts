import { Edge } from './edge';

/**
 * Represents a beat of the song in the song graph.
 */
export class Beat {
    /**
     * Beat index.
     */
    public readonly index: number;

    /**
     * Is this beat playing.
     */
    public isPlaying: boolean = false;

    /**
     * The next beat in the song.
     */
    public next: Beat | null = null;

    /**
     * The previous beat in the song.
     */
    public previous: Beat | null = null;

    /**
     * Neighbours for this beat.
     */
    public neighbours: Edge[] = [];

    /**
     * The starting point (in seconds) of the beat.
     */
    public start: number;

    /**
     * The duration (in seconds) of the beat.
     */
    public duration: number;

    /**
     * Number of time this beat has been played.
     */
    public playCount: number = 0;

    /**
     * The end point (in seconds) of the beat.
     */
    public get end(): number {
        return this.start + this.duration;
    }

    constructor(index: number, start: number, duration: number) {
        this.index = index;
        this.start = start;
        this.duration = duration;
    }
}
