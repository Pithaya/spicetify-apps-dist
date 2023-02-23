import React from 'react';
import { Infinity } from 'lucide-react';

interface IProps {}

interface IState {
    isActive: boolean;
}

export class PlaybarButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isActive: false,
        };
    }

    render() {
        return (
            <Spicetify.ReactComponent.TooltipWrapper
                label={'Enable jukebox'}
                showDelay={100}
                renderInline={false}
            >
                <button
                    className={`main-repeatButton-button ${
                        this.state.isActive ? 'main-repeatButton-active' : ''
                    }`}
                    role="checkbox"
                    aria-checked="false"
                    aria-label="Activer jukebox"
                    onClick={() => this.toggleJukebox()}
                >
                    <Infinity size={24} />
                </button>
            </Spicetify.ReactComponent.TooltipWrapper>
        );
    }

    public toggleJukebox(): void {
        window.jukebox.isEnabled = !window.jukebox.isEnabled;
        this.setState((prevState) => {
            return {
                isActive: !prevState.isActive,
            };
        });
    }
}
