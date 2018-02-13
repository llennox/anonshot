import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  PHOTOS,
  LOADING_FALSE,
  COMMENT,
  SINGLE_PHOTO,
  REFRESHING_FALSE,
  SWITCH_MUTE,
  CHILD_VIEWED,
  REF_BOTTOM,
  BUCHILD_VIEWED,
  BUREF_BOTTOM,
  LAYOUT,
  DELETE_PHOTO,
  LOADING,
  USER_PHOTOS,
  ONCE_LOADED_FALSE,
  RESET_SCROLL
 } from './types';
 import { createUser } from './AuthActions';


 export const nextPage = (token, page) => {
    return (dispatch) => {
      dispatch({ type: REF_BOTTOM });
      getPhotos(dispatch, token, page);
    };
 };

 export const nextPageUserPhotos = (token, page) => {
    return (dispatch) => {
      dispatch({ type: BUREF_BOTTOM });
      getPhotosByUser(dispatch, token, page);
    };
 };

export const getPhotos = (dispatch, token, page) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      //const lat = 12.11111111111111;
      //const lon = 12.11111111111111111;
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(token);
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      const url = `https://anonshot.com/api/photos/${lat}/${lon}/${page}/`;
      console.log(url);
      axios.get(url)
       .then(function (response) {
        console.log(response.data);
        dispatch({ type: PHOTOS, payload: response.data, p: page });
        dispatch({ type: LOADING_FALSE });
        dispatch({ type: REFRESHING_FALSE });
     })
   .catch(function (error) {
     console.log(error.message);

   });
    },
    (error) => console.log(error.message)
  );
 };

 export const getPhotosWithAction = (dispatch, token, page) => {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       console.log(position);
       //const lat = 12.11111111111111;
       //const lon = 12.11111111111111111;
       const lat = position.coords.latitude;
       const lon = position.coords.longitude;
       console.log(token);
       axios.defaults.headers.common.Authorization = `Token ${token}`;
       const url = `https://anonshot.com/api/photos/${lat}/${lon}/${page}/`;
       console.log(url);
       axios.get(url)
        .then(function (response) {
         console.log(response.data);
         dispatch({ type: PHOTOS, payload: response.data, p: page });
         dispatch({ type: LOADING_FALSE });
         dispatch({ type: REFRESHING_FALSE });
         Actions.PhotoView();
      })
    .catch(function (error) {
      console.log(error.message);

    });
     },
     (error) => console.log(error.message)
   );
  };

 export const RenderComments = (singlePhoto) => {
       return (dispatch) => {
         dispatch({ type: SINGLE_PHOTO, payload: singlePhoto });
         Actions.CommentView();
 };
};

export const grabSinglePhoto = (dispatch, uuid, token) => {
  axios.defaults.headers.common.Authorization = `Token ${token}`;
 const url = `https://anonshot.com/api/${uuid}`;
 axios.get(url)
 .then(function (response) {
  console.log(response.data);
  const x = { x: response.data };
  dispatch({ type: LOADING_FALSE });
  dispatch({ type: REFRESHING_FALSE });
  dispatch({ type: SINGLE_PHOTO, payload: x });
})
.catch(function (error) {
console.log(error.message);
});
};

 export const PostComment = (text, token, uuid) => {
   return (dispatch) => {
     axios.defaults.headers.common.Authorization = `Token ${token}`;
   const url = 'https://anonshot.com/api/comments/';
   axios.post(url, {
     comment: text,
     photouuid: uuid
   }).then(function () {
     grabSinglePhoto(dispatch, uuid, token);
   }).catch(function (error) {
     console.log(error.message);
   });
   };
 };

 export const deletePhoto = (uuid, token) => {
     return (dispatch) => {
       console.log(uuid);
       console.log(token);
       axios.defaults.headers.common.Authorization = `Token ${token}`;
       const url = 'https://anonshot.com/api/delete-photo/';
       axios.post(url,
         { uuid: uuid
       }).then(function (response) {
         console.log(response);
         dispatch({ type: DELETE_PHOTO, payload: uuid });
         Actions.PhotoView();
       }).catch(function (error) {
         console.log(error);
       });
     };
};

export const flagPhoto = (uuid, token) => {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = 'https://anonshot.com/api/delete_photo/';
  };
};

export const getPhotosByUser = (poster, token, thepage) => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //const lat = 12.11111111111111;
        //const lon = 12.11111111111111111;
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        const url = 'https://anonshot.com/api/user-photos/';
        console.log(url);
        axios.post(url,  {
          lat: latitude,
          lon: longitude,
          username: poster,
          page: thepage
        })
         .then(function (response) {
          console.log(response.data);
          dispatch({ type: USER_PHOTOS, payload: response.data, p: thepage });
          dispatch({ type: LOADING_FALSE });
          dispatch({ type: REFRESHING_FALSE });
          dispatch({ type: ONCE_LOADED_FALSE });
          Actions.PhotoByUserView();
       })
     .catch(function (error) {
       console.log(error.message);

     });
      },
      (error) => console.log(error.message)
    );

  };
};


export const childInView = (c) => {
    return {
      type: CHILD_VIEWED,
      payload: c
    };
};

export const buchildInView = (c) => {
    return {
      type: BUCHILD_VIEWED,
      payload: c
    };
};

export const saveLayout = (l) => {

  return {
    type: LAYOUT,
    payload: l
  };
};

 export const DeleteComment = (text) => {
     return {
      type: COMMENT,
      payload: text
     };
 };


 export const ChangeComment = (text) => {
     return {
      type: COMMENT,
      payload: text
     };
 };

 export const switchMute = () => {
    return {
      type: SWITCH_MUTE
    };
 };
