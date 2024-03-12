import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavBar } from './NavBar';
import {useState} from 'react'
import Constants from "expo-constants";

function BloodSugarCircle() {
    return(
        <View style={GoblinScreenStyles.bloodSugarCircle}>
            <Text style={GoblinScreenStyles.bloodSugarText}>4.0 ML</Text>
            <Text style={GoblinScreenStyles.gainPointsText}>+3 Points</Text>
        </View>
    );
}

function FeedCircle() {
    return(
        <View style={GoblinScreenStyles.smallCircle}>
            <FontAwesome5 name="pizza-slice" size={24} color="#c3924f" />
            <Text style={GoblinScreenStyles.gainPointsText}>Feed</Text>
        </View>
    );
}

function PlayCircle() {
    return(
        <View style={GoblinScreenStyles.smallCircle}>
            <FontAwesome name="soccer-ball-o" size={24} color="#c3924f" />
            <Text style={GoblinScreenStyles.gainPointsText}>Play</Text>
        </View>
    );
}

function BatheCircle() {
    return(
        <View style={GoblinScreenStyles.smallCircle}>
            <FontAwesome name="bathtub" size={24} color="#c3924f" />
            <Text style={GoblinScreenStyles.gainPointsText}>Bathe</Text>
        </View>
    );
}

export function GoblinScreen({ navigation }) {
    const [goblinName, setGoblinName] = useState('Bartholomew');

    return(
        <View style={GoblinScreenStyles.container}>
            <ScrollView  contentContainerStyle={GoblinScreenStyles.container}>
            <BloodSugarCircle></BloodSugarCircle>
            <View style={{flexDirection:'row', gap:10}}>
                <FeedCircle></FeedCircle>
                <PlayCircle></PlayCircle>
                <BatheCircle></BatheCircle>
            </View>
            <Image style={GoblinScreenStyles.goblinImage} source={require('./assets/cuteghost.png')}></Image>
            <TextInput style={GoblinScreenStyles.goblinName} onChangeText={setGoblinName} value={goblinName}></TextInput>
            </ScrollView>
            <NavBar navigation={navigation}></NavBar>
            <StatusBar style="auto" backgroundColor="black"></StatusBar>
        </View>
    );
}

const GoblinScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      alignItems:'center',
      backgroundColor:'#e1d5c9',
    },
    bloodSugarCircle: {
        borderColor:'#222425',
        borderWidth:10,
        width: 200,
        height: 200,
        borderRadius: 200/2,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },

    smallCircle: {
        borderColor:'#222425',
        borderWidth:10,
        width: 110,
        height: 110,
        borderRadius: 110/2,
        justifyContent:'center',
        alignItems:'center'
    },

    bloodSugarText: {
        color:'#222425',
        fontSize:40,
    },
    gainPointsText: {
        color:'#222425',
        fontSize:30,
    },
    goblinImage : {
        width:300,
        height:300
    },
    goblinName: {
        fontSize:30,
        color:'#222425'
    }

  });