 // Import React and Component
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
                source={require("../image/bg.png")}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 60,
                    marginHorizontal: 24,
                    marginBottom: 50,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: 12
                }}
            > 
          <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: 12,
                    alignItems: 'center',
                }}>
            <Image style={styles.headImage}
                  source={require("../image/gigaleaf.png")}/>

          </View>
          <Text style={styles.headText}>
            Hello! Welcome to GigaLeaf!
          </Text>
          <Text
            style={styles.titleText}>
            About the Project:
          </Text>
          <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: 12,
                    alignItems: 'center'
                }}
            >
            <Text style={styles.text}>
            Rice leaf disease has a significant negative impact on crop productivity, and early detection of rice diseases is critical to 
            avoiding these consequences. However, present rice disease diagnosis procedures are neither precise nor efficient, 
            and specialized equipment is frequently required.
            </Text>
          </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={()=> navigation.navigate("UploadScreen")}
            >
              <Text style={styles.buttonTextStyle}>
                UPLOAD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={()=> navigation.navigate("AboutScreen")}
            >
              <Text style={styles.buttonTextStyle}>
                ABOUT US
              </Text>
            </TouchableOpacity>
    </ImageBackground>
  );

};
 
export default HomeScreen;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: "#787FF6",
  },
  buttonStyle: {
    minWidth: 250,
    minHeight: 50,
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FF0000",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  text: {
    fontSize: 15,
    color:  "black",
    textAlign: 'justify',
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '',
  },
  headText:{
    fontSize: 26, 
    fontWeight: 'bold',
     color:'#fffacd'
  },
  titleText: {
    fontSize: 20, 
    //lemonchiffon 
    color:'#fffacd', 
    textAlign:'center'
  },
  subText:{
    fontsize: 15,
    fontweight: "bold",
    color: 'black',
  },
  headImage:{
    width: "100%",
    height: 100,
    resizeMode: "contain",
    margin: 1,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center'
  },
});
