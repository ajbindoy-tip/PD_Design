import {React,useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Flatlist,
    TouchableOpacity,
    FlatList,
    Button,
    Alert,
  } from "react-native";
import ImageModal from 'react-native-image-modal';
import {db} from './components/config';
import {ref,onValue} from "firebase/database";
// let mProducts =[
//   {id:0,Status:'0',Result:'Healthy'},
//   {id:1,Status:'1',Result:'Brownspot'},
//   {id:2,Status:'0',Result:'Healthy'},
//   {id:3,Status:'0',Result:'Healthy'},
//   {id:4,Status:'1',Result:'Blight'},
//   {id:5,Status:'1',Result:'Blast'},
//   {id:6,Status:'0',Result:'Healthy'},
//   {id:7,Status:'0',Result:'Healthy'},
//   {id:8,Status:'1',Result:'Blast'},
//   {id:9,Status:'1',Result:'Blight'},
//   {id:10,Status:'1',Result:'Brownspot'},
// ]

const ConnectScreen = ({ navigation }) => {
  // let [products,setProducts] = useState(mProducts)
  const [link,setlink] = useState("");

    const leafResult = ({item})=>(
      // <TouchableOpacity
      //   onPress={[
      //     (alertMessage(item.Result))
      //   ]}>
        <View style={styles.listViewStyle}>
          <View>
            <Text>ID: {item.id}</Text>
            <Text style={[
              (getStatus(item.Status) == 5) ? styles.unhealthy : styles.healthy
            ]}>Status: {item.Status == 1 ? "Unhealthy":"Healthy"}</Text>
            {/* <TouchableOpacity
              onPress={[(alertMessage(item.Result))]}> */}
              <Text style={[
                (getdisease(item.Result) == 1) ? styles.brown : styles.disease,
                (getdisease(item.Result) == 2) ? styles.blast : styles.disease,
                (getdisease(item.Result) == 3) ? styles.blight : styles.disease,
                (getdisease(item.Result) == 4) ? styles.healthy : styles.disease,
              ]}
              onPress={()=>alertMessage(item.Result)}>Result: {item.Result}</Text>
            {/* </TouchableOpacity> */}

          </View>
         </View>
    // </TouchableOpacity> 
    )

    // function readData(){
    //   const starCountRef = ref(db, 'data/');
    //   onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     setlink(data.url)
    //   });
    // }
    return(
    <View style={styles.container}>
      
      <View style={{maringTop:30}}>
        <Text style={styles.title}>Item List</Text>
        <Image source={{uri: 'https://c30b-136-158-10-37.ap.ngrok.io'+'/images/2022-11-12T15:22:47.735708.jpg'}} style={styles.icon}/>
        <Text value={link} onChangeText={(link)=>{setlink(link)}}style={styles.title}>Link: </Text>
        <Text onPress={()=>readData()} style={styles.title}> Read</Text>
        <ImageModal
            resizeMode="contain"
            imageBackgroundColor="white"
            overlayBackgroundColor="white"
            style={{
              width: 250,
              height: 250,
            }}
            source={require("../image/blight.png")}
          />

      </View>
      
      {/* <Button title={"Blast"} onPress={blastAlert} />
      <Button title={"Blight"} onPress={blightAlert} />
      <Button title={"Brown Spot"} onPress={brownAlert} />
      <FlatList
      numColumns={2}
         keyExtractor={(item)=>(item.id)}
         data ={products}
         renderItem={leafResult}
      /> */}
      
    </View>
    );
};
export default ConnectScreen;

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
    color: 'yellow'
  },
  healthy:{
    color: 'green'
  },
  disease:{
    color: 'blue'
  },
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  icon:{
    height:100,
    width: 100
  },
  title:{
    fontSize: 25,
    color: 'black'
  },
  listViewStyle:{
    backgroundColor:'pink',
    borderColor: 'pink',
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: 'center',
    width: 150,
    height: 150,
    maring: 5,
  },
  itemText:{
    borderLeftColor: 'yellow',
    borderLeftWidth: 5,
  }
});