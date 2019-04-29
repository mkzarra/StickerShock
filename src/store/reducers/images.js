import { SET_IMAGES, REMOVE_IMAGE } from '../actions/types';

const initialState = {
  images: []
}

export default (state = initialState, { type, images, key }) => {
  switch (type) {
    case SET_IMAGES: return { ...state, images };
    case REMOVE_IMAGE: return { ...state, images: state.images.filter(img => img.key !== key) };
    default: return state;
  }
}