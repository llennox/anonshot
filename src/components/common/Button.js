import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, mykey }) => {
 const { buttonStyle, textStyle } = styles;

 return (
 <TouchableOpacity mykey={mykey} onPress={onPress} style={buttonStyle}>
   <Text style={textStyle}>
   {children}
   </Text>
 </TouchableOpacity>
 );
};

const styles = {
  textStyle: {
   alignSelf: 'center',
   color: 'black',
   fontSize: 16,
   fontWeight: '600',
   paddingTop: 1,
   paddingBottom: 1,
   fontFamily: 'Pixel'
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
   }
};

export { Button };
