import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavBar } from './NavBar';
import {useState} from 'react'

import Constants from "expo-constants";
function BloodSugarCircle() {
    return(
        <View style={GSStyles.bloodSugarCircle}>
            <Text style={GSStyles.bloodSugarText}>4.00 ML</Text>
            <Text style={GSStyles.gainPointsText}>+3 Points</Text>
        </View>
    );
}

function FeedCircle() {
    return(
        <View style={GSStyles.smallCircle}>
            <FontAwesome5 name="pizza-slice" size={24} color="red" />
            <Text style={GSStyles.gainPointsText}>Feed</Text>
        </View>
    );
}

function PlayCircle() {
    return(
        <View style={GSStyles.smallCircle}>
            <FontAwesome name="soccer-ball-o" size={24} color="red" />
            <Text style={GSStyles.gainPointsText}>Play</Text>
        </View>
    );
}

function BatheCircle() {
    return(
        <View style={GSStyles.smallCircle}>
            <FontAwesome name="bathtub" size={24} color="red" />
            <Text style={GSStyles.gainPointsText}>Bathe</Text>
        </View>
    );
}

export function GoblinScreen({ navigation }) {
    const [goblinName, setGoblinName] = useState('Bartholomew');

    return(
        <View style={GSStyles.container}>
            <ScrollView  contentContainerStyle={GSStyles.container}>
            <BloodSugarCircle></BloodSugarCircle>
            <View style={{flexDirection:'row', gap:10}}>
                <FeedCircle></FeedCircle>
                <PlayCircle></PlayCircle>
                <BatheCircle></BatheCircle>
            </View>
            <Image style={GSStyles.goblinImage} source={require('./Images/cuteghost.png')}></Image>
            <TextInput style={GSStyles.goblinName} onChangeText={setGoblinName} value={goblinName}></TextInput>
            </ScrollView>
            <NavBar navigation={navigation}></NavBar>
            <StatusBar style="auto" backgroundColor="black"></StatusBar>
        </View>
    );
}

const GSStyles = StyleSheet.create({
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