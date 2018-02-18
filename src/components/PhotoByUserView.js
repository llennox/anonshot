import React, { Component } from 'react';
import Moment from 'react-moment';
import { Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { CardSection, Card } from './common';
import { initialView,
  RenderComments,
  setRefreshing,
  switchMute,
  buchildInView,
  nextPageUserPhotos,
  saveLayout,
  deletePhoto,
  flagPhoto,
  getPhotosByUser
} from '../actions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class PhotoByUserView extends Component {

  constructor(props) {
    super(props);
  }


componentDidMount() {
  this.props.setRefreshing(false, this.props.authtoken, 0, 0);
}

flagAlert(x) {
  return (
    Alert.alert(
  '',
  'would you like to flag this post as inappropriate?',
  [
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: () => this.props.flagPhoto(x.uuid, x.useruuid, this.props.authtoken)},
  ],
  { cancelable: false }
)
);
}


trashAlert(x) {
  return (
    Alert.alert(
  '',
  'would you like to delete this post?',
  [
    {text: 'No', onPress: () => console.log('NO'), style: 'cancel'},
    {text: 'Yes', onPress: () => this.props.deletePhoto(x.uuid, this.props.authtoken)},
  ],
  { cancelable: false }
)
);
}

renderTrashFlag(x) {
    if (x.useruuid === this.props.user_uuid) {
      return (
        <TouchableOpacity
        onPress={() => this.trashAlert(x)}
        >
        <Image style={styles.deleteFlagIcon}
         source={require('./assets/trash.png')}
        />
        </TouchableOpacity>
      );
    }
  return (
    <TouchableOpacity
    onPress={() => this.flagAlert(x)}
    >
    <Text style={styles.flagTextStyle}>flag post</Text>

    </TouchableOpacity>
  )
}

handleScroll(event) {
  const l = this.props.user_photos.objects.length;
  const v = (this.props.child_viewed + 2);
  let br = this.props.bottom_refresh;
  if ((v === l)
  && (l % 8 === 0)
  && (br === false)) {
        br = true;
        const p = (l / 8) + 1;
        this.props.nextPageUserPhotos(this.props.authtoken, p);
  }
  const childViewed = this.props.child_viewed;
  const childViewedBelow = (this.props.child_viewed + 1);
  const h = event.nativeEvent.contentOffset.y;
  const a = this.props.saved_layout.objects;
  if (a.length !== childViewedBelow && childViewed >= 0) {
   if (h >= a[childViewedBelow][childViewedBelow]) {
      this.props.buchildInView(childViewedBelow);
  } else if (h <= a[childViewed][childViewed] && childViewed !== 0) {
      const childViewedUp = (childViewed - 1);
      this.props.buchildInView(childViewedUp);
  }
}
}

calculateHeight(event, i) {
  const childNum = i.i;
  const sendArray = {};
  sendArray[childNum] = (event.nativeEvent.layout.y - 200);
  const lay = this.props.saved_layout.objects;
  if (lay === undefined) {
    this.props.saveLayout(sendArray);
  } else if (lay[childNum] === undefined) {
    this.props.saveLayout(sendArray);
  } else {
    return;
  }
}

  commentButtonPress(aphoto) {
      this.props.RenderComments(aphoto);
  }

  getUserPhotos(poster) {
      this.props.getPhotosByUser(poster, this.props.authtoken);
  }


  refreshList() {
        this.props.setRefreshing(true, this.props.authtoken);
}

  renderVideoPhoto(x, i) {
    const r = this.props.child_viewed;
    if (i === r && x.isvideo) {
      return (
        <TouchableWithoutFeedback
        onLongPress={() => { this.props.switchMute(); }}
        style={styles.buttonStyle}
        activeOpacity={0.1}
        >
        <Video
         style={{ width: deviceWidth,
           height: deviceHeight / 1.4,
            alignSelf: 'center' }}
         source={{ uri: `https://anonshot.com/photos/${x.uuid}.mp4` }}
         ref={(ref) => {
             this.player = ref;
           }}                                      // Store reference
           rate={1.0}                              // 0 is paused, 1 is normal.
           volume={1.0}                            // 0 is muted, 1 is normal.
           muted={this.props.muted}                           // Mutes the audio entirely.
           paused={false}                          // Pauses playback entirely.
           resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
           repeat={true}                           // Repeat forever.
           playInBackground={false}
            // Audio continues to play when app entering background.
           playWhenInactive={false}
            // [iOS] Video continues to play when control or notification center are shown.
           ignoreSilentSwitch={'obey'}
      // [iOS] ignore | obey - When 'ignore',
      //audio will still play with the iOS hard silent switch set to silent.
      // When 'obey', audio will toggle with the switch.
      // When not specified, will inherit audio settings as usual.
           progressUpdateInterval={250.0}
            // [iOS] Interval to fire onProgress (default to ~250ms)
           onLoadStart={this.loadStart}            // Callback when video starts to load
           onLoad={this.setDuration}               // Callback when video loads
           onProgress={this.setTime}               // Callback every ~250ms with currentTime
           onEnd={this.onEnd}                      // Callback when playback finishes
           onError={this.videoError}               // Callback when video cannot be loaded
           onBuffer={this.onBuffer}                // Callback when remote video is buffering
           onTimedMetadata={this.onTimedMetadata}
        />
        </TouchableWithoutFeedback>
      );
    } if (x.isvideo) {
      return (
        <TouchableWithoutFeedback
        onLongPress={() => { this.props.switchMute(); }}
        style={styles.buttonStyle}
        activeOpacity={0.1}
        >
        <Video
         style={{ width: deviceWidth,
           height: deviceHeight / 1.4,
         alignSelf: 'center' }}
         source={{ uri: `https://anonshot.com/photos/${x.uuid}.mp4` }}
         ref={(ref) => {
             this.player = ref;
           }}                                      // Store reference
           rate={1.0}                              // 0 is paused, 1 is normal.
           volume={1.0}                            // 0 is muted, 1 is normal.
           muted={this.props.muted}                           // Mutes the audio entirely.
           paused={true}                         // Pauses playback entirely.
           resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
           repeat={false}                          // Repeat forever.
           playInBackground={false}
            // Audio continues to play when app entering background.
           playWhenInactive={false}
            // [iOS] Video continues to play when control or notification center are shown.
           ignoreSilentSwitch={'obey'}
      // [iOS] ignore | obey - When 'ignore',
      //audio will still play with the iOS hard silent switch set to silent.
      // When 'obey', audio will toggle with the switch.
      // When not specified, will inherit audio settings as usual.
           progressUpdateInterval={250.0}
            // [iOS] Interval to fire onProgress (default to ~250ms)
           onLoadStart={this.loadStart}            // Callback when video starts to load
           onLoad={this.setDuration}               // Callback when video loads
           onProgress={this.setTime}               // Callback every ~250ms with currentTime
           onEnd={this.onEnd}                      // Callback when playback finishes
           onError={this.videoError}               // Callback when video cannot be loaded
           onBuffer={this.onBuffer}                // Callback when remote video is buffering
           onTimedMetadata={this.onTimedMetadata}
        />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <FastImage
       style={{ width: deviceWidth,
         height: deviceHeight / 1.4,
        alignSelf: 'center' }}
       source={{ uri: `https://anonshot.com/photos/${x.uuid}.jpg`,
               priority: FastImage.priority.normal, }}
      />
    );
  }

  renderBottomSpinner() {
    if (this.props.bottom_refresh) {
      return (
        <Card>
        <Image
         style={{ width: 256, height: 256, alignSelf: 'center' }}
         source={require('./assets/ramstine.gif')}
         resizeMode="contain"
        />
        </Card>
      );
    }
    return;
  }

  renderCaption(x) {
    return (
      <View>
        <Text style={styles.captionTextStyle} >{x.poster}:</Text>
        <Text style={styles.timeTextStyle} >{x.caption}</Text>
      </View>
  );
  }

  renderMainView() {
    if (this.props.loading) {
    return (
      <Card style={{ paddingTop: 40 }}>
      <ActivityIndicator size={'large'} animating />
      </Card>
   );
 }
 if (this.props.user_photos.objects === undefined || this.props.user_photos.objects.length === 0) {
   return (
       <CardSection>
         <Text style={styles.infoTextStyle}>this user has not posted anything</Text>
      </CardSection>
    );
  }
   const mapMe = this.props.user_photos.objects;
    return (
      <ScrollView
                onScroll={(event) => this.handleScroll(event)}
                scrollEventThrottle={16}
                style={{ marginTop: 39 }}
                refreshControl={
                    <RefreshControl
                        onRefresh={this.refreshList.bind(this)}
                        refreshing={this.props.refreshing}
                    />
                }
      >
       {mapMe.map((x, i) =>
         <View key={i} onLayout={(event) => { this.calculateHeight(event, {i}); }} >
         <Card id={x.uuid} key={i} >
         <View
         style={{ alignContent: 'flex-start',
justifyContent: 'space-between',
       }}>
{this.renderCaption(x)}
{this.renderTrashFlag(x)}
</View>
         <CardSection>
         {this.renderVideoPhoto(x, i)}
         <Text style={styles.timeTextStyle}>
         <Moment element={Text} fromNow>{x.timestamp}</Moment>
         </Text>
         <Text style={styles.timeTextStyle} >{x.photo_distance} km from you</Text>
         </CardSection>
         <CardSection>
         <TouchableOpacity
         onPress={() => this.commentButtonPress({ x })}
         style={styles.buttonStyle}
         >
           <Text style={styles.timeTextStyle}>
           View all {x.comments.length} Comment(s)/ Post comment
           </Text>
         </TouchableOpacity>
         </CardSection>
         </Card>
         </View>
       )}

       {this.renderBottomSpinner()}

      </ScrollView>
    );
  }

  render() {
   return (
    <View>
     {this.renderMainView()}
    </View>
  );
}
}
const styles = {
  infoTextStyle: {
  fontSize: 14,
  color: 'black',
  textAlign: 'center',
  marginTop: 50
},
captionTextStyle: {
fontSize: 18,
color: 'black',
marginLeft: 4,

},
notanonTextStyle: {
fontSize: 18,
color: 'rgb(0,122,255)',
marginLeft: 4,

},
timeTextStyle: {
fontSize: 14,
marginLeft: 4,
color: 'black',

},
buttonStyle: {
flex: 1,
alignSelf: 'stretch',
backgroundColor: '#fff',
borderRadius: 2,
borderWidth: 1,
borderColor: 'black',
marginLeft: 5,
paddingTop: 5,
paddingBottom: 5,
marginRight: 5
},
deleteFlagIcon: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 1,
    flex: 1

},
flagTextStyle: {
fontSize: 12,
color: 'rgb(0,122,255)',
alignSelf: 'flex-end',
marginRight: 2
}
};

const mapStateToProps = state => {
return {
  user_uuid: state.auth.user_uuid,
  loading: state.auth.loading,
  user_photos: state.photos.user_photos,
  authtoken: state.auth.authtoken,
  refreshing: state.photos.refreshing,
  muted: state.photos.muted,
  in_view: state.photos.in_view,
  child_viewed: state.photos.buchild_viewed,
  bottom_refresh: state.photos.bubottom_refresh,
  saved_layout: state.photos.saved_layout,
  once_loaded: state.auth.once_loaded
 };
};

export default connect(mapStateToProps, {
  initialView,
  RenderComments,
  setRefreshing,
  buchildInView,
  switchMute,
  nextPageUserPhotos,
  saveLayout,
  deletePhoto,
  flagPhoto,
  getPhotosByUser
})(PhotoByUserView);
