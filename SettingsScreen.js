import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavBar } from './NavBar';
import Constants from "expo-constants";

export function SettingsScreen({navigation}) {
    return (
      <View style={SettingScreenStyles.container}>
      <ScrollView  contentContainerStyle={SettingScreenStyles.container}>

      </ScrollView>
      <NavBar navigation={navigation}></NavBar>
      <StatusBar style="auto" backgroundColor="black"></StatusBar>
  </View>  
    );
}

const SettingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems:'center',
    backgroundColor:'black',
  },
  bloodSugarCircle: {
      borderColor:'red',
      borderWidth:10,
      width: 200,
      height: 200,
      borderRadius: 200/2,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10
  },

  smallCircle: {
      borderColor:'red',
      borderWidth:10,
      width: 110,
      height: 110,
      borderRadius: 110/2,
      justifyContent:'center',
      alignItems:'center'
  },

  bloodSugarText: {
      color:'red',
      fontSize:40,
  },
  gainPointsText: {
      color:'red',
      fontSize:30,
  },
  goblinImage : {
      width:300,
      height:300
  },
  goblinName: {
      fontSize:30,
      color:'red'
  }

});