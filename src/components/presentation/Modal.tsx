import * as React from "react"
import { Image } from "@src/models/image";
import * as sizeMe from 'react-sizeme';
import { nextImage, prevImage, toggleModal } from "@src/actions/modal";

import 'font-awesome/css/font-awesome.min.css'
import * as FontAwesome from 'react-fontawesome';

import '../../styles/components/Modal.scss';

export interface Props {
    show: boolean,
    currentImage: number,
    images: Array<Image>,
    size: { height: number },
    nextImage: (max: number) => void,
    prevImage: () => void,
    toggleModal: () => void,
}

export interface State {
}

class Modal extends React.Component<Props, State> {

    public onkeydown: any;

    constructor(props: Props) {
        super(props)
    }

    private disableScrolling() {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };

        this.onkeydown = document.onkeydown;
        document.onkeydown = (evt: any) => {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                this.props.toggleModal();
            }
        }
    }

    private enableScrolling() {
        window.onscroll = function () { };
        document.onkeydown = this.onkeydown;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            if (nextProps.show) {
                this.disableScrolling();
            }
            else {
                this.enableScrolling();
            }
        }

        if (nextProps.currentImage !== this.props.currentImage) {
            if (nextProps.currentImage + 3 < this.props.images.length) {
                const nextImage = this.props.images[nextProps.currentImage + 3];
                let image = document.createElement("img");;
                image.src = nextImage.originalSrc;
            }
            if (nextProps.currentImage - 3 >= 0) {
                const prevImage = this.props.images[nextProps.currentImage - 3];
                let image = document.createElement("img");;
                image.src = prevImage.originalSrc;
            }
        }
    }

    render() {
        const { children, show, currentImage, images, size } = this.props;
        const image = images[currentImage];

        return (
            <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
                <div className="modal-overlay"></div>
                <div className="modal-main">
                    <div className="modal-prev" onClick={this.props.prevImage}>
                        <FontAwesome
                            className='modal-icon'
                            name='angle-left'
                            size='4x'
                        />
                    </div>
                    <section className="modal-content">
                        {image ? (
                        <div className="modal-card">
                            <img style={{ maxHeight: size.height - 100 }} src={image ? image.originalSrc : ''} />
                            <div className="modal-card-info">
                                <h1><a href={image.link}>{image.title}</a></h1>
                                <p>{image.published}</p>
                                <p>{image.author}</p>
                            </div>
                        </div>
                        ) : ''}
                        <div className="modal-close" onClick={this.props.toggleModal}>
                            <FontAwesome
                                className='modal-icon'
                                name='close'
                                size='2x'
                            />
                        </div>
                    </section>
                    <div className="modal-next" onClick={() => { this.props.nextImage(images.length - 1) }}>
                        <FontAwesome
                            className='modal-icon'
                            name='angle-right'
                            size='4x'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default sizeMe({ monitorHeight: true })(Modal);