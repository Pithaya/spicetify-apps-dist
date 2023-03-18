# The Eternal Jukebox

For when your favorite song just isn't long enough.

![preview](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/eternal-jukebox/preview.png)

A rewrite of the [Infinite / Eternal Jukebox](https://eternalbox.dev/jukebox_index.html) for Spicetify.  
It finds pathways through similar segments of the song and plays a never-ending and ever changing version of the song.

> **Warning**  
> The custom app is still in **beta**.  
> See [known issues](#known-issues) and [upcoming features](#upcoming-features).

## Installation

1. Run `spicetify config-dir` to open the spicetify folder
2. Go to the `CustomApps` folder
3. Create a `eternal-jukebox` folder
4. Copy the files from the [custom app's dist branch](https://github.com/Pithaya/spicetify-apps-dist/tree/dist/eternal-jukebox) inside it.

Then, run the following commands:

```sh
spicetify config custom_apps eternal-jukebox
spicetify apply
```

## Usage

A new "infinity" button allows you to enable and disable the jukebox. As long as the jukebox is enabled, the current song will play endlessly.

![button](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/eternal-jukebox/docs/button.JPG)

Changing the current song will automatically play it through the jukebox.

![sidebar](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/eternal-jukebox/docs/sidebar.JPG)

The custom app allows you to see a visualization of the jukebox's progress through the song.

Holding the `SHIFT` key allows you to keep repeating a part of the song by "jumping" through edges linking the same beats.

## Known issues

-   Audio lag when jumping between parts of the song
-   Jukebox "freezing" and getting out of sync
-   Songs getting stuck in short loops due to issues with the graph generation
-   Playbar button not correctly synced with the current state of the jukebox

## Upcoming features

-   More graph interactivity
-   Settings menu

## Uninstall

1. Run `spicetify config-dir` to open the spicetify folder
2. Go to the `CustomApps` folder
3. Delete the `eternal-jukebox` folder

Then, run the following commands:

```sh
spicetify config custom_apps eternal-jukebox-
spicetify apply
```
