import { connect } from 'react-redux'
import { State } from '../../reducers'
import { getImagesInColumns, getPage, getIsLoading, getImages } from '../../selectors/images'
import { imagesFetchData, nextPage, setColumns } from '../../actions/images'

import ImageList from '../presentation/ImageList'
import { toggleModal, setCurrentImage } from '../../actions/modal';

const mapStateToProps = (state: State) => ({
    columns: getImagesInColumns(state),
    images: getImages(state),
    page: getPage(state),
    isLoading: getIsLoading(state)
})

const mapDispatchToProps = {
    imagesFetchData: imagesFetchData,
    nextPage: nextPage,
    toggleModal: toggleModal,
    setColumns: setColumns,
    setCurrentImage: setCurrentImage
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ImageList)