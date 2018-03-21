import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  CameraRoll
} from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { CardSection, Card, Button } from './common';
import {
  PostPhoto,
  ChangeCaption,
  PostVideo,
  switchMute,
  popToHome
} from '../actions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class ReviewPhoto extends Component {

  onPopButton() {
    this.props.popToHome();
  }

  onCaptionChange(text) {
     this.props.ChangeCaption(text);
  }

  postPhoto() {
    if (this.props.banned) {
      return;
    }
        const token = this.props.authtoken;
        const caption = this.props.caption;
        const useruuid = this.props.user_uuid;
        if (this.props.saved_video_location) {
          const media = this.props.saved_video_location;
          this.props.PostVideo(token, useruuid, caption, media);
        }
        if (this.props.saved_photo_location) {
          const media = this.props.saved_photo_location;
          this.props.PostPhoto(token, useruuid, caption, media);
        }
  }

  savePhoto() {
    CameraRoll.saveToCameraRoll(this.props.saved_photo_location).then(() => {
      return (
        Alert.alert(
      '',
      'your photo has been saved to your device',
      [
        { text: 'Great!', onPress: () => console.log('photo saved') },
      ],
      { cancelable: false }
    )
    );
  }).catch(() => {
    return (
      Alert.alert(
    '',
    'something went wrong :/',
    [
      { text: 'sorry!', onPress: () => console.log('photo save fail') },
    ],
    { cancelable: false }
  )
  );
});
  }

  renderPopButton() {
    return (
      <CardSection>
      <Button
      style={styles.errorTextStyle}
       onPress={this.onPopButton.bind(this)}
      >
        <Text style={styles.notanonTextStyle}>Cancel</Text>
      </Button>
      </CardSection>
    );
  }


  renderSaveButton() {
    return (
      <CardSection>
      <Button
      style={styles.errorTextStyle}
       onPress={() => this.savePhoto()}
      >
        <Text style={styles.notanonTextStyle}>Save Photo</Text>
      </Button>
      </CardSection>
    );
  }

  renderVideoPhoto() {
    if (this.props.saved_photo_location) {
      const loc = this.props.saved_photo_location;
    return (
      <CardSection>
      <Image
       style={{ width: deviceWidth,
         height: deviceHeight / 1.4,
         alignSelf: 'center',
        marginTop: 40 }}
       source={{ uri: loc }}
      />
      </CardSection>
    );
  }
  const loc = this.props.saved_video_location;
  return (
    <TouchableWithoutFeedback
    onPress={() => { this.props.switchMute(); }}
    style={styles.buttonStyle}
    activeOpacity={0.1}
    >
    <Video
     style={{ width: deviceWidth,
       height: deviceHeight / 1.4,
       alignSelf: 'center',
     marginTop: 40 }}
     source={{ uri: loc }}
     ref={(ref) => {
         this.player = ref;
       }}                                      // Store reference
       rate={1.0}                              // 0 is paused, 1 is normal.
       volume={1.0}                            // 0 is muted, 1 is normal.
       muted={this.props.muted}                           // Mutes the audio entirely.
       paused={false}                          // Pauses playback entirely.
       resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
       repeat                         // Repeat forever.
       playInBackground={false}
        // Audio continues to play when app entering background.
       playWhenInactive={false}
        // [iOS] Video continues to play when control or notification center are shown.
       ignoreSilentSwitch={'ignore'}
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

  renderMainView() {
    if (this.props.refreshing) {
    return (
      <View
        style={{
          flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
    }}>
      <Image
       style={{ width: 256, height: 256, alignSelf: 'center' }}
       source={require('./assets/ramstine.gif')}
       resizeMode="contain"
      />
    <Text style={styles.errorTextStyle}>{this.props.refText}</Text>
  </View>
    );
  }
   return (
    <View>
     <Card>
        {this.renderVideoPhoto()}
        <CardSection>
        <TextInput
        maxHeight={250}
        autoGrow={false}
        editable={true}
        maxLength={255}
        autoCorrect={true}
        multiline={true}
        style={styles.inputStyle}
        placeholder='description'
        onChangeText={this.onCaptionChange.bind(this)}
        value={this.props.caption}
        />
        </CardSection>
      </Card>
     <View style={{ marginTop: 5 }} />
        <Button
        onPress={() => this.postPhoto()}
        style={styles.buttonStyle}
        >
          <Text style={styles.notanonTextStyle}>
          Post Photo/Video
          </Text>
        </Button>

  <View style={{ marginTop: 5 }} />
        {this.renderSaveButton()}
    <View style={{ marginTop: 5 }} />
        {this.renderPopButton()}
    </View>
  );
}

render() {
 return (
  <ScrollView>
   {this.renderMainView()}
  </ScrollView>
);
}
}
const styles = {
  errorTextStyle: {
  fontSize: 30,
  flex: 1,
  alignSelf: 'center',
  color: 'black',
},
captionTextStyle: {
fontSize: 18,
alignSelf: 'center',
color: 'black',
marginRight: 120
},
paddingStyle: {
fontSize: 30,
alignSelf: 'left',
color: 'black',
width: deviceWidth,

paddingTop: 30
},
inputStyle: {
color: 'black',
paddingRight: 5,
paddingLeft: 5,
fontSize: 18,
lineHeight: 23,
flex: 1,
    },
containerStyle: {
 height: 40,
 flex: 1,
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'flex-start'
},
headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    flex: 1,
    fontSize: 50,
    marginTop: 300,
    width: 200,
    backgroundColor: 'yellow',
  },
  notanonTextStyle: {
  fontSize: 18,
  color: 'rgb(0,122,255)',
  marginLeft: 4,
  },
loadingStyle: {
  borderBottomWidth: 1,
  flex: 1,
  //justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  backgroundColor: '#fff',
  flexDirection: 'column',
  borderColor: 'black',
  position: 'relative',
  justifyContent: 'flex-start',
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
  saved_photo_location: state.savedphoto.review_photo.uri,
  saved_video_location: state.savedphoto.review_video.uri,
  caption: state.savedphoto.caption,
  refreshing: state.photos.refreshing,
  muted: state.photos.muted,
  paused: state.photos.paused,
  banned: state.auth.banned,
  refText: state.savedphoto.refText
 };
};

export default connect(mapStateToProps, {
  ChangeCaption,
  PostPhoto,
  PostVideo,
  switchMute,
  popToHome
})(ReviewPhoto);
