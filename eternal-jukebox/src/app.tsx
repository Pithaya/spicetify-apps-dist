import React from 'react';
import { Subscription } from 'rxjs';
import { HomeComponent } from './components/home.component';
import { JukeboxSongState } from './models/jukebox-song-state';

interface IProps {}

interface IState {
    songState: JukeboxSongState | null;
}

class App extends React.Component<IProps, IState> {
    private subscription: Subscription = new Subscription();

    constructor(props: IProps) {
        super(props);

        this.state = {
            songState: null,
        };
    }

    componentDidMount(): void {
        this.subscription.add(
            window.jukebox.songState$.subscribe((songState) => {
                this.setState(() => {
                    return {
                        songState: songState,
                    };
                });
            })
        );
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe();
    }

    render() {
        if (this.state.songState !== null) {
            return (
                <HomeComponent songState={this.state.songState}></HomeComponent>
            );
        }

        return <h1 style={{ textAlign: 'center' }}>Jukebox not enabled.</h1>;
    }
}

export default App;
