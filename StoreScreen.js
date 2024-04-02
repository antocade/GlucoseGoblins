import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavBar } from './NavBar';
import {useState} from 'react'
import Constants from "expo-constants";
import useGoblinStore from "./GoblinStore"
import mockData from './mockData'; 



export function StoreScreen({ navigation }) {
  const [selectedHeader, setSelectedHeader] = useState('Food');
  let points = useGoblinStore((state) => state.points);
  const decreasePoints = useGoblinStore((state) => state.decreasePoints);
  const [purchasedItems, setPurchasedItems] = useState(new Set()); // State to track purchased items
  const setInventory = useGoblinStore((state) => state.setInventory);
  //let inv = useGoblinStore((state) => state.inventory);
  const filteredData = mockData.filter(item => item.category === selectedHeader);
  var inv = `{
    "food": {
     "pizza": {"name": "Pizza", "amount": 0, "hunger": 25},
     "soda": {"name": "Soda", "amount": 0, "hunger": 15},
     "sandwich": {"name": "Sandwich", "amount": 0, "hunger": 30},
     "steak": {"name": "Steak", "amount": 0, "hunger": 80}
    },
    "clothing": {
     "hat": {"name": "Cowboy Hat", "picture": "./assets/cowboy.jpg", "equip": 0},
     "glasses": {"name": "Cool Sunglasses", "picture": "./assets/glasses.jpg", "equip": 0}
    },
    "toys": {
     "ball": {"name": "Ball", "amount": 0, "play": 25},
     "yo-yo": {"name": "Yo-Yo", "amount": 0, "play": 15},
     "ipad": {"name": "Ipad", "amount": 0, "play": 100}
    }
  }`;
  const tempObj = JSON.parse(inv);
  
  const onEquipItem = (itemName) =>{
    if (itemName == tempObj.clothing.hat.name){
      tempObj.clothing.hat.equip = 1 - tempObj.clothing.hat.equip;
      console.log(tempObj.clothing.hat.equip);
      setInventory(JSON.stringify(tempObj));
    }
    else if (itemName == tempObj.clothing.glasses.name){
      tempObj.clothing.glasses.equip = 1 - tempObj.clothing.glasses.equip;
      console.log(tempObj.clothing.glasses.equip);
      setInventory(JSON.stringify(tempObj));
    }
  };
  const onBuyItem = (itemId, itemName, cost) => {
    Alert.alert(
      "Buy Item",
      `Are you sure you want to buy ${itemName} for ${cost}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => {
          if (cost > points) {
            Alert.alert("Insufficient Funds", "You do not have enough points for this", [{ text: "Okay", style: "okay" }])
          } else {
            decreasePoints(cost);
            setPurchasedItems((prevItems) => new Set(prevItems.add(itemId))); // Add item ID to the purchased items
          }
        }},
      ]
    );
  };
  const HeaderButton = ({ title }) => (
    <TouchableOpacity
      style={[styles.headerButton, selectedHeader === title && styles.selectedHeaderButton]}
      onPress={() => setSelectedHeader(title)}
    >
      <Text style={[styles.headerText, selectedHeader === title && styles.selectedHeaderText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.picture} style={styles.itemImage} />
      <Text style={styles.itemText}>{`${item.itemName} - ${item.cost}`}</Text>
      {purchasedItems.has(item.id) ? (
        <TouchableOpacity style={styles.buyButton} onPress={() => onEquipItem(item.itemName)}>
          <Text style={styles.buyButtonText}>Equip</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => onBuyItem(item.id, item.itemName, item.cost)}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.pointsCounter}>
        <Text style={styles.pointsText}>Points: {points}</Text>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <HeaderButton title="Food" />
        <HeaderButton title="Clothing" />
        <HeaderButton title="Toys" />
      </View>
    
      {/* Content */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
        <NavBar navigation={navigation}></NavBar>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e1d5c9', 
    },
    pointsCounter: {
      backgroundColor: '#e1d5c9', // Adjust the background color as needed
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight + 10, // Ensure it's not covered by the status bar
    },
    pointsText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#222425', // Adjust the text color as needed
    },
    // Adjust the padding of the header to make space for the points counter if necessary
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: '#e1d5c9',
    },
    headerButton: {
      padding: 10,
    },
    selectedHeaderButton: {
      borderBottomWidth: 3, 
      borderBottomColor: '#222425',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 18, 
      color: '#222425', 
    },
    selectedHeaderText: {
      color: '#222425', 
    },
    list: {
      flex: 1,
    },
    itemContainer: {
      padding: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#222425',
    },
    itemText: {
      color: '#222425', 
      fontSize: 16, 
      fontWeight: 'bold', 
    },
    itemContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#222425',
    },
    itemImage: {
      width: 50, 
      height: 50, 
      marginRight: 10, 
      borderRadius: 25, 
    },
    buyButton: {
      backgroundColor: '#c3924f',
      padding: 10,
      borderRadius: 5,
      marginLeft: 'auto', // Pushes the button to the right
    },
    buyButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
  });