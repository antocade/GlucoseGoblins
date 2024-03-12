import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export function NavBar({navigation}) {
    return(
        
        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <Pressable style={NBStyle.square} onPress={() => navigation.navigate("Store")}>
                <View style={{justifyContent:'center', alignItems:'center'}} >
                    <Entypo name="shop" size={40} color="#c3924f" />
                    <Text style={NBStyle.text}>Shop</Text>
                </View>
            </Pressable >
            <Pressable style={NBStyle.square} onPress={() => navigation.navigate("Goblin")}>
                <View  style={{justifyContent:'center', alignItems:'center'}}>
                    <Entypo name="home" size={40} color="#c3924f" />
                    <Text  style={NBStyle.text}>Home</Text>
                </View>
            </Pressable >
            <Pressable style={NBStyle.square} onPress={() => navigation.navigate("Settings")}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <FontAwesome name="gear" size={40} color="#c3924f" />
                    <Text  style={NBStyle.text}>Settings</Text>
                </View >
            </Pressable >
        </View>
    );
}

const NBStyle = StyleSheet.create({
    text:{
        fontSize:20,
        color:'#222425'
    },
    square: {
        height:100,
        flex:1,
        borderWidth:2,
        borderColor:'#222425',
        alignItems:'center',
        justifyContent:'center',
        verticalAlign:'center'
    }
  });