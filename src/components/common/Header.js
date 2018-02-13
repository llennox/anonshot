//make component
import React from 'react';
import { Text, View } from 'react-native';


// render it
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
       <View style={viewStyle}>
        <Text style={textStyle}>{props.headerText}</Text>
       </View>
    );
};

const styles = {
   viewStyle: {
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height:60,
      paddingTop:15,
      shadowColor: '#000000',
      shadowOffset: {width:0,height:2},
      shadowOpacity: 0.8,
      elevation: 2,
      position: 'relative'
   },

   textStyle: {
   fontSize:20,
   color: '#ffffff',

   }
};


//make it available globally

export { Header };