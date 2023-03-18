# Better local files

View your local songs, albums and artists.

![preview](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/better-local-files/preview.png)

> **Note**  
> There is a specific way to format artists so that the custom app recognizes them correctly: see [limitations](#limitations).

## Features

-   Tracks, albums, and artists views
-   Supports filtering and sorting
-   Supports all languages available in Spotify.

![preview](https://raw.githubusercontent.com/Pithaya/spicetify-apps/main/custom-apps/better-local-files/docs/tracks.png)

## Installation

1. Run `spicetify config-dir` to open the spicetify folder
2. Go to the `CustomApps` folder
3. Create a `better-local-files` folder
4. Copy the files from the [custom app's dist branch](https://github.com/Pithaya/spicetify-apps-dist/tree/dist/better-local-files) inside it.

Then, run the following commands:

```sh
spicetify config custom_apps better-local-files
spicetify apply
```

## Limitations

### Song artists

Spotify doesn't seem to recognize separate artist tags on songs as different artists, and will instead use the concatenation of the artist's names. So a track with artists 'A' and 'B' will be considered as having a single artist: 'A, B'.  
The custom app parses these strings with the following delimiters: ', ' and '; '. You should use this format to get artists recognized properly.  
**Note**: This means that artists with the same name will be considered the same artist.

### Album artists

Album artists tags are not recognized, so the custom app will use the list of all artists from the album's tracks as the album's artists.

### Album names

To identify an album, Spotify uses the current track's artist(s) name and the album name. This means that albums with tracks from different artists will be considered separate albums.  
To fix this, the custom app groups albums by name.  
**Note**: This means that albums with the same name will be considered the same album.

### Artist images

As artist images are not available, the artist's first album's image will be used instead.

## Upcoming features

-   Artist's album list
-   Multi track selection
-   Keep search, sort, and scroll information on navigation

## Uninstall

1. Run `spicetify config-dir` to open the spicetify folder
2. Go to the `CustomApps` folder
3. Delete the `better-local-files` folder

Then, run the following commands:

```sh
spicetify config custom_apps better-local-files-
spicetify apply
```
