import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';






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
       style={{ width: deviceWidth, height: deviceHeight / 1.4 }}
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
       style={{ width: deviceWidth, height: deviceHeight / 1.4 }}
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
     style={{ width: deviceWidth, height: deviceHeight / 1.4 }}
     source={{ uri: `https://anonshot.com/photos/${x.uuid}.jpg`,
             priority: FastImage.priority.normal, }}
    />
  );
}
