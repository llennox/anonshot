import RNFetchBlob from 'react-native-fetch-blob'
import { Actions } from 'react-native-router-flux';
import { REVIEW_PHOTO,
  REVIEW_VIDEO,
  CAPTION,
  REFRESHING,
  SET_DEFAULT
 } from './types';
import { getPhotosWithAction } from './PhotoActions';


export const ChangeCaption = (text) => {
    return {
     type: CAPTION,
     payload: text
    };
};

export const Reset = () => {
   return (dispatch) => {
  dispatch({ type: SET_DEFAULT });
 };
};

export const PhotoLocation = (Loc) => {
  return (dispatch) => {
  dispatch({ type: REVIEW_PHOTO, payload: Loc });
  Actions.ReviewPhoto();
};
};

export const VideoLocation = (Loc) => {
  return (dispatch) => {
  dispatch({ type: REVIEW_VIDEO, payload: Loc });
};
};


export const PostPhoto = (token, uuid, thecaption, themedia) => {

  return (dispatch) => {
   dispatch({ type: REFRESHING });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latt = position.coords.latitude;
        const lonn = position.coords.longitude;

    RNFetchBlob.fetch('POST', 'https://anonshot.com/api/photos/', {
        Authorization: 'Token ' + token,
        'Content-Type': 'multipart/form-data'
      }, [
        { name: 'file',
        filename: 'placeholder.jpg',
        type: 'image/jpg',
        data: RNFetchBlob.wrap(themedia) },
        {
          name: 'lat',
          data: JSON.stringify(
          latt
        ) },
        {
          name: 'lon',
          data: JSON.stringify(
          lonn
        ) },
        {
          name: 'caption',
          data: thecaption
        },
        {
          name: 'isvideo',
          data: 'false'
        }
        ]).then(() => {
        dispatch({ type: SET_DEFAULT });
        getPhotosWithAction(dispatch, token, 1);
      }).catch((err) => {
        console.log(err);
      });
    },
    (error) => console.log(error.message)
  );
  };
};

export const PostVideo = (token, uuid, thecaption, themedia) => {
  return (dispatch) => {
  dispatch({ type: REFRESHING });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latt = position.coords.latitude;
        const lonn = position.coords.longitude;

    RNFetchBlob.fetch('POST', 'https://anonshot.com/api/photos/', {
        Authorization: 'Token ' + token
        }, [
        { name: 'file',
        filename: 'placeholder.mp4',
        type: 'video/mp4',
        data: RNFetchBlob.wrap(themedia) },
        {
          name: 'lat',
          data: JSON.stringify(
          latt
        ) },
        {
          name: 'lon',
          data: JSON.stringify(
          lonn
        ) },
        {
          name: 'caption',
          data: thecaption
        },
        {
          name: 'isvideo',
          data: 'True'
        }
      ]).then(() => {
        dispatch({ type: SET_DEFAULT });
        getPhotosWithAction(dispatch, token, 1);

      }).catch((err) => {
        console.log(err);
      });
    },
    (error) => console.log(error.message)
  );
  };
};
