
import { USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOADING,
  SET_AUTH,
  LOADING_FALSE,
  ISANON,
  UPDATE_ERROR,
  UPDATE_LOGIN_ERROR,
  ONCE_LOADED,
  LG_USERNAME_CHANGED,
  LG_PASSWORD_CHANGED,
  ONCE_LOADED_FALSE,
  BANNED_TRUE
} from '../actions/types';

const INITIAL_STATE = {
username: '',
 password: '',
 user_uuid: '',
 authtoken: '',
 error: '',
 created: false,
 loading: false,
 refreshing: false,
 isanon: false,
 photos: {},
 logInError: '',
 once_loaded: false,
 banned: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ISANON:
         return { ...state, isanon: action.payload };
      case BANNED_TRUE:
         return { ...state, banned: true };
      case ONCE_LOADED:
         return { ...state, once_loaded: true };
      case ONCE_LOADED_FALSE:
        return { ...state, once_loaded: false };
      case USERNAME_CHANGED:
           return { ...state, username: action.payload };
      case PASSWORD_CHANGED:
           return { ...state, password: action.payload };
      case LG_USERNAME_CHANGED:
           return { ...state, username: action.payload };
      case LG_PASSWORD_CHANGED:
          return { ...state, password: action.payload };
      case LOGIN_USER_SUCCESS:
           return {
             ...state,
             created: action.payload.created,
             authtoken: action.payload.token,
             username: action.payload.username,
             user_uuid: action.payload.user_uuid,
             password: ''
            };
      case LOGIN_USER_FAIL:
           return { ...state, error: 'wrong password or username', loading: false };
      case LOADING:
           return { ...state, loading: true, error: '' };
      case LOADING_FALSE:
              return { ...state, loading: false, error: '' };
      case SET_AUTH:
           return {
             ...state,
             authtoken: action.payload[0][1],
             user_uuid: action.payload[1][1],
            created: action.payload[2][1],
            username: action.payload[3][1]
          };
      case UPDATE_ERROR:
            return { ...state, logInError: '', error: action.payload, loading: false };
      case UPDATE_LOGIN_ERROR:
            return { ...state, password: '', error: '', logInError: action.payload, loading: false };
      default:
         return state;
    }
};
