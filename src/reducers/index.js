import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PhotoReducer from './PhotoReducer';
import PostPhotoReducer from './PostPhotoReducer';

export default combineReducers({
  auth: AuthReducer,
  photos: PhotoReducer,
  savedphoto: PostPhotoReducer
});
