import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ImageBackground,
  } from "react-native";
  import ImageModal from 'react-native-image-modal';

const BrownSpotScreen = ()=>{
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
                    source={require("../image/brown.png")}
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
                    Brown Spot {"\n"}</Text>

                <Text style={styles.titleText} >
                    CAUSAL TYPE:
                </Text>

                <Text style={styles.text}>
                    Fungi{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    PATHOGEN: 
                </Text>

                <Text style={styles.text}>
                    Cochliobolus miyabeanus (anamorph: Helminthosporium oryae){"\n"}
                </Text>

                <Text style={styles.titleText}>
                    CROP STAGE AFFECTED:
                </Text>
                    
                <Text style={styles.text}>
                    Attacks the crop from seedling in nursery to milk stage{"\n"}
                </Text>
                    
                <Text style={styles.titleText}>
                    ABOUT THE DISEASE AND PATHOGEN:
                </Text>
                                    
                <Text style={styles.text}>
                    It is the most common and damaging disease of rice. Brown Spot Disease can occur at all stages
                    of the rice crop and it's more distinct in maximum tillering to ripening stage. The pathogen can
                    survive in seeds for about four years and more.{"\n"}
                </Text>
                                    
                <Text style={styles.titleText}>
                    SIGNS AND SYMPTOMS:
                </Text>

                <Text style={styles.text}>
                    The disease appears first as minute brown dots, later becoming cylindrical or oval to circular.
                    Later infection can observed lesions a circular to oval with a light brown to gray center, surrounded
                    by a reddish brown margin.{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    FAVORABLE ENVIRONMENT FOR DISEASE EMERGENCE:
                </Text>
                    
                <Text style={styles.text}>
                    1. Temperature of 20-35°C {"\n"}
                    2. Relative Humidity above 80% {"\n"}
                    3. Excess of nitrogen aggravates the disease incidence {"\n"}
                    4. Leaves must be wet for 8-24 hours for infection to occur.{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    MANAGEMENT PRACTICES:
                </Text>

                <Text style={styles.cultxt}>
                    Cultural Management:
                </Text>

                <Text style={styles.text}>
                    -Field Sanitation. Eliminate all the plant debris and alternate host. {"\n"}
                    -Soil fertility management. Subject soil sample for soil analysis in the nearest Regional Soils Laboratory.{"\n"}
                    -Follow recommended rate or required fertilizer. {"\n"}
                    -Field that are low in silicon, apply calcium silicate slag before planting.{"\n"}
                </Text>

                <Text style={styles.cultxt}>
                    Chemical Control:
                </Text>

                <Text style={{ fontSize: 13,color:  "black",}}>
                    -Use Fungicide (e.g., iprodione, propiconazole, azoxystrobin, trifloxystrobin, and cabendazim) as seed treatments.
                </Text>
            </ImageBackground>
        </ScrollView>
    );
};
export default BrownSpotScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 13,
    color:  'black',
    textAlign: 'justify'
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'green'
  },
  subText:{
    fontsize: 15,
    fontweight: "bold",
    color: 'green',
  },
  cultxt:{
    fontSize: 15,
    color:  'black',
    textAlign: 'justify',
    fontWeight: 'bold'
  }
});