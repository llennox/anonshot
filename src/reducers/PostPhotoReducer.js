import { REVIEW_PHOTO, REVIEW_VIDEO, CAPTION, SET_DEFAULT } from '../actions/types';

const INITIAL_STATE = {
 isvideo: false,
 isphoto: false,
 review_photo: '',
 review_video: '',
 caption: ''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case CAPTION:
        return { ...state, caption: action.payload };
     case REVIEW_PHOTO:
       return { ...state,
         review_photo: action.payload,
         isphoto: true,
         isvideo: false,
         review_video: false };
    case REVIEW_VIDEO:
       return { ...state,
         review_video: action.payload,
         isvideo: true,
         isphoto: false,
         review_photo: false };
    case SET_DEFAULT:
            return INITIAL_STATE;
    default:
         return state;
  }
};
