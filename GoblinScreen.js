import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavBar } from "./NavBar";
import { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import useGoblinStore from "./GoblinStore";


export function GoblinScreen({ navigation }) {
  const [goblinName, setGoblinName] = useState("Bartholomew");
  const coolposition = useRef(new Animated.ValueXY(0, 0)).current;
  const animateScaleX = useRef(new Animated.Value(1)).current;
  const apiLink = useGoblinStore((state) => state.apiLink);
  const refresh = useGoblinStore((state) => state.refresh);
  const setRefresh = useGoblinStore((state) => state.setRefresh);
  const points = useGoblinStore((state) => state.points);
  const increasePoints = useGoblinStore((state) => state.increasePoints);
  const bloodSugarUnits = useGoblinStore((state) => state.bloodSugarUnits);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [pointsPM, setPointsPM] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true)

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
  
  function FeedCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <FontAwesome5 name="pizza-slice" size={24} color="#c3924f" />
      </View>
    );
  }
  
  function PlayCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <FontAwesome name="soccer-ball-o" size={24} color="#c3924f" />
      </View>
    );
  }
  
  function BatheCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <FontAwesome name="bathtub" size={24} color="#c3924f" />
      </View>
    );
  }
  
  function StatsCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
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
      console.log(json[0].sgv)
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
      <TextInput
        style={GoblinScreenStyles.goblinName}
        onChangeText={setGoblinName}
        value={goblinName}
      ></TextInput>
      <View style={{ position: "absolute", bottom: 0 }}>
        <NavBar navigation={navigation}></NavBar>
      </View>
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
});
