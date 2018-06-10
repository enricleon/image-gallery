import * as React from "react"
import { Image } from "@src/models/image";

import FadeIn from "react-lazyload-fadein";
import * as sizeMe from 'react-sizeme';

import '../../styles/components/ImageCard.scss';

export interface Props {
    image: Image,
    size: { width: number },
    hoverClick: () => void
}

export interface State {
    loaded: boolean
}

class ImageCard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            loaded: false
        }
    }

    render() {
        const { image, size } = this.props;
        const transitionDuration = 100;
        const blurSize = 30;

        return (

            <div className="image-card">
                <div className="image-wrapper">
                    <div className="image" style={{ backgroundImage: 'url(' + image.thumbnailSrc + ')', filter: !this.state.loaded ? 'blur(' + blurSize + 'px)' : 'none' }}>
                        <FadeIn duration={transitionDuration} height={size.width as number * image.normalizedHeight}>
                            {onload => (
                                <img
                                    src={image.src}
                                    height={size.width as number * image.normalizedHeight}
                                    onLoad={() => {
                                        onload();
                                        setTimeout(() => {
                                            this.setState({ loaded: true });
                                        }, transitionDuration);
                                    }}
                                    alt={image.title} />
                            )}
                        </FadeIn>
                        <div className="shadow" onClick={this.props.hoverClick}>
                            <h1>{image.title}</h1>
                        </div>
                    </div>
                </div>
                <div className="info">
                    <h1>{image.title}</h1>
                    <p><a href={image.link}>{image.title}</a></p>
                </div>
            </div>
        )
    }
}

export default sizeMe()(ImageCard);