import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,
    Alert,
    Image,
    RefreshControl,
    ActivityIndicator
  } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import ImageModal from 'react-native-image-modal';
import { Asyncstorage} from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const LogScreen = ({ navigation })=>{
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [getDataList]);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const getDataList = async () => {
     try {
      const response = await fetch('https://fde2-180-191-68-136.ngrok-free.app/images/datetime.php',
      // https://giga.leaf.ap.ngrok.io/images/datetime.php
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const dat = await response.json();
      setData(dat);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataList();
  }, []);

  const itemSeparator=()=>{
    return <View style={styles.separator}/>
  }

  const blastAlert = () =>
    Alert.alert(
      "Leaf Blast Detected!",
      "There is a Leaf Blast in the Leaf! Do you want to proceed to recommendation?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => navigation.navigate('BlastScreen')
      }
      ]
    );

  const blightAlert = () =>
    Alert.alert(
      "Leaf Blight Detected!",
      "There is a Leaf Blight in the Leaf! Do you want to proceed to recommendation?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => navigation.navigate('BlightScreen') }
      ]
    );
  const brownAlert = () =>
    Alert.alert(
      "Brown Spot Detected!",
      "There is a Brown Spot in the Leaf! Do you want to proceed to recommendation?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => navigation.navigate('BrownSpotScreen') }
      ]
    );
    const alertMessage =(Result) =>{
      if (Result == 'Brownspot')
      {
        return brownAlert();
      }
      if (Result =='Blast')
      {
       return blastAlert();
      }
      if (Result == 'Blight')
      {
        return blightAlert();
      }
      if (Result == 'None')
      {
        return Alert.alert('This is not a Rice Plant');
      }
      else{
        return Alert.alert('This Leaf is Healthy');
      }
    }
    
    const getdisease = (d)=>{
      if (d =='Brownspot'){
        return 1;
      }
      if (d =='Blast'){
        return 2;
      }
      if (d =='Blight'){
        return 3;
      }
      if (d =='No detected disease' || 'Healthy'){
        return 4;
      }
      if (d = 'Others'){
        return 5;
      }
    }
  
    const getStatus = (s)=>{
      if (s == '1')
      {
        return 5
      }
      if (s == '0')
      {
        return 6
      }
    }
    
    const leafResult = ({item})=>(
      <View style={styles.itemList}>
        <View>
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="white"
            overlayBackgroundColor="black"
            source={{
              uri: item.Image_Loc
            }}
            style={styles.icon}
          />
        </View>
        <View style ={{ flexWrap:'wrap'}}>
          
          <Text style={styles.txtName}>ID:{item.ID}</Text>
          <Text style={[
              (getStatus(item.Status) == 5) ? styles.unhealthy : styles.healthy,
            ]}>Status: {item.Status == 1 ? "Unhealthy":"Healthy"}</Text>
          <TouchableOpacity>
            <Text style={[
                  (getdisease(item.Result) == 1) ? styles.brown : styles.disease, 
                  (getdisease(item.Result) == 2) ? styles.blast : styles.disease,
                  (getdisease(item.Result) == 3) ? styles.blight : styles.disease,
                  (getdisease(item.Result) == 4) ? styles.healthy : styles.disease,
                ]}
                onPress={()=>alertMessage(item.Result)}>Result: {"\n"}{item.Result}</Text>
            </TouchableOpacity>
          <Text style={styles.txtName}>Date/Time:{"\n"}{item.Datetime}</Text>
        </View>
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.txtBar}> ITEM LIST</Text>
        </View>
        <View>
          <Text style={styles.txtHeader}>Captured Images</Text>
        </View>
        <View style={{ padding: 20, backgroundColor:'#e1e1e1'}}>
          {isLoading ? <ActivityIndicator/> : ( 
          <FlatList
            data={data} 
            keyExtractor={({ ID }, index) => ID}
            renderItem={ leafResult}
            ItemSeparatorComponent = {itemSeparator}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing}
                onRefresh={getDataList}/>
              }
              />
            )
          }
        </View>
        <View style={styles.barEnd}/>
    </SafeAreaView>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  unhealthy:{
    color: 'red'
  },
  brown:{
    color: 'brown'
  },
  blast:{
    color: 'orange'
  },
  blight:{
    color: '#ffd700'
  },
  healthy:{
    color: 'green'
  },
  disease:{
    color: 'blue'
  },
  otherResults:{
    color: 'grey'
  },
  barEnd:{ 
    padding:1,
    height: 1,
    width: '100%',
    backgroundColor: "black"
  },
  separator:{
    height: 1,
    width: '100%',
    backgroundColor: "#CCC"
  },
  container:{
    backgroundColor:"#e1e1e1",
    flex: 1,
    padding: 5
  },
  headerBar: {
      padding:0.09,
      backgroundColor:"#e1e1e1",
      
  },
  txtBar:{
      fontsize: 50,
      fontWeight: "bold",
      color: 'black',
      textAlign:'center',
      padding:1
  },
  txtHeader:{
      fontsize: 10 ,
      fontWeight: "bold",
      color: 'black',
      textAlign: 'center'
  },
  itemList:{
      paddingVertical: 15,
      borderBottomColor: "#e2e2e",
      borderBottomWidth: 0.5,
      flexDirection: 'row'
  },
  txtName:{
      fontsize: 16,
      fontWeight: "bold",
      color: 'black',
      textAlign:"left"
      
  },
  icon:{
      width:190,
      height:190,
      margin:5,
      backgroundColor: "#e6e6e6"
  },
  emptyText:{
    alignContent: 'center'

  }
});
