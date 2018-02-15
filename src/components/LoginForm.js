import React, { Component } from 'react';
import { Text,
  Image,
  Dimensions,
  Switch,
  View,
  Modal,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged,
  passwordChanged,
  lgusernameChanged,
  lgpasswordChanged,
  logInUser,
  isanonSwitch,
  CreateAccount,
  logOutUser,
  updateError,
  updateLogInError,
  getPhotosByUser
 } from '../actions';
import { Button, Card, CardSection, Input } from './common';


class LoginForm extends Component {
  state = { email: '', password: '', username: '', checkpassword: '', error: '', loading: false };

  onCreateButtonPress() {
     this.setState({ loading: true, error: '' });

     const { username, password, email, checkpassword } = this.state;
     if (checkpassword !== password || checkpassword.length < 8) {
    this.props.updateError('passwords did not match or were less than 8 characters');
    this.setState({
      loading: false
    });
  } else if (username.length < 4 || username.indexOf(' ') >= 0) {
         this.setState({ error: 'username must be 4 or more characters', loading: false });
     } else if (!this.validateEmail(this.state.email)){
         this.props.updateError('you must enter a valid email')
         this.setState({ error: 'you must enter a valid email', loading: false });
     } else {
         this.setState({ error: '' });
         this.props.CreateAccount( username, email, password, this.props.authtoken )
     }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  getUserPhotos(poster) {
      this.props.getPhotosByUser(poster, this.props.authtoken, 1);
  }


    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onlgUsernameChange(text) {
        this.props.lgusernameChanged(text);
    }

    onlgPasswordChange(text) {
        this.props.lgpasswordChanged(text);
    }

    logInButtonPress() {
      this.props.logInUser( this.props.lgusername, this.props.lgpassword, this.props.authtoken );
    }

    logOutButtonPress() {
      this.props.logOutUser( this.props.authtoken );
    }

    renderButton() {
      return (
        <Button style={styles.errorTextStyle} onPress={this.logInButtonPress.bind(this)} >
           <Text>log in</Text>
        </Button>
      );
    }

    renderLogOutButton() {
      return (
        <Button style={styles.errorTextStyle} onPress={this.logOutButtonPress.bind(this)} >
           <Text style={styles.notanonTextStyle}>log out</Text>
        </Button>
      );
    }

    renderCreateButton() {
      return (
        <Button style={styles.errorTextStyle} onPress={this.onCreateButtonPress.bind(this)} >
           Create account
        </Button>
      );
    }

renderCreateForm() {
  return (
    <Card>
      <CardSection>
       <Input
       placeholder='username'
       label='username'
       value={this.state.username}
       onChangeText={username => this.setState({ username })}
       autoCapitalize='none'
       />
      </CardSection>
      <CardSection>
       <Input
         placeholder='user@gmail.com'
         label='Email'
         value={this.state.email}
         onChangeText={email => this.setState({ email })}
         autoCapitalize='none'
       />
      </CardSection>
      <CardSection>
       <Input
         placeholder='secret'
         label='password'
         secureTextEntry
         value={this.state.password}
         onChangeText={password => this.setState({ password })}
         autoCapitalize='none'
       />
      </CardSection>
      <CardSection>
        <Input
         placeholder='secret'
         label='retype password'
         secureTextEntry
         value={this.state.checkpassword}
         onChangeText={checkpassword => this.setState({ checkpassword })}
         autoCapitalize='none'
        />
       </CardSection>

        <Text style={styles.errorTextStyle}>
         {this.props.error}
        </Text>
        <CardSection>
          {this.renderCreateButton()}
       </CardSection>
    </Card>
  );
}

    renderLogInForm() {
     return (
       <Card>
       <CardSection>
        <Input
        style={styles.paddingStyle}
        placeholder='📷'
        label='username'
        onChangeText={this.onlgUsernameChange.bind(this)}
        value={this.props.usernameText}
        autoCapitalize='none'
        />
       </CardSection>
       <CardSection>
        <Input
          placeholder='secret'
          label='password'
          style={styles.errorTextStyle}
          secureTextEntry
          onChangeText={this.onlgPasswordChange.bind(this)}
          value={this.props.password}
          autoCapitalize='none'
        />
       </CardSection>
        <Text style={styles.errorTextStyle}>
         {this.props.logInError}
        </Text>
       <CardSection>
          {this.renderButton()}
       </CardSection>
       </Card>
  );
 }

 renderLogOut() {
   return (
     <CardSection>
        {this.renderLogOutButton()}
     </CardSection>
   )
 }



render() {
  console.log(typeof this.props.created);
  console.log(this.props.created);
  if (this.props.loading) {
    return (
    <CardSection >
    <Image
     style={{ width: 256, height: 256, alignSelf: 'center', marginTop: 100  }}
     source={require('./assets/ramstine.gif')}
     resizeMode="contain"
    />
   </CardSection>
 );
}

  if (this.props.created == true || this.props.created == 'true') {
    if (this.props.isanon) {
      return (
      <View style={{ marginTop:50 }}>
      <Card>
      <CardSection>
        <Text style={styles.infoTextStyle}> Hello {this.props.username}</Text>
        <Switch
         value={this.props.isanon}
         onValueChange={() => { this.props.isanonSwitch(this.props.user_uuid, this.props.authtoken); }}
        />
        <Text  style={styles.infoTextStyle}>you are posting as "anon"</Text>
        </CardSection>
        {this.renderLogOut()}
      </Card>

      </View>
    );
    }
  return (
    <View style={{ marginTop:50 }}>

  <Card>
    <Text style={styles.infoTextStyle}> Hello {this.props.username}</Text>
    <Switch
     value={this.props.isanon}
     onValueChange={() => { this.props.isanonSwitch(this.props.user_uuid, this.props.authtoken); }}
    />

    <TouchableOpacity
      onPress={() => this.getUserPhotos(this.props.username)}
    >
      <Text style={styles.infoTextStyle}>you are posting as<Text style={styles.notanonTextStyle}> {this.props.username}</Text></Text>
    </TouchableOpacity>

    {this.renderLogOut()}
  </Card>

  </View>
  );
}
 return (
<ScrollView style={{ marginTop: 50 }}>
  {this.renderCreateForm()}
  <View style={{ marginTop: 25 }} />
 {this.renderLogInForm()}
</ScrollView>
);
}
}

const styles = {
  errorTextStyle: {
  fontSize: 22,
  alignSelf: 'center',
  color: 'black',

},
notanonTextStyle: {
fontSize: 18,
color: 'rgb(0,122,255)',
marginLeft:4,

},
  paddingStyle: {
  fontSize: 30,
  alignSelf: 'center',
  color: 'black',
  paddingTop: 30
},
infoTextStyle: {
fontSize: 22,
color: 'black',
textAlign: 'center',

}

};

const mapStateToProps = state => {
return {
  username: state.auth.username,
  password: state.auth.password,
  lgusername: state.auth.username,
  lgpassword: state.auth.password,
  authtoken: state.auth.authtoken,
  error: state.auth.error,
  loading: state.auth.loading,
  user_uuid: state.auth.user_uuid,
  created: state.auth.created,
  isanon: state.auth.isanon,
  logInError: state.auth.logInError,

 };
};

export default connect(mapStateToProps, {
  usernameChanged,
  passwordChanged,
  lgpasswordChanged,
  lgusernameChanged,
  logInUser,
  CreateAccount,
  isanonSwitch,
  logOutUser,
  updateError,
  updateLogInError,
  getPhotosByUser
})(LoginForm);
