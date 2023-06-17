import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ImageBackground,
  } from "react-native";
import ImageModal from 'react-native-image-modal';

const BlastScreen = ()=>{
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
                    source={require("../image/blast.png")}
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
                    Rice Blast Disease {"\n"}
                </Text>

                <Text style={styles.titleText}>
                    LOCAL NAMES:
                </Text>

                <Text style={styles.text}>
                    Filipino: Mata Mata{"\n"}
                </Text>

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
                    Magnanoporthe oryzae (anamoprh: Pyricularia oryzae){"\n"}
                </Text>

                <Text style={styles.titleText}>
                    CROP STAGE AFFECTED:
                </Text>
                    
                <Text style={styles.text}>
                    Can be seen in all stages of crop development, prevalent in seedling stage{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    AFFECTED PLANT PARTS:
                </Text>

                <Text style={styles.text}>
                    Leaf, Collar, Node, Neck, and Panicle{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    ABOUT THE DISEASE AND PATHOGEN:
                </Text>
                                    
                <Text style={styles.text}>
                    Rice blast disease grown in all regions of the world, in both lowland and upland rice ecosystem.
                    Disease is more prevalent during seedling stage and transplanting stage. It can infect major parts
                    of a rice plant: leaf, collar, node, neck, parts of panicle, and leaf sheath.{"\n"}
                </Text>
                                    
                <Text style={styles.titleText}>
                    SIGNS AND SYMPTOMS:
                </Text>
                    
                <Text style={styles.text}>
                    1. Leaf - Diamond shaped lesions with a gray or white center and brown or reddish brown border.
                    In later infection, lesions will enlarge resulting to coalesce, growing together to kill the entire leaves.{"\n"}
                    2. Collar - Collar refers to the junction of leaf and steam sheath. Infected part of collar consists
                    of general area of necrosis, entire leaf blade dries up when the base of the flag leaf is infected. {"\n"}
                    3. Node - Node of the stem turns blackish and breaks easily. The infection occurs in banded pattern. {"\n"}
                    4. Neck - Neck of rice plant refers to that portion of the stem that rises above the leaves and supports
                    the seed head or panicle. Infected neck has grayish brown lesions. In severe cases, the disease can cause
                    panicle to fall over. {"\n"}
                    5. Panicle: Dark necrotic lesions that partially or completely cover the panicle base, or the uppermost internode,
                    or panicle axis.{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    FAVORABLE ENVIRONMENT FOR DISEASE EMERGENCE:
                </Text>
                    
                <Text style={styles.text}>
                    1. Cool Temperature {"\n"}
                    2. Continous Rain Shower {"\n"}
                    3. Low Soil Moisture{"\n"}
                    4. High Relative Humidity{"\n"}
                </Text>

                <Text style={styles.titleText}>
                    MANAGEMENT PRACTICES:
                </Text>

                <Text style = {styles.text}>
                    Using resistant varities as primary control for atmost management. {"\n"}
                    For soil with low in silicon, apply calcium silicate slag before planting.{"\n"}
                </Text>

                <Text style = {styles.cultxt}>
                    Cultural Management:
                </Text>

                <Text style={styles.text}>
                    -Time of planting (adjust). {"\n"}
                    -Sow seed early.{"\n"}
                    -Nutrients Management (Split application of fertilzer especially with N). {"\n"}
                    -Proper irrigration management.{"\n"}
                    -Field sanitation before and after planting.{"\n"}
                </Text>

                <Text style = {styles.cultxt}>
                    Chemical Control:
                </Text>

                <Text style={{ fontSize: 13,color:  "black",}}>
                    -Fungicide Application (Like Triazoles and Strobilurins).
                </Text>
            </ImageBackground>
        </ScrollView>
    );
};

export default BlastScreen;

const styles = StyleSheet.create({
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
      fontweight: "bold",
      color: 'black',
    },
    cultxt:{
        fontSize: 15,
        color:  'black',
        textAlign: 'justify',
        fontWeight: 'bold'
      },
        cultxt:{
    fontSize: 15,
    color:  'black',
    textAlign: 'justify',
    fontWeight: 'bold'
  }
  });