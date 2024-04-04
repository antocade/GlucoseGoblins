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
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavBar } from "./NavBar";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import useGoblinStore from "./GoblinStore";

const ListType = Object.freeze({
  NOTHING: 0,
  FOOD: 1,
  TOYS: 2,
});

export function GoblinScreen({ navigation }) {
  const goblinName = useGoblinStore((state) => state.goblinName);
  const doneLoading = useGoblinStore((state) => state.doneLoading);
  const setGoblinName = useGoblinStore((state) => state.setGoblinName);
  const coolposition = useRef(new Animated.ValueXY(0, 0)).current;
  const itemPosition = useRef(new Animated.ValueXY(0, 0)).current;
  const animateScaleX = useRef(new Animated.Value(1)).current;
  const apiLink = useGoblinStore((state) => state.apiLink);
  const points = useGoblinStore((state) => state.points);
  const increasePoints = useGoblinStore((state) => state.increasePoints);
  const bloodSugarUnits = useGoblinStore((state) => state.bloodSugarUnits);
  const hunger = useGoblinStore((state) => state.hunger);
  const play = useGoblinStore((state) => state.play);
  const cleanliness = useGoblinStore((state) => state.cleanliness);
  const cleanGoblin = useGoblinStore((state) => state.cleanGoblin);
  const decreaseHunger = useGoblinStore((state) => state.decreaseHunger);
  const decreasePlay = useGoblinStore((state) => state.decreasePlay);
  const decreaseCleanliness = useGoblinStore(
    (state) => state.decreaseCleanliness
  );
  const increaseHunger = useGoblinStore((state) => state.increaseHunger);
  const increasePlay = useGoblinStore((state) => state.increasePlay);
  const inventory = useGoblinStore((state) => state.inventory);
  const setInventory = useGoblinStore((state) => state.setInventory);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [pointsPM, setPointsPM] = useState(0);
  const [listType, setListType] = useState(ListType.NOTHING);
  const [equippedItem, setEquippedItem] = useState(null);
  let jsonInventory = JSON.parse(inventory);

  const clothingImages = {
    image1: require("./assets/cowboy.png"),
    image2: require("./assets/glasses.png"),
  };

  function BloodSugarCircle(props) {
    return (
      <View style={GoblinScreenStyles.bloodSugarCircle}>
        {props.bloodSugarUnits == 0 ? (
          <Text style={GoblinScreenStyles.bloodSugarText}>
            {ConvertBloodSugarToMMOL(props.bloodSugar)} mmol/L
          </Text>
        ) : (
          <Text style={GoblinScreenStyles.bloodSugarText}>
            {props.bloodSugar} mg/dl
          </Text>
        )}
        <Text style={GoblinScreenStyles.gainPointsText}>
          {props.points} Points
        </Text>
        <Text style={GoblinScreenStyles.addPointsText}>
          {props.pointsPM} Points/5Min
        </Text>
      </View>
    );
  }

  function InventoryList() {
    const UseItem = (name) => {
      console.log("USED ITEM");

      if (listType == ListType.FOOD) {
        for (i = 0; i < jsonInventory.food.length; i++) {
          console.log(jsonInventory.food[i]);
          if (jsonInventory.food[i].name == name) {
            if (jsonInventory.food[i].amount > 0) {
              increaseHunger(jsonInventory.food[i].hunger);
              jsonInventory.food[i].amount -= 1;
            }
          }
        }
      } else if (listType == ListType.TOYS) {
        for (i = 0; i < jsonInventory.toys.length; i++) {
          if (jsonInventory.toys[i].name == name) {
            if (jsonInventory.toys[i].amount > 0) {
              increasePlay(data[i].play);
              jsonInventory.toys[i].amount -= 1;
            }
          }
        }
      }
      setInventory(JSON.stringify(jsonInventory));
    };

    const RenderFoodList = ({ item }) => {
      if (item.amount != 0) {
        return (
          <View style={GoblinScreenStyles.itemContainer}>
            <Text
              style={GoblinScreenStyles.itemText}
            >{`${item.name} Restores ${item.hunger} Hunger Amount:${item.amount}`}</Text>
            <TouchableOpacity
              style={GoblinScreenStyles.buyButton}
              onPress={() => UseItem(item.name)}
            >
              <Text style={GoblinScreenStyles.buyButtonText}>Feed</Text>
            </TouchableOpacity>
          </View>
        );
      }
    };

    const RenderToyList = ({ item }) => {
      if (item.amount != 0) {
        return (
          <View style={GoblinScreenStyles.itemContainer}>
            {/* <Image source={item.picture} style={GoblinScreenStyles.itemImage} /> */}
            <Text
              style={GoblinScreenStyles.itemText}
            >{`${item.name} Restores:${item.play} Fun Amount:${item.amount}`}</Text>
            <TouchableOpacity
              style={GoblinScreenStyles.buyButton}
              onPress={() => UseItem(item.name)}
            >
              <Text style={GoblinScreenStyles.buyButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
        );
      }
    };

    const isInventoryEmpty = (data) => {
      for (i = 0; i < data.length; i++) {
        if (data[i].amount > 0) {
          return false;
        }
      }
      return true;
    };

    let renderFunction = "";
    let data = "";
    if (listType == ListType.FOOD) {
      data = jsonInventory.food;
      renderFunction = RenderFoodList;
    } else if (listType == ListType.TOYS) {
      data = jsonInventory.toys;
      renderFunction = RenderToyList;
    }

    if (isInventoryEmpty(data)) {
      return (
        <View style={[GoblinScreenStyles.list]}>
          <TouchableOpacity onPress={() => setListType(ListType.NOTHING)}>
            <MaterialIcons name="cancel" size={50} color="black" />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {listType == ListType.FOOD ? (
              <Text style={GoblinScreenStyles.bigItemText}>
                Food Inventory Is Empty
              </Text>
            ) : (
              <Text style={GoblinScreenStyles.bigItemText}>
                Toys Inventory Is Empty
              </Text>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={GoblinScreenStyles.list}>
          <TouchableOpacity onPress={() => setListType(ListType.NOTHING)}>
            <MaterialIcons name="cancel" size={50} color="black" />
          </TouchableOpacity>
          <FlatList data={data} renderItem={renderFunction}>
            {" "}
          </FlatList>
        </View>
      );
    }
  }

  function FeedCircle() {
    let percentage = hunger + "%";

    return (
      <TouchableOpacity onPress={() => setListType(ListType.FOOD)}>
        <View style={[GoblinScreenStyles.smallCircle]}>
          <View
            style={[GoblinScreenStyles.circleFill, { height: percentage }]}
          />

          <FontAwesome5 name="pizza-slice" size={24} color="#c3924f" />
        </View>
      </TouchableOpacity>
    );
  }

  function PlayCircle() {
    let percentage = play + "%";
    return (
      <TouchableOpacity onPress={() => setListType(ListType.TOYS)}>
        <View style={GoblinScreenStyles.smallCircle}>
          <View
            style={[GoblinScreenStyles.circleFill, { height: percentage }]}
          />

          <FontAwesome name="soccer-ball-o" size={24} color="#c3924f" />
        </View>
      </TouchableOpacity>
    );
  }

  function BatheCircle() {
    let percentage = cleanliness + "%";
    return (
      <TouchableOpacity
        onPress={() => {
          cleanGoblin();
          Alert.alert(
            goblinName + " Has Been Cleaned",
            "You gave " +
              goblinName +
              " the best bath of his life. He is 100% clean! ",
            [
              {
                text: "Accept",
                onPress: () => {},
                style: "accept",
              },
            ],
            {
              cancelable: true,
            }
          );
        }}
      >
        <View style={GoblinScreenStyles.smallCircle}>
          <View
            style={[GoblinScreenStyles.circleFill, { height: percentage }]}
          />

          <FontAwesome name="bathtub" size={24} color="#c3924f" />
        </View>
      </TouchableOpacity>
    );
  }

  function StatsCircle() {
    return (
      <View style={GoblinScreenStyles.smallCircle}>
        <View style={[GoblinScreenStyles.circleFill, { height: "100%" }]} />
        <Ionicons name="stats-chart" size={24} color="#c3924f" />
      </View>
    );
  }

  function ConvertBloodSugarToMMOL(bloodSugar) {
    let convertedBloodSugar = Math.round(bloodSugar * 0.0555);
    return convertedBloodSugar;
  }

  function GetEquippedItem() {
    for (i = 0; i < jsonInventory.clothing.length; i++) {
      if (jsonInventory.clothing[i].equip == 1) {
        if (jsonInventory.clothing[i].name == "Cowboy Hat") {
          setEquippedItem(clothingImages.image1);
        } else if (jsonInventory.clothing[i].name == "Cool Sunglasses") {
          setEquippedItem(clothingImages.image2);
        }
      }
    }
    console.log(jsonInventory.clothing);
    console.log(equippedItem);
  }

  async function FetchBloodSugarNumber() {
    console.log(apiLink);
    let currentApiLink = "";
    if (apiLink.slice(-1) != "/") {
      currentApiLink = apiLink + "/";
    } else {
      currentApiLink = apiLink;
    }

    try {
      const response = await fetch(currentApiLink + "api/v1/entries.json");
      const json = await response.json();
      setBloodSugar(json[0].sgv);
    } catch (e) {
      console.log("API FAILED")
      setBloodSugar(0);
    }
  }

  function GetPointsPerMinute() {
    convertedBloodSugar = ConvertBloodSugarToMMOL(bloodSugar);
    console.log(convertedBloodSugar);
    if (convertedBloodSugar <= 8 && convertedBloodSugar >= 4) {
      setPointsPM(10);
    } else if (convertedBloodSugar <= 12 && convertedBloodSugar >= 8.1) {
      setPointsPM(5);
    } else {
      setPointsPM(1);
    }
  }
  useEffect(() => {
    console.log(doneLoading);
    if (doneLoading) {
      console.log("Finished load");
      if (apiLink == "") {
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
      }
      console.log("REFRESHED");
      FetchBloodSugarNumber();
      GetPointsPerMinute();
      GetEquippedItem();
    }
  }, [doneLoading]);

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
    GetEquippedItem();
  }, [inventory]);

  useEffect(() => {
    FetchBloodSugarNumber();
  }, [apiLink]);

  useEffect(() => {
    GetPointsPerMinute();
  }, [bloodSugar]);

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
      <View>
        <Animated.Image
          style={[
            GoblinScreenStyles.clothingImage,
            {
              transform: [
                { translateY: coolposition.y },
                { translateX: coolposition.x },
                { scaleX: animateScaleX },
              ],
            },
          ]}
          source={equippedItem}
        ></Animated.Image>
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
      </View>

      {listType == ListType.NOTHING ? (
        <View style={{ width: "100%", flexGrow: 1, alignItems: "center" }}>
          <TextInput
            style={GoblinScreenStyles.goblinName}
            onChangeText={setGoblinName}
            value={goblinName}
          ></TextInput>
          <View style={{ position: "absolute", bottom: 0 }}>
            <NavBar navigation={navigation}></NavBar>
          </View>
        </View>
      ) : (
        <InventoryList></InventoryList>
      )}

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
    overflow: "hidden",
  },

  list: {
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    flex: 1,
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
    zIndex: 0,
  },
  clothingImage: {
    position: "absolute",
    left: 50,

    bottom: 150,
    width: 200,
    height: 200,
    zIndex: 10,
  },
  goblinName: {
    fontSize: 30,
    color: "#222425",
  },
  circleFill: {
    backgroundColor: "#008148",
    width: "100%",
    bottom: 0,
    position: "absolute",
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222425",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  itemText: {
    color: "#222425",
    fontSize: 16,
    fontWeight: "bold",
  },
  bigItemText: {
    color: "#222425",
    fontSize: 20,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#c3924f",
    padding: 10,
    borderRadius: 5,
    marginLeft: "auto", // Pushes the button to the right
  },
});
