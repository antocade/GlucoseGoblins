import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavBar } from './NavBar';
import {useState} from 'react'
import Constants from "expo-constants";


export function StoreScreen({navigation}) {
    const [selectedHeader, setSelectedHeader] = useState('Food');

  const mockData = [
    ...new Array(10).fill(null).map((_, index) => ({
      id: String(index),
      title: `Food Item ${index + 1}                     100pts`,
      category: 'Food',
      image: require('./assets/shop1.jpg'), 
    })),
    ...new Array(10).fill(null).map((_, index) => ({
      id: String(index + 7),
      title: `Clothing Item ${index + 1}                     100pts`,
      category: 'Clothing',
      image: require('./assets/shop2.jpg'), 
    })),
    ...new Array(10).fill(null).map((_, index) => ({
      id: String(index + 14),
      title: `Toy Item ${index + 1}                     100pts`,
      category: 'Toys',
      image: require('./assets/shop3.jpg'), 
    })),
  ];

  const filteredData = mockData.filter(item => item.category === selectedHeader);

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
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      paddingTop: 30,
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
  });