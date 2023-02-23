import { Remixer } from '../helpers/remixer';
import { JukeboxSongState } from './jukebox-song-state';
import {
    BehaviorSubject,
    fromEvent,
    Observable,
    Subject,
    Subscription,
} from 'rxjs';
import { JukeboxSettings } from './jukebox-settings.js';
import { GraphGenerator } from '../helpers/graph-generator.js';

import { Driver } from '../driver';
import { getAudioAnalysis, getId } from '@shared';

/**
 * Global class to control the jukebox.
 */
export class Jukebox {
    /**
     * The jukebox state for the current track.
     */
    private _songState: JukeboxSongState | null = null;

    private songStateSubject: BehaviorSubject<JukeboxSongState | null> =
        new BehaviorSubject<JukeboxSongState | null>(null);
    public songState$: Observable<JukeboxSongState | null> =
        this.songStateSubject.asObservable();

    public get songState(): JukeboxSongState | null {
        return this._songState;
    }

    public set songState(value: JukeboxSongState | null) {
        this._songState = value;
        this.songStateSubject.next(value);
    }

    /**
     * Jukebox settings.
     */
    public settings: JukeboxSettings;

    /**
     * Jukebox driver.
     */
    private driver: Driver | null = null;

    /**
     * Controls if the jukebox is enabled.
     */
    private _isEnabled = false;

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public set isEnabled(value: boolean) {
        this._isEnabled = value;

        if (value) {
            this.enable();
        } else {
            this.disable();
        }
    }

    private songChangedSubscription: Subscription = new Subscription();
    private driverProcessSubscription: Subscription = new Subscription();

    private statsChangedSubject: Subject<void> = new Subject<void>();
    public statsChanged$: Observable<void> =
        this.statsChangedSubject.asObservable();

    public constructor() {
        // TODO: Get settings from local storage
        this.settings = new JukeboxSettings();
    }

    /**
     * Starts the Jukebox.
     */
    public async enable(): Promise<void> {
        await this.start();

        let source = fromEvent(Spicetify.Player, 'songchange');
        let subscription = source.subscribe(() => {
            this.stop();
            this.start();
        });

        this.songChangedSubscription.add(subscription);
    }

    /**
     * Disable the Jukebox.
     */
    public disable(): void {
        this.stop();
        this.songChangedSubscription.unsubscribe();
        this.songChangedSubscription = new Subscription();
    }

    /**
     * Stops the Jukebox.
     */
    private stop(): void {
        this.driver?.stop();
        this.driver = null;
        this.driverProcessSubscription.unsubscribe();
        this.driverProcessSubscription = new Subscription();
        this.songState = null;
    }

    /**
     * Initialize and start the jukebox for the current track.
     */
    private async start(): Promise<void> {
        const currentTrack = Spicetify.Player.data.track;

        if (currentTrack === undefined) {
            return;
        }

        Spicetify.showNotification('Fetching analysis for song...');
        const uri = Spicetify.URI.fromString(currentTrack.uri);
        const id = getId(uri);
        const analysis = await getAudioAnalysis(id);

        if (analysis === null) {
            Spicetify.showNotification(
                'No analysis available for this track.',
                true
            );
            this.disable();
        }

        // Preprocess the track
        const remixedAnalysis = new Remixer(analysis).remixTrack();

        // Generate branches
        const branchGenerator = new GraphGenerator(
            this.settings,
            remixedAnalysis.beats
        );

        const graph = branchGenerator.generateGraph();

        this.songState = new JukeboxSongState(
            currentTrack,
            remixedAnalysis,
            graph
        );

        this.driver = new Driver(this.songState, this.settings);
        this.driverProcessSubscription.add(
            this.driver.onProgress$.subscribe(() => {
                this.statsChangedSubject.next();
            })
        );
        this.driver.start();
    }
}
