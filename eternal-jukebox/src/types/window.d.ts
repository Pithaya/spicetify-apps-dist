import { Jukebox } from '../models/jukebox';

declare global {
    interface Window {
        jukebox: Jukebox;
    }
}
