import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import { RenderComments } from '../actions';

class theMapView extends Component {

  getCommentView(x) {
    this.props.RenderComments(x);
  }

  render() {
    console.log(this.props);
    const mapMe = this.props.photos.objects;
   return (
     <View style={styles.container}>
    <MapView
     style={styles.map}
     showsUserLocation={true}
     mapType='terrain'
    region={{
      latitude: this.props.single_photo.x.lat,
      longitude: this.props.single_photo.x.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    >
    {mapMe.map((x, i) =>
    <Marker
      key={i}
      coordinate={{ latitude: x.lat, longitude: x.lon }}
      title={x.poster}
      description={x.caption}
      onCalloutPress={() => this.getCommentView({ x })}
    />
  )}
    </MapView>
    </View>

  );
}
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

const mapStateToProps = state => {
return {
  single_photo: state.photos.single_photo,
  photos: state.photos.photos
 };
};

export default connect(mapStateToProps, {
  RenderComments
})(theMapView);
