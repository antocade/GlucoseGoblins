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
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavBar } from "./NavBar";
import { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";

function BloodSugarCircle() {
  return (
    <View style={GoblinScreenStyles.bloodSugarCircle}>
      <Text style={GoblinScreenStyles.bloodSugarText}>4.0 ML</Text>
      <Text style={GoblinScreenStyles.gainPointsText}>10 Points</Text>
      <Text style={GoblinScreenStyles.addPointsText}>+3 Points/Min</Text>
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

export function GoblinScreen({ navigation }) {
  const [goblinName, setGoblinName] = useState("Bartholomew");
  const coolposition = useRef(new Animated.ValueXY(0, 0)).current;
  const animateScaleX = useRef(new Animated.Value(1)).current;

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

  return (
    <View style={GoblinScreenStyles.container}>
      <BloodSugarCircle></BloodSugarCircle>
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
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
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
    fontSize: 40,
  },
  gainPointsText: {
    color: "#222425",
    fontSize: 30,
  },
  addPointsText: {
    color: "#222425",
    fontSize: 15,
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
