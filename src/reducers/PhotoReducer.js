import {
  PHOTOS,
  COMMENT,
  POST_COMMENT,
  SINGLE_PHOTO,
  REFRESHING,
  REFRESHING_FALSE,
  SWITCH_MUTE,
  IN_VIEW,
  REF_BOTTOM,
  INITIAL_PHOTOS,
  CHILD_VIEWED,
  LAYOUT,
  DELETE_PHOTO,
  USER_PHOTOS,
  BUCHILD_VIEWED,
  BUREF_BOTTOM
} from '../actions/types';

const INITIAL_STATE = {
 photos: {},
 single_photo: {},
 refreshing: false,
 muted: true,
 paused: true,
 ispaused: true,
 bottom_refresh: false,
 child_viewed: 0,
 buchild_viewed: 0,
 bubottom_refresh: false,
 saved_layout: {},
 user_photos: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case INITIAL_PHOTOS:
           return INITIAL_STATE;
      case SWITCH_MUTE:
        if (state.muted) {
        return { ...state, muted: false };
      } return { ...state, muted: true };
      case REFRESHING:
        return { ...state, refreshing: true };
      case IN_VIEW:
          return { ...state, number: action.payload };
      case CHILD_VIEWED:
          return { ...state, child_viewed: action.payload };
      case BUCHILD_VIEWED:
          return { ...state, buchild_viewed: action.payload };
      case LAYOUT:
          const objects = [action.payload];
          const payload = action.payload;
          if (state.saved_layout.objects !== undefined) {
              const lay = state.saved_layout.objects.concat(objects);
              return { ...state,
                saved_layout: {
                  objects: lay
                }
              };
            }
          return { ...state,
            saved_layout: {
              objects
            }
        };
      case REFRESHING_FALSE:
        return { ...state, refreshing: false };
    case REF_BOTTOM:
    if (state.bottom_refresh) {
    return { ...state, bottom_refresh: false };
  } return { ...state, bottom_refresh: true };
  case BUREF_BOTTOM:
  if (state.bottom_refresh) {
  return { ...state, bubottom_refresh: false };
} return { ...state, bubottom_refresh: true };
  case PHOTOS: {
       const { payload, p } = action;
       const { objects } = payload;
    if (state.photos.objects !== undefined && p !== 1) {
    const nn = state.photos.objects.concat(objects);
         return { ...state,
           bottom_refresh: false,
           photos: {
             objects: nn
         }
         };
       }
       return { ...state,
         bottom_refresh: false,
         photos: {
           objects
       }
       };
     }
     case USER_PHOTOS: {
          const { payload, p } = action;
          const { objects } = payload;
       if (state.user_photos.objects !== undefined && p !== 1) {
       const nn = state.user_photos.objects.concat(objects);
            return { ...state,
              bubottom_refresh: false,
              user_photos: {
                objects: nn
            }
            };
          }
          return { ...state,
            bubottom_refresh: false,
            user_photos: {
              objects
          }
          };
        }
    case DELETE_PHOTO: {
      console.log(action.payload);
      console.log(state.photos.objects);
      const filtered_photos = state.photos.objects.filter(item => item.uuid !== action.payload);
      return { ...state,
      photos: {
        objects: filtered_photos
      }
      };
    }
     case COMMENT:
       return { ...state, comment: action.payload };
     case SINGLE_PHOTO:
       return { ...state, single_photo: action.payload, comment: '' };
     case POST_COMMENT:
       return { ...state, single_photo: state.single_photo.x.comments.concat(action.payload) };
    default:
         return state;
  }
};
