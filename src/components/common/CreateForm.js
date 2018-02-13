import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

const CreateForm = (props) => {
 state = { email: '', password: '', username: '', checkpassword: '', error: '', loading: false };

onButtonPress() {
   this.setState({ loading: true, error: '' });

   const { username, password, email, checkpassword } = this.state;
   if (checkpassword !== password || checkpassword.length < 8) {
  this.setState({
    error: 'passwords did not match or were less than 8 characters',
    loading: false
  });
   } else if (username.length < 4 || username.indexOf(' ') >= 0) {
       this.setState({ error: 'username must be 4 or more characters', loading: false });
   } else if (!this.validateEmail(this.state.email)){
       this.setState({ error: 'you must enter a valid email', loading: false });
   } else {
       this.setState({ error: '' });
   }
}

anonButtonPress() {
    this.setState({ loading: true, error: '' });
    console.log('continue as anon send request');
}

logOnButtonPress() {
 //switch to log on form


}

renderButton() {
    if (this.state.loading) {
       return (
       <CardSection>
        <Spinner />
       </CardSection>
       );
    }
    return (
    <View>
    <CardSection>
       <Button onPress={this.onButtonPress.bind(this)} >
          <Text>create account</Text>
       </Button>
    </CardSection>
    <CardSection>
       <Button onPress={this.logOnButtonPress.bind(this)} >
          <Text>log in</Text>
       </Button>
    </CardSection>
    <CardSection>
       <Button onPress={this.anonButtonPress.bind(this)} >
          <Text>continue as anon</Text>
       </Button>
    </CardSection>
    </View>
    );
    }

 render() {
  return (
      <Card>
        <CardSection>
         <Input
         placeholder='Corvus_corax'
         label='username'
         value={this.state.username}
         onChangeText={username => this.setState({ username })}
         />
        </CardSection>
        <CardSection>
         <Input
           placeholder='user@gmail.com'
           label='Email'
           value={this.state.email}
           onChangeText={email => this.setState({ email })}
         />
        </CardSection>
        <CardSection>
         <Input
           placeholder='secret'
           label='password'
           secureTextEntry
           value={this.state.password}
           onChangeText={password => this.setState({ password })}
         />
        </CardSection>
        <CardSection>
          <Input
           placeholder='secret'
           label='retype password'
           secureTextEntry
           value={this.state.checkpassword}
           onChangeText={checkpassword => this.setState({ checkpassword })}
          />
         </CardSection>

          <Text style={styles.errorTextStyle}>
           {this.state.error}
          </Text>

            {this.renderButton()}

      </Card>
  );
 }
}

const styles = {
  errorTextStyle: {
  fontSize: 20,
  alignSelf: 'center',
  color: 'red'
  }
};

export { CreateForm };
