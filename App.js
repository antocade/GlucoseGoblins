import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {GoblinScreen} from "./GoblinScreen";
import {SettingsScreen} from "./SettingsScreen";
import {StoreScreen} from "./StoreScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Goblin" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Goblin" component={GoblinScreen} />
          <Stack.Screen name="Store" component={StoreScreen}/>
          <Stack.Screen name="Settings" component={SettingsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
