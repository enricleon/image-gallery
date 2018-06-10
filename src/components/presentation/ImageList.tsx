import * as React from 'react'
import LoadingScreen from 'react-loading-screen';

import { Image } from '../../models/image';
import { Filter } from '../../models/filter';
import ImageCard from '../presentation/ImageCard';

import '../../styles/components/ImageList.scss';
import Modal from '../../components/containers/Modal';

interface Props {
    images: Array<Image>,
    columns: Array<Array<Image>>,
    page: number,
    isLoading: boolean,
    imagesFetchData: (filter: Filter) => void,
    nextPage: (page: number) => void,
    toggleModal: () => void,
    setColumns: (columns: number) => void,
    setCurrentImage: (currentImage: number) => void
}

export default class ImageList extends React.Component<Props> {
    private rebalanceArray: Array<Array<number>>

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const filter: Filter = {
            page: this.props.page,
            limit: 25,
            text: "cats"
        };

        this.props.imagesFetchData(filter);
        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('resize', () => {
            window.scrollTo(0, 0);
            this.props.setColumns(Math.ceil(window.innerWidth / 350));
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.page !== this.props.page) {
            const filter: Filter = {
                page: nextProps.page,
                limit: 25,
                text: "cats"
            };

            this.props.imagesFetchData(filter);
        }
    }

    onScroll = () => {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) &&
            this.props.images.length &&
            !this.props.isLoading
        ) {
            this.props.nextPage(this.props.page);
        }
    }

    render() {
        const { columns, images } = this.props;

        return (
            <LoadingScreen
                loading={!images.length}
                bgColor='#f1f1f1'
                spinnerColor='#ff3f55'
                logoSrc='/img/logo.png'
                >
                <div className="image-list">
                    <div className="row">
                        {columns.map((column, index) => (
                            <div className="column" key={index}>
                                {column.map((image, y) => (
                                    <ImageCard
                                        hoverClick={() => {
                                            this.props.setCurrentImage(images.findIndex(x => x.id === image.id));
                                            this.props.toggleModal();
                                        }}
                                        innerRef={node => node} key={image.id}
                                        image={image} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <Modal />
                </div>

            </LoadingScreen>

        )
    }
}