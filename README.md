# How to install the custom apps

## Eternal Jukebox

Go to the Spicetify CustomApps folder, located in:
| **Platform** | **Path** |
|-----------------|----------------------------------------|
| **MacOs/Linux** | `~/.config/spicetify/CustomApps` |
| **Windows** | `%localappdata%/spicetify/CustomApps` |

Create a `eternal-jukebox` folder, and copy the files from the [custom app's dist branch](https://github.com/Pithaya/spicetify-apps-dist/tree/dist/eternal-jukebox) inside it.

Then, run the following commands:

```sh
spicetify config custom_apps eternal-jukebox
spicetify apply
```
