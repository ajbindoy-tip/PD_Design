import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Text,
    ScrollView,
    Image,
  } from "react-native";
import ImageModal from 'react-native-image-modal';

const BlightScreen = ()=>{
    return(
        <ScrollView>
            <ImageBackground
                source={require("../image/bg.png")}
                style={{
                    marginHorizontal: 24,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: 12
                }}
            > 
            <Image
                source={require("../image/blight.png")}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "contain",
                }}
            />
            <Text style={styles.titleText}>
                Disease Name:
            </Text>

            <Text style={styles.text}>
                Bacterial Leaf Blight{"\n"} </Text>

            <Text style={styles.titleText} >
                CAUSAL TYPE:
            </Text>

            <Text style={styles.text}>
                Bacteria{"\n"}
            </Text>

            <Text style={styles.titleText}>
                PATHOGEN: 
            </Text>

            <Text style={styles.text}>
                Xanthomonas oryaze pv.oryae{"\n"}
            </Text>

            <Text style={styles.titleText}>
                CROP STAGE AFFECTED:
            </Text>
                
            <Text style={styles.text}>
                Leaf{"\n"}
            </Text>
                
            <Text style={styles.titleText}>
                ABOUT THE DISEASE AND PATHOGEN:
            </Text>
                                
            <Text style={styles.text}>
                The disease is most likely seen in areas with huge amount of weeds and wih debries of infeted plants.
                It can occur in both tropical and temperate environment, particularly in irrigated and rained lowland
                areas. The earlier the disease occurs, the higher the yield loss. Yield loss due to bacterial blight can
                be as much as 70% when susceptible varieties are grown in environments favorable to the disease.{"\n"}
            </Text>
                                
            <Text style={styles.titleText}>
                SIGNS AND SYMPTOMS:
            </Text>
                
            <Text style={styles.text}>
                Check the wilting and yellowing of leaves, or wilting of seedlings (also called kresek). Check for lesions
                on the leaves. In vegetative to fruiting stage, lesions usually develop as water-soaked to yellow-orange stripes
                on leaf blades or leaf tips or on mechanically injured parts of leaves. Lesions have a wavy margin and progress 
                toward the leaf base.{"\n"}
            </Text>

            <Text style={styles.titleText}>
                FAVORABLE ENVIRONMENT FOR DISEASE EMERGENCE:
            </Text>
                
            <Text style={styles.text}>
                1. Temperature of 25-34°C {"\n"}
                2. Relative Humidity above 70% {"\n"}
                3. Heavy rain{"\n"}
                4. High nitrogen application{"\n"}
            </Text>

            <Text style={styles.titleText}>
                MANAGEMENT PRACTICES:
            </Text>

            <Text style = {styles.subText}>
                Planting resistant varieties has been reported as most efficient, most reliable, and cheapest way to Control
                bacterial blight. {"\n"}
            </Text>
            
            <Text style={styles.cultxt}>
                Other disease control options include:
            </Text>
            <Text style={styles.text}>
                -Use of balanced amount of plant nutrients, especially nitrogen.{"\n"}
                -Ensure good drainage in the field (in conventionally flooded crops) and nurseries. {"\n"}
                -Keep the field clean. Remove weeds and host plant and plow under rice stubble, straw, rice ratoons and 
                volunteer seedlings, which can affect the spread of bacteria. {"\n"}
                -Allow fallow fields to dry in order to suppress disease in the soil and plant residues.
            </Text>
        </ImageBackground>
     </ScrollView>
    );
};

export default BlightScreen;

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 13,
      color:  "black",
      textAlign: 'justify'
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'green'
    },
    subText:{
      fontsize: 15,
      fontweight: 'bold',
      color: 'black',
    },
    cultxt:{
        fontSize: 15,
        color:  'black',
        textAlign: 'justify',
        fontWeight: 'bold'
      }
  });