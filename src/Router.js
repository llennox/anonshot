import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CommentView from './components/CommentView';
import PhotoView from './components/PhotoView';
import ReviewPhoto from './components/ReviewPhoto';
import TakePhoto from './components/TakePhoto';
import PhotoByUserView from './components/PhotoByUserView';
import theMapView from './components/theMapView';


const RouterComponent = () => {

  return (
  <Router titleStyle={styles.navbar} >
    <Scene key='root'>
       <Scene
        style={{ paddingTop: 5 }}
        key='PhotoView'
        component={PhotoView}
        title="Local Lens"
        leftButtonImage={require('./components/assets/photo-camera.png')}
        onLeft={() => Actions.Camera()}
        rightButtonImage={require('./components/assets/user-shape.png')}
        onRight={() => Actions.login()}
        initial
       />
       <Scene
        onLeft={() => Actions.photoView()}
        component={TakePhoto}
        key='Camera'
        navigationBarStyle={{ backgroundColor: 'transparent',
        borderBottomColor: 'transparent' }}
       />
       <Scene
        key='ReviewPhoto'
        component={ReviewPhoto}
        navigationBarStyle={{ backgroundColor: 'transparent',
        borderBottomColor: 'transparent' }}
        renderBackButton={() => (null)}
       />
       <Scene
        key='login'
        component={LoginForm}
        title="Local Lens"
        renderBackButton={() => (null)}
       />
       <Scene
        style={{ paddingTop: 5 }}
        key='PhotoByUserView'
        component={PhotoByUserView}
        title="Local Lens"
        leftButtonImage={require('./components/assets/photo-camera.png')}
        showIcon={true}
        onLeft={() => Actions.Camera()}
        rightButtonImage={require('./components/assets/user-shape.png')}
        onRight={() => Actions.login()}
       />
       <Scene
        style={{ paddingTop: 25 }}
        key='CommentView'
        component={CommentView}
        title="Local lens"
       />
       <Scene
        style={{ paddingTop: 25 }}
        key='theMapView'
        component={theMapView}
        title="Local lens"
       />
    </Scene>
  </Router>
  );
};

const styles = {
  navbar: {
  fontSize: 30,
  alignSelf: 'center',
  color: 'black'
}
};

export default RouterComponent;
