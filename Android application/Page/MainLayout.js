import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
// Screensw
import HomeScreen from '../pages/HomeScreen';
import BrowseScreen from '../pages/BrowseScreen';
import ProfileScreen from '../pages/ProfileScreen';
import LogScreen from '../pages/LogScreen';

//Screen names
const homeName = "Home";
const browseName = "Browse";
const profileName = "Profile";
const logscreen = "Logs";

const Tab = createBottomTabNavigator();

function MainLayout() {
  return (
      <Tab.Navigator
        screenOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70,}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} 
            options={{
              tabBarIcon:({focused}) =>
              (
                <View>
                  <Image
                    source = {require("../image/home.png")}
                    resizeMode = 'contain'
                    style={styles.iconsize}/>
                </View>
              ),
              headerStyle: {
                backgroundColor: '#F5DEB3', //Set Header color
              },
              headerTintColor: "black", //Set Header text color
              headerTitleStyle: {
                fontWeight: "bold", //Set Header text style
              },
            }}/>
        <Tab.Screen name={browseName} component={BrowseScreen} 
                   options={{
                    tabBarIcon:({focused}) =>
                    (
                      <View>
                        <Image
                          source = {require("../image/search.png")}
                          resizeMode = 'contain'
                          style={styles.iconsize}/>
                      </View>
                    ),
                    headerStyle: {
                      backgroundColor: '#F5DEB3', //Set Header color
                    },
                    headerTintColor: 'black', //Set Header text color
                    headerTitleStyle: {
                      fontWeight: "bold", //Set Header text style
                    },
                  }}/>
        <Tab.Screen name={logscreen} component={LogScreen} 
                   options={{
                    tabBarIcon:({focused}) =>
                    (
                      <View>
                        <Image
                          source = {require("../image/logs.png")}
                          resizeMode = 'contain'
                          style={styles.iconsize}/>
                      </View>
                    ),
                    headerStyle: {
                      backgroundColor: '#F5DEB3', //Set Header color
                    },
                    headerTintColor: "black", //Set Header text color
                    headerTitleStyle: {
                      fontWeight: "bold", //Set Header text style
                    },
                  }}/>
        <Tab.Screen name={profileName} component={ProfileScreen} 
                   options={{
                    tabBarIcon:({focused}) =>
                    (
                      <View>
                        <Image
                          source = {require("../image/profile.png")}
                          resizeMode = 'contain'
                          style={styles.iconsize}/>
                      </View>
                    ),
                    headerStyle: {
                      backgroundColor: '#F5DEB3', //Set Header color
                    },
                    headerTintColor: "black", //Set Header text color
                    headerTitleStyle: {
                      fontWeight: "bold", //Set Header text style
                    },
                  }}/>
      </Tab.Navigator>
  );
}

export default MainLayout;

const styles = StyleSheet.create({
  options:{
    headerStyle: {
      backgroundColor: "#FFFF00", //Set Header color
    },
    headerTintColor: "black", //Set Header text color
    headerTitleStyle: {
      fontWeight: "bold", //Set Header text style
    },
  },
  iconsize:{
    width: 25,
    height: 25,
  }
});