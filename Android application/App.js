
import "react-native-gesture-handler";
 
// Import React and Component
import React from "react";
 
// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
 
// Import Screens
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import BrowseScreen from "./pages/BrowseScreen";
import LogScreen from "./pages/LogScreen";
import BrownSpotScreen from "./pages/BrownSpotScreen";
import BlastScreen from "./pages/BlastScreen";
import BlightScreen from "./pages/BlightScreen";
import ConnectScreen from "./pages/ConnectScreen";
import MainLayout from "./navigation/MainLayout";
import AboutScreen from "./pages/AboutScreen";
import UploadScreen from "./pages/UploadScreen";

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#F5DEB3", //Set Header color
          },
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
 
/* Main Navigator */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">

        {/* Auth Navigator which include Login Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="MainLayout"
          component={MainLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BrowseScreen"
          component={BrowseScreen}
        />
        <Stack.Screen
          name="ConnectScreen"
          component={ConnectScreen}
          options={{title: 'Connect',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}
        />
        <Stack.Screen
          name="LogScreen"
          component={LogScreen}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{title: 'About Us',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="BlastScreen"
          component={BlastScreen}
          options={{title: 'Leaf Blast',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}
        />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{title: 'Upload',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}/>
        <Stack.Screen
          name="BlightScreen"
          component={BlightScreen}
          options={{title: 'Leaf Blight',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}
        />
        <Stack.Screen
          name="BrownSpotScreen"
          component={BrownSpotScreen}
          options={{title:'Brown Spot',headerStyle:{
            backgroundColor: '#F5DEB3'
          }}}
        />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
