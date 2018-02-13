import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({ autoCapitalize ,value, onChangeText, placeholder, secureTextEntry, multiline }) => {
   const { inputStyle, containerStyle } = styles;

return (
    <View style={containerStyle}>
     <TextInput
     style={inputStyle}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
     />
    </View>
    );
};

const styles = {
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
     }

};

export { Input };
