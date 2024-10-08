import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import useGoblinStore from "./GoblinStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from '@expo/vector-icons';

function BloodSugarUnitsToggle({ bloodSugarUnits, setBloodSugarUnits }) {
  if (bloodSugarUnits == 0) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => setBloodSugarUnits(0)}>
          <View style={SettingScreenStyles.pressedButton}>
            <Text style={SettingScreenStyles.buttonText}>mmol/L</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setBloodSugarUnits(1)}>
          <View style={SettingScreenStyles.button}>
            <Text style={SettingScreenStyles.buttonText}>mg/dL</Text>
          </View>
        </Pressable>
      </View>
    );
  } else if (bloodSugarUnits == 1) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => setBloodSugarUnits(0)}>
          <View style={SettingScreenStyles.button}>
            <Text style={SettingScreenStyles.buttonText}>mmol/L</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setBloodSugarUnits(1)}>
          <View style={SettingScreenStyles.pressedButton}>
            <Text style={SettingScreenStyles.buttonText}>mg/dL</Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

export function SettingsScreen({ navigation }) {
  const bloodSugarUnits = useGoblinStore((state) => state.bloodSugarUnits);
  const setBloodSugarUnits = useGoblinStore(
    (state) => state.setBloodSugarUnits
  );
  const apiLink = useGoblinStore((state) => state.apiLink);
  const setApiLink = useGoblinStore((state) => state.setApiLink);
  const resetProgress = useGoblinStore((state) => state.resetProgress);
  const [apiLinkGood, setApiLinkGood] = useState(false);

  useEffect(() => {
    async function checkApi() {
      console.log(apiLink);
      let currentApiLink;
      if (apiLink.slice(-1) != "/") {
        currentApiLink = apiLink + "/";
      } else {
        currentApiLink = apiLink;
      }

      try {
        const response = await fetch(currentApiLink + "api/v1/entries.json");
        const json = await response.json();
        setApiLinkGood(true);
      } catch (e) {
        setApiLinkGood(false);
      }
    }
    checkApi();
  }, [apiLink]);

  return (
    <View style={SettingScreenStyles.container}>
      <ScrollView contentContainerStyle={SettingScreenStyles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={SettingScreenStyles.bloodSugarText}>Settings</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={SettingScreenStyles.mediumText}>
            Nightscout Api Link
          </Text>
          <TextInput
            style={SettingScreenStyles.inputBar}
            onChangeText={setApiLink}
            value={apiLink}
          ></TextInput>
        </View>
        <View style={{alignItems:"center"}}>
        {apiLinkGood ? (
          <View style={{ alignItems: "center", flexDirection:'row', gap:5 }}>
            <Text style={{ fontSize: 20, color:'green' }}>Connected To Nightscout</Text>
            <AntDesign name="check" size={24} color="green" />
          </View>
        ) : (
          <View style={{ alignItems: "center",flexDirection:'row', gap:5  }}>
            <Text style={{ fontSize: 20, color:'red' }}>Not Connected To Nightscout</Text>
            <Feather name="x" size={24} color="red" />
          </View>
        )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={SettingScreenStyles.mediumText}>
            Blood Sugar Measurement
          </Text>
          <BloodSugarUnitsToggle
            bloodSugarUnits={bloodSugarUnits}
            setBloodSugarUnits={setBloodSugarUnits}
          ></BloodSugarUnitsToggle>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Reset Progress",
                `Are you sure you want to reset your progress? Everything you have will be lost.`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Yes",
                    onPress: () => {
                      resetProgress();
                    },
                  },
                ]
              );
            }}
          >
            <View style={SettingScreenStyles.bigButton}>
              <Text style={SettingScreenStyles.buttonText}>Reset Progress</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar navigation={navigation}></NavBar>
      <StatusBar style="auto" backgroundColor="#e1d5c9"></StatusBar>
    </View>
  );
}

const SettingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#e1d5c9",
    gap: 20,
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

  mediumText: {
    color: "#222425",
    fontSize: 30,
  },

  buttonText: {
    color: "#222425",
    fontSize: 20,
  },

  bigButton: {
    borderColor: "#222425",
    borderWidth: 2,
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderColor: "#222425",
    borderWidth: 2,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  pressedButton: {
    borderColor: "#222425",
    backgroundColor: "gray",
    borderWidth: 2,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  inputBar: {
    borderColor: "#222425",
    borderWidth: 2,
    width: "75%",
    height: 100,
    color: "#222425",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    textAlign: "center",
  },

  smallCircle: {
    borderColor: "#222425",
    borderWidth: 10,
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
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
  goblinImage: {
    width: 300,
    height: 300,
  },
  goblinName: {
    fontSize: 30,
    color: "#222425",
  },
});
