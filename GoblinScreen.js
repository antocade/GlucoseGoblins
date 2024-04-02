import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavBar } from "./NavBar";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants";
import useGoblinStore from "./GoblinStore";

const ListType = Object.freeze({ 
  NOTHING: 0, 
  FOOD: 1, 
  TOYS: 2, 
}); 


export function GoblinScreen({ navigation }) {
  let storage = require("./storage.json");
  const [goblinName, setGoblinName] = useState("Bartholomew");
  const coolposition = useRef(new Animated.ValueXY(0, 0)).current;
  const animateScaleX = useRef(new Animated.Value(1)).current;
  const apiLink = useGoblinStore((state) => state.apiLink);
  const refresh = useGoblinStore((state) => state.refresh);
  const setRefresh = useGoblinStore((state) => state.setRefresh);
  const points = useGoblinStore((state) => state.points);
  const increasePoints = useGoblinStore((state) => state.increasePoints);
  const bloodSugarUnits = useGoblinStore((state) => state.bloodSugarUnits);
  const hunger = useGoblinStore((state) => state.hunger);
  const play = useGoblinStore((state) => state.play);
  const cleanliness = useGoblinStore((state) => state.cleanliness);
  const decreaseHunger = useGoblinStore((state) => state.decreaseHunger);
  const decreasePlay = useGoblinStore((state) => state.decreasePlay);
  const decreaseCleanliness = useGoblinStore((state) => state.decreaseCleanliness);
  const increaseHunger = useGoblinStore((state) => state.increaseHunger);
  const increasePlay = useGoblinStore((state) => state.increasePlay);
  const increaseCleanliness = useGoblinStore((state) => state.increaseCleanliness);
  const inventory = useGoblinStore((state) => state.inventory);
  const setInventory = useGoblinStore((state) => state.setInventory);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [pointsPM, setPointsPM] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true)
  const [listType, setListType] = useState(ListType.NOTHING)
 // setInventory(JSON.stringify(storage));
  let jsonInventory = JSON.parse(inventory);
  if (apiLink == "" && firstLoad) {
    Alert.alert(
      "Error No API Link Entered",
      "No API Link has been entered. Please enter it in on the settings page.",
      [
        {
          text: "Accept",
          onPress: () => {
            navigation.navigate("Settings");
          },
          style: "accept",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          navigation.navigate("Settings");
        },
      }
    );
    setFirstLoad(false)
  }

  function BloodSugarCircle(props) {
    return (
      <View style={GoblinScreenStyles.bloodSugarCircle}>
        {props.bloodSugarUnits==0 ? <Text style={GoblinScreenStyles.bloodSugarText}>
          {ConvertBloodSugarToMMOL(props.bloodSugar)} mmol/L
        </Text> : <Text style={GoblinScreenStyles.bloodSugarText}>
          {props.bloodSugar} mg/dl
        </Text> } 
        <Text style={GoblinScreenStyles.gainPointsText}>
          {props.points} Points
        </Text>
        <Text style={GoblinScreenStyles.addPointsText}>
          {props.pointsPM} Points/5Min
        </Text>
      </View>
    );
  }

  function InventoryList(){
    const RenderFoodList = ({item}) => {
      return (
        <View style={GoblinScreenStyles.itemContainer}>
        {/* <Image source={item.picture} style={GoblinScreenStyles.itemImage} /> */}
        <Text style={GoblinScreenStyles.itemText}>{`${item.name} Restores ${item.hunger}`}</Text>
        <Pressable
          style={GoblinScreenStyles.buyButton}
          onPress={() => increaseHunger(item.hunger)}>
          <Text style={GoblinScreenStyles.buyButtonText}>Feed</Text>
        </Pressable>
      </View>
      );
    };

    const RenderToyList = ({item}) => {
      return (
        <View style={GoblinScreenStyles.itemContainer}>
        {/* <Image source={item.picture} style={GoblinScreenStyles.itemImage} /> */}
        <Text style={GoblinScreenStyles.itemText}>{`${item.name} Restores ${item.play}`}</Text>
        <Pressable
          style={GoblinScreenStyles.buyButton}
          onPress={() => increasePlay(item.play)}>
          <Text style={GoblinScreenStyles.buyButtonText}>Feed</Text>
        </Pressable>
      </View>
      );
    };

    if(listType == ListType.FOOD){
      const data = Object.keys(jsonInventory.food).map(key => ({
        key,
        ...jsonInventory.food[key]
      }));
      return(
        <View style={GoblinScreenStyles.list}>
          <Pressable onPress={() => setListType(ListType.NOTHING)}>
          <MaterialIcons name="cancel" size={24} color="black" />
          </Pressable>
          <FlatList  data={data} renderItem={RenderFoodList}> </FlatList>
        </View>
      )
    }
    else if (listType == ListType.TOYS) {
      const data = Object.keys(jsonInventory.toys).map(key => ({
        key,
        ...jsonInventory.toys[key]
      }));
      return(
        <View style={GoblinScreenStyles.list}>
          <Pressable onPress={() => setListType(ListType.NOTHING)}>
          <MaterialIcons name="cancel" size={24} color="black" />
          </Pressable>
          <FlatList  data={data} renderItem={RenderToyList}> </FlatList>
        </View>
      )
    }
  }
  
  
  function FeedCircle() {
    let percentage = hunger + "%"
      
    return (
      <Pressable onPress={() => setListType(ListType.FOOD)}>
        <View style={[GoblinScreenStyles.smallCircle]}>
          
          <View style={[GoblinScreenStyles.circleFill, { height:percentage}]} />
          
            <FontAwesome5 name="pizza-slice" size={24} color="#c3924f" />
          
        </View>
      </Pressable>
    );
  }
  
  function PlayCircle() {
    let percentage = play + "%"
    return (
      <Pressable onPress={() => setListType(ListType.TOYS)}>
        <View style={GoblinScreenStyles.smallCircle}>
      
          <View style={[GoblinScreenStyles.circleFill, { height:percentage}]} />
          
            <FontAwesome name="soccer-ball-o" size={24} color="#c3924f" />
          
        </View>
      </Pressable>
    );
  }
  
  function BatheCircle() {
    let percentage = cleanliness + "%"
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <View style={[GoblinScreenStyles.circleFill, {height:percentage}]} />
        <FontAwesome name="bathtub" size={24} color="#c3924f" />
      </View>
    );
  }

  function StatsCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <View style={[GoblinScreenStyles.circleFill, {height:"100%"}]} />
        <Ionicons name="stats-chart" size={24} color="#c3924f" />
      </View>
    );
  }
  

  function ConvertBloodSugarToMMOL(bloodSugar){
    let convertedBloodSugar = Math.round(bloodSugar * 0.0555)
    return convertedBloodSugar
  }

  async function FetchBloodSugarNumber() {
    console.log(apiLink)
    try {
      const response = await fetch(apiLink + "api/v1/entries.json");
      const json = await response.json();
      setBloodSugar(json[0].sgv);
    } catch (e) {
      console.log("API FAILED")
    }
  }

  function GetPointsPerMinute() {
    convertedBloodSugar = ConvertBloodSugarToMMOL(bloodSugar)
    console.log(convertedBloodSugar)
    if (convertedBloodSugar <= 8 && convertedBloodSugar >= 4) {
      setPointsPM(10)
    } else if (convertedBloodSugar <= 12 && convertedBloodSugar >= 8.1) {
      setPointsPM(5)
    } else {
      setPointsPM(1)
    }
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(coolposition, {
          toValue: { x: 20, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 40, y: -10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 60, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateScaleX, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 40, y: -10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 20, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 0, y: 0 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: -20, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: -40, y: -10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: -60, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateScaleX, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: -40, y: -10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: -20, y: 10 },
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(coolposition, {
          toValue: { x: 0, y: 0 },
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      FetchBloodSugarNumber();
      GetPointsPerMinute();
      increasePoints(pointsPM);
      decreaseCleanliness(5);
      decreaseHunger(5);
      decreasePlay(5);
    }, 500000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (refresh) {
      console.log("REFRESHED");
      FetchBloodSugarNumber();
      GetPointsPerMinute();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <View style={GoblinScreenStyles.container}>
      <BloodSugarCircle
        bloodSugar={bloodSugar}
        points={points}
        pointsPM={pointsPM}
        bloodSugarUnits={bloodSugarUnits}
      ></BloodSugarCircle>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <FeedCircle></FeedCircle>
        <PlayCircle></PlayCircle>
        <BatheCircle></BatheCircle>
        <StatsCircle></StatsCircle>
      </View>
      <Animated.Image
        style={[
          GoblinScreenStyles.goblinImage,
          {
            transform: [
              { translateY: coolposition.y },
              { translateX: coolposition.x },
              { scaleX: animateScaleX },
            ],
          },
        ]}
        source={require("./assets/cuteghost.png")}
      ></Animated.Image>

      {listType == ListType.NOTHING ? <View><TextInput
          style={GoblinScreenStyles.goblinName}
          onChangeText={setGoblinName}
          value={goblinName}
        ></TextInput>
      <View style={{ position: "absolute", bottom: -160, left: -116 }}>
        <NavBar navigation={navigation}></NavBar>
      </View></View> : <InventoryList></InventoryList>}
     
      <StatusBar style="auto" backgroundColor="#e1d5c9"></StatusBar>
    </View>
  );
}

const GoblinScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    backgroundColor: "#e1d5c9",
  },
  bloodSugarCircle: {
    borderColor: "#222425",
    borderWidth: 10,
    width: 230,
    height: 230,
    borderRadius: 230 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  smallCircle: {
    borderColor: "#222425",
    borderWidth: 10,
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden'
  },

  list: {
    width:"100%",
    borderColor:'black',
    borderWidth: 2,
    borderRadius: 10,
    flex:1,
  },

  bloodSugarText: {
    color: "#222425",
    fontSize: 35,
  },
  gainPointsText: {
    color: "#222425",
    fontSize: 30,
  },
  addPointsText: {
    color: "#222425",
    fontSize: 20,
  },
  goblinImage: {
    width: 300,
    height: 300,
  },
  goblinName: {
    fontSize: 30,
    color: "#222425",
  },
  circleFill: {
    backgroundColor: '#008148',
    width: '100%',
    bottom: 0,
    position: 'absolute',
    overflow: 'hidden'
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
  itemText: {
    color: '#222425', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  buyButton: {
    backgroundColor: '#c3924f',
    padding: 10,
    borderRadius: 5,
    marginLeft: 'auto', // Pushes the button to the right
  },
});
