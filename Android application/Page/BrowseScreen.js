import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
  } from "react-native";

const BrowseScreen = ({ navigation })=>{
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.headImage}
                source={require("../image/gigaleaf.png")}/>
            <Text
                style={{ fontSize: 15, fontWeight: 'bold', color:'black' }}>
                  These are the Common Diseases in a Rice Plant
            </Text>
            <TouchableOpacity
              onPress={()=> navigation.navigate("BrownSpotScreen")}>
              <ImageBackground style={styles.image}
                  source={require("../image/brown.png")}
                  imageStyle={{
                    borderRadius: 10
                  }}
                />
              <Text
                style={ styles.text}>
                Brown Spot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> navigation.navigate("BlastScreen")}>
              <ImageBackground style={styles.image}
                  source={require("../image/blast.png")}
                  imageStyle={{
                    borderRadius: 10
                  }}
                />
              <Text
                style={ styles.text}>
                Leaf Blast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={()=> navigation.navigate("BlightScreen")}>
              <ImageBackground style={styles.image}
                  source={require("../image/blight.png")}
                  imageStyle={{
                    borderRadius: 12
                  }}
                />
              <Text
                style={ styles.text}>
                Leaf Blight
              </Text>
            </TouchableOpacity>
        </View>
    );
};
export default BrowseScreen;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#F5DEB3",
      alignContent: "center",
    },
    text: {
      fontSize: 15,
      textAlign: "center",
      color: "green",
    },
    headImage:{
      width: "40%",
      height: 80,
      resizeMode: "contain"
    },
    image: {
      width: 200,
      height: 150,
      justifyContent: 'flex-end',
      paddingVertical:20,
      paddingHorizontal: 20,
      borderRadius: 12
    }
});
  