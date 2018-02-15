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
  getPhotosByUser,
  popToHome
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

    onPopButton() {
      this.props.popToHome();
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
           <Text style={styles.notanonTextStyle}>log in</Text>
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
          <Text style={styles.notanonTextStyle}>Create account</Text>
        </Button>
      );
    }

    renderPopButton() {
      return (
        <CardSection>
        <Button style={styles.errorTextStyle} onPress={this.onPopButton.bind(this)} >
          <Text style={styles.notanonTextStyle}>Go Back</Text>
        </Button>
        </CardSection>
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
         placeholder='password'
         label='password'
         secureTextEntry
         value={this.state.password}
         onChangeText={password => this.setState({ password })}
         autoCapitalize='none'
       />
      </CardSection>
      <CardSection>
        <Input
         placeholder='password'
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
        placeholder='username'
        label='username'
        onChangeText={this.onlgUsernameChange.bind(this)}
        value={this.props.usernameText}
        autoCapitalize='none'
        />
       </CardSection>
       <CardSection>
        <Input
          placeholder='password'
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
  return (
      <ScrollView style={{ marginTop:50 }}>
       <Card>
       <CardSection>
       <Text style={styles.infoTextStyle}> Hello {this.props.username}</Text>
       <Switch
        value={this.props.isanon}
        onValueChange={() => { this.props.isanonSwitch(this.props.user_uuid, this.props.authtoken); }}
       />
      <TouchableOpacity onPress={() => this.getUserPhotos(this.props.username)} >
        <Text style={styles.infoTextStyle}>you are posting as<Text style={styles.notanonTextStyle}> {this.props.username}</Text></Text>
      </TouchableOpacity>
      </CardSection>
      <CardSection>
       {this.renderLogOutButton()}
      </CardSection>
     </Card>
     <View style={{ marginTop: 15 }} />
     {this.renderPopButton()}
    </ScrollView>
  );
}
 return (
<ScrollView style={{ marginTop: 50 }}>
  {this.renderCreateForm()}
  <View style={{ marginTop: 25 }} />
 {this.renderLogInForm()}
 <View style={{ marginTop: 15 }} />
 {this.renderPopButton()}
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
  getPhotosByUser,
  popToHome
})(LoginForm);
