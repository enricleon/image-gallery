import { connect } from 'react-redux'
import { State } from '../../reducers'
import { getImages } from '../../selectors/images'
import { getCurrentImage, getShowModal } from '../../selectors/modal'
import { nextImage, prevImage, toggleModal } from '../../actions/modal'

import Modal from '../presentation/Modal'

const mapStateToProps = (state: State) => ({
    currentImage: getCurrentImage(state),
    show: getShowModal(state),
    images: getImages(state)
})

const mapDispatchToProps = {
    nextImage: nextImage,
    prevImage: prevImage,
    toggleModal: toggleModal
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Modal)