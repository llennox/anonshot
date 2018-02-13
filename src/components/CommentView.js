import React, { Component } from 'react';
import Moment from 'react-moment';
import FastImage from 'react-native-fast-image';
import { ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  RefreshControl,
  Image,
  View,
  Alert,
  TextInput
} from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { CardSection, Card } from './common';
import {
  PostComment,
  DeleteComment,
  ChangeComment,
  switchMute,
  deletePhoto,
setRefreshingSingle
} from '../actions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CommentView extends Component {

  onCommentChange(text) {
     this.props.ChangeComment(text);
  }

  refreshList() {
        this.props.setRefreshingSingle(true, this.props.single_photo.x.uuid, this.props.authtoken);
}

flagAlert(x) {
  return (
    Alert.alert(
  '',
  'would you like to flag this post as inappropriate?',
  [
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: () => console.log('OK Pressed')},
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
    <Image style={styles.deleteFlagIcon}
     source={require('./assets/white-flag-symbol.png')}
    />
    </TouchableOpacity>
  )
}

renderCaption(x) {

  return (
      <Text style={styles.captionTextStyle} >{x.poster}: {x.caption}</Text>
);

}


  postComment() {
    const commentText = this.props.comment;
    const token = this.props.authtoken;
    const photouuid = this.props.single_photo.x.uuid;
    this.props.PostComment(commentText, token, photouuid);
  }
  renderVideoPhoto(x) {
    if (x.isvideo) {
      return (
        <TouchableWithoutFeedback
        onPress={() => { this.props.switchMute(); }}
        style={styles.buttonStyle}
        activeOpacity={0.1}
        >
        <Video
         style={{ width: deviceWidth, height: deviceHeight / 1.4 }}
         source={{ uri: `https://anonshot.com/photos/${x.uuid}.mp4` }}
         ref={(ref) => {
             this.player = ref;
           }}                                      // Store reference
           rate={1.0}                              // 0 is paused, 1 is normal.
           volume={1.0}                            // 0 is muted, 1 is normal.
           muted={this.props.muted}                           // Mutes the audio entirely.
           paused={x.paused}                          // Pauses playback entirely.
           resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
           repeat                           // Repeat forever.
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
       style={{ width: deviceWidth, height: deviceHeight / 1.4 }}
       source={{ uri: `https://anonshot.com/photos/${x.uuid}.jpg`,
               priority: FastImage.priority.normal, }}

      />
    );
  }

  render() {
    const x = this.props.single_photo.x;
    console.log(x);
   return (
     <ScrollView
     refreshControl={
         <RefreshControl
             onRefresh={this.refreshList.bind(this)}
             refreshing={this.props.refreshing}
         />
     }
     >
        <CardSection id={x.uuid} key={x.uuid}>
        <View style={{ alignContent: 'flex-start',
justifyContent: 'space-between', marginTop:50
  }}>
{this.renderCaption(x)}
{this.renderTrashFlag(x)}
</View>
        <CardSection>
        {this.renderVideoPhoto(x)}
        <Text style={styles.timeTextStyle}>
        <Moment element={Text} fromNow>{x.timestamp}</Moment>
        </Text>
        <Text style={styles.timeTextStyle} >{x.photo_distance} km from you</Text>
        </CardSection>
        {x.comments.map((items) =>
          <Card key={items.uuid}>
 <Text style={styles.captionTextStyle}>{items.poster}: { items.comments }</Text>
 <Text style={styles.timeTextStyle}>
 <Moment element={Text} fromNow>{items.timestamp}</Moment>
 </Text>
          </Card>
        )}
        <TextInput
        maxHeight={250}
        autoGrow={false}
        editable ={true}
        maxLength ={255}
        autoCorrect={true}
        multiline={true}
        style={styles.inputStyle}
        placeholder='comment'
        onChangeText={this.onCommentChange.bind(this)}
        value={this.props.comment}
        />
        <TouchableOpacity
        mykey={x.uuid}
        onPress={() => this.postComment()}
        style={styles.buttonStyle}
        >
        <CardSection>
          <Text style={styles.captionTextStyle}>
          Make Comment
          </Text>
        </CardSection>
        </TouchableOpacity>
        </CardSection>
     </ScrollView>
  );
}
}
const styles = {
  errorTextStyle: {
  fontSize: 30,
  alignSelf: 'center',
  color: 'black',
},
captionTextStyle: {
fontSize: 14,
alignSelf: 'center',
color: 'black',
alignSelf: 'flex-start'
},
timeTextStyle: {
fontSize: 10,
alignSelf: 'center',
color: 'black',
alignSelf: 'flex-start'
},
paddingStyle: {
  fontSize: 30,
  alignSelf: 'left',
  color: 'black',
  width: deviceWidth,
  paddingTop: 30
},
deleteFlagIcon: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop:1,
    flex: 1

}
};

const mapStateToProps = state => {
return {
  user_uuid: state.auth.user_uuid,
  single_photo: state.photos.single_photo,
  loading: state.auth.loading,
  photos: state.photos.photos,
  authtoken: state.auth.authtoken,
  comment: state.photos.comment,
  muted: state.photos.muted,
  refreshing: state.photos.refreshing,
 };
};

export default connect(mapStateToProps, {
  PostComment,
  DeleteComment,
  ChangeComment,
  switchMute,
  setRefreshingSingle,
  deletePhoto
})(CommentView);
