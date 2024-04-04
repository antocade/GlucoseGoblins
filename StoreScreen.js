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
  let inv = useGoblinStore((state) => state.inventory);
  const filteredData = mockData.filter(item => item.category === selectedHeader);
  
  const tempObj = JSON.parse(inv);
  const isClothingOwned = (itemName) => {
    for (let i = 0; i < tempObj.clothing.length; i++) {
      if (tempObj.clothing[i].name === itemName && tempObj.clothing[i].own === 1) {
        return true;
      }
    }
    return false;
  };
  

  const onEquipItem = (itemName) =>{
    for(let i = 0; i < tempObj.clothing.length; i++){
      if (itemName == tempObj.clothing[i].name){
        tempObj.clothing[i].equip = 1 - tempObj.clothing[i].equip;
        console.log(tempObj.clothing[i].equip);
        //tempObj.clothing[i].own = 0;
        setInventory(JSON.stringify(tempObj));
      }
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
            if(itemName == "Cowboy Hat"){
              setPurchasedItems((prevItems) => new Set(prevItems.add(5)));
              tempObj.clothing[0].own = 1; // Add item ID to the purchased items
            }
            if(itemName == "Cool Sunglasses"){
              setPurchasedItems((prevItems) => new Set(prevItems.add(6)));
              tempObj.clothing[1].own = 1; // Add item ID to the purchased items
            }
            else{
              for(let i = 0; i < tempObj.food.length; i++){
                if(itemName == tempObj.food[i].name){
                  tempObj.food[i].amount = tempObj.food[i].amount + 1;
                }
              }
              for(let i = 0; i < tempObj.toys.length; i++){
                if(itemName == tempObj.toys[i].name){
                  tempObj.toys[i].amount++;
                }
              }
            }
          }
          setInventory(JSON.stringify(tempObj));
          //console.log(tempObj);
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
      {selectedHeader === "Clothing" && isClothingOwned(item.itemName) ? (
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