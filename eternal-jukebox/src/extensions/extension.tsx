import { waitForElement } from '@shared';
import React from 'react';
import ReactDOM from 'react-dom';
import { PlaybarButton } from '../components/playbar-button.component';
import { Jukebox } from '../models/jukebox';

// TODO: Switch to functions components
// TODO: Add i18n

(async () => {
    while (!Spicetify?.Platform) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const reactDom = Spicetify.ReactDOM as typeof ReactDOM;

    const element = await waitForElement('.player-controls__right');

    window.jukebox = new Jukebox();

    // TODO: createRoot + root.render()
    reactDom.render(
        reactDom.createPortal(<PlaybarButton />, element),
        document.createElement('div')
    );
})();
