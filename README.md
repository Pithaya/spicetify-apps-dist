# Playlist maker

Create a playlist from a drag and drop editor.

Add sources, filters and processing steps to combine tracks from albums, artists, liked songs, and more.  
Save your workflows and reload them later.

![preview](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/playlist-maker/preview.png)

When a workflow is executed, play the result directly or save it to a new playlist.

![results](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/playlist-maker/docs/results.png)

![playlist creation](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/playlist-maker/docs/create_playlist.png)

# How to install

## Auto Installation (Linux)
```
sh <(curl -s https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/playlist-maker/src/install.sh)

```

## Manual Installation

1. Run `spicetify config-dir` to open the spicetify folder.
2. Go to the `CustomApps` folder.
3. Create a `playlist-maker` folder.
4. Download the custom app files as a zip from [here](https://github.com/Pithaya/spicetify-apps-dist/archive/refs/heads/dist/playlist-maker.zip).
5. Extract the zip and put the files inside the folder you created in step 3.

Then, run the following commands:

```sh
spicetify config custom_apps playlist-maker
spicetify apply
```

# How to uninstall

1. Run `spicetify config-dir` to open the spicetify folder
2. Go to the `CustomApps` folder
3. Delete the `playlist-maker` folder

Then, run the following commands:

```sh
spicetify config custom_apps playlist-maker-
spicetify apply
```
