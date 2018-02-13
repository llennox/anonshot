import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CommentView from './components/CommentView';
import PhotoView from './components/PhotoView';
import ReviewPhoto from './components/ReviewPhoto';
import TakePhoto from './components/TakePhoto';
import PhotoByUserView from './components/PhotoByUserView';


const RouterComponent = () => {

  return (
  <Router titleStyle={styles.navbar} >

   <Scene
   style={{ paddingTop: 5 }}
   key='PhotoView'
   component={PhotoView}
   title="UmbreCam"
   leftButtonImage={require('./components/assets/photo-camera.png')}
   showIcon={true}
   onLeft={() => Actions.Camera()}
   rightButtonImage={require('./components/assets/user-shape.png')}
   onRight={() => Actions.login()}
   initial
   />

   <Scene
   style={{ paddingTop: 5 }}
   key='PhotoByUserView'
   component={PhotoByUserView}
   title="UmbreCam"
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
   title="UmbreCam"
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
    />

    <Scene
     key='login'
     component={LoginForm}
     title="UmbreCam"
    />

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
