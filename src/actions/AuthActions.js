import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import { USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOADING,
  SET_AUTH,
  REFRESHING,
  INITIAL_PHOTOS,
  REFRESHING_FALSE,
  ISANON,
  UPDATE_ERROR,
  UPDATE_LOGIN_ERROR,
  ONCE_LOADED,
  BANNED_TRUE
} from './types';
import { getPhotosWithAction, getPhotos, grabSinglePhoto } from './PhotoActions';

export const usernameChanged = (text) => {
    return {
     type: USERNAME_CHANGED,
     payload: text
    };
};

export const lgusernameChanged = (text) => {
    return {
     type: USERNAME_CHANGED,
     payload: text
    };
};

export const isanonSwitch = (uuid, token) => {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    axios.post('https://anonshot.com/api/isanonSwitch/', {
      user_uuid: uuid
    })
    .then(function (response) {
      dispatch({ type: ISANON, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  };
};

export const setRefreshingSingle = (bool, uuid, token) => {
  return (dispatch) => {
    if (bool === true) {
    dispatch({ type: REFRESHING });
    dispatch({ type: LOADING });
    grabSinglePhoto(dispatch, uuid, token);
}
   dispatch({ type: REFRESHING_FALSE });
};
};

export const setRefreshing = (bool, token) => {
  return (dispatch) => {
    if (bool === true) {
    dispatch({ type: INITIAL_PHOTOS });
    dispatch({ type: REFRESHING });
    dispatch({ type: LOADING });
    getPhotos(dispatch, token, 1);
}
   dispatch({ type: REFRESHING_FALSE });
};
};

export const passwordChanged = (text) => {
    return {
     type: PASSWORD_CHANGED,
     payload: text
    };
};

export const lgpasswordChanged = (text) => {
    return {
     type: PASSWORD_CHANGED,
     payload: text
    };
};

export const updateLogInError = (message) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_LOGIN_ERROR, payload: message });
  };
};

export const updateError = (message) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_ERROR, payload: message });
  };
};

export const CreateAccount = (username, email, password, token) => {
    return (dispatch) => {
      dispatch({ type: LOADING });
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      //const url = 'https://httpbin.org/post'
      const url = 'https://anonshot.com/api/change-username/';
      axios.post(url, {
        isanon: 'False',
        newusername: username,
        newpassword: password,
        newemail: email
      }).then(function (response) {
        const mytoken = response.data.token;
        AsyncStorage.setItem('user_uuid', response.data.user_uuid);
        AsyncStorage.setItem('username', response.data.username);
        AsyncStorage.setItem('authtoken', mytoken);
        AsyncStorage.setItem('created', response.data.created.toString());

        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
        getPhotosWithAction(dispatch, mytoken, 1);
      })
      .catch(function (error) {
        dispatch({ type: UPDATE_ERROR, payload: 'username or email already taken' });
        console.log(error.message);
      });
    }
};


export const logInUser = (username, password, token) => {
  return (dispatch) => {
    dispatch({ type: LOADING });
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const url = 'https://anonshot.com/api/login/';
    //const url = 'https://httpbin.org/post';
    axios.post(url, {
      username: username,
      password: password
    })
    .then(function (response) {
      const token = response.data.token;
      AsyncStorage.setItem('user_uuid', response.data.user_uuid);
      AsyncStorage.setItem('username', response.data.username);
      AsyncStorage.setItem('authtoken', response.data.token);
      AsyncStorage.setItem('created', response.data.created.toString());
      dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
      getPhotosWithAction(dispatch, token, 1);
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: UPDATE_LOGIN_ERROR, payload: 'username or password incorrect' });
    });
  };
};

function consMjolnir(dispatch) {
  const uniqueID = DeviceInfo.getUniqueID();
  const url = 'https://anonshot.com/api/ban-check/';
  //const url = 'https://httpbin.org/post'
  axios.post(url, {
    deviceUUID: uniqueID
  }).then(function (response) {
     if (response.data === true) {
       dispatch({ type: BANNED_TRUE });
     }
     return;
  }).catch(function (error) {
    console.log(error);
    return error;
  });
}

function returnUUID() {
  const uniqueID = DeviceInfo.getUniqueID();
  return uniqueID;
}

export const createUser = (dispatch) => {
  axios.defaults.headers.common['Authorization'] = '';
  const url = 'https://anonshot.com/api/create-user/';
  //const url = 'https://httpbin.org/post'
  let deviceUUID = returnUUID();
  axios.post(url, {
    deviceUUID: deviceUUID
  }).then(function (response) {
    const token = response.data.token;
    console.log(response.data);
    AsyncStorage.setItem('user_uuid', response.data.user_uuid);
    AsyncStorage.setItem('username', response.data.username);
    AsyncStorage.setItem('authtoken', token);
    AsyncStorage.setItem('created', response.data.created.toString());
    dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
    getPhotosWithAction(dispatch, token, 1);
  }).catch(function (error) {
    console.log(error);
  });
};


export const initialView = () => {
  return (dispatch) => {
    consMjolnir(dispatch);
    dispatch({ type: LOADING });
    dispatch({ type: ONCE_LOADED });
    return AsyncStorage.multiGet(['authtoken', 'user_uuid', 'created', 'username'])
     .then((item) => {
       console.log(item);
     if (item[0][1] != null && item[1][1] != null && item[2][1] != null && item[3][1] != null) {
       dispatch({ type: SET_AUTH, payload: item });
       getPhotos(dispatch, item[0][1], 1);
     } else {
       console.log('dis');
       createUser(dispatch);
       //send post to create account
     }
  });
 };
};


export const logOutUser = (token) => {
  return (dispatch) => {
      dispatch({ type: LOADING });
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      const url = 'https://anonshot.com/api/auth/logout/';
      //const url = 'https://httpbin.org/post'
      axios.post(url).then(function () {
        AsyncStorage.removeItem('user_uuid');
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('authtoken');
        AsyncStorage.removeItem('created');
        createUser(dispatch);
      }).catch(function (error) {
        AsyncStorage.removeItem('user_uuid');
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('authtoken');
        AsyncStorage.removeItem('created');
        createUser(dispatch);
      });
  };
};
