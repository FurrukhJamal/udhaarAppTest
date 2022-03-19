import { Pressable, Modal, Linking, Image, StatusBar, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import useFetch from './hook/useFetch';
import SearchBoxComponent from "./components/SearchBoxComponent";
import AppContext from './context/appContext';
import DisplayList from './components/DisplayList';
import UserInfoModal from './components/Modal';

const Data = [
  {
    name : "Furrukh",
    image : require("./assets/icon.png"),
  },
  {
    name : "Jamal",
    image : require("./assets/icon.png"),
  },
  {
    name : "Furrukh",
    image : require("./assets/icon.png"),
  },
  {
    name : "Jamal",
    image : require("./assets/icon.png"),
  },
  {
    name : "Furrukh",
    image : require("./assets/icon.png"),
  },
  {
    name : "Jamal",
    image : require("./assets/icon.png"),
  },
  {
    name : "Furrukh",
    image : require("./assets/icon.png"),
  },
  {
    name : "Jamal",
    image : require("./assets/icon.png"),
  },

]


// function DisplayList(props){
//   const [modalVisible, setModalVisible] = useState(false);
  
  
//   /**@param a valid github profile link
//    * effect : opens a webBrowser with given github profile page link
//    */
//   function loadProfilePage(url){
//     Linking.openURL(url)
//   }


//   function RenderModal(props){
//     const{data : followers, isFollowersLoading} = useFetch(props.followers_url)
//     const{data : following, isFollowingLoading} = useFetch(props.following_url)
    
//     return (
//       <View>
//       {/*<Modal
//         animationType="none"
//         transparent={true}
//         visible={modalVisible}
        
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//     </Modal>
//     */}
//       {modalVisible && (
//         <View>
//           <Text>Hello World</Text>
          
//           <View>
//             {!isFollowersLoading && <Text>Followers : {followers}</Text>}
//             {!isFollowingLoading && <Text>Following : {following}</Text>}
//           </View>
          
//         </View>)}
        
      
      
//     </View>
//     )
//   }
  
//   function renderList(obj){
//     //console.log(obj)
//     return(
//       <View style = {styles.listItemContainer}>
//           <View>
//             <Image 
//               style = {{ height : 80, width : 80 }} 
//               resizeMode = "contain"
//               source = {{uri : obj.item.avatar_url}} />
//           </View>
//           <TouchableOpacity 
//             style = {{marginTop : 8}}
//             onPress = {()=>{
//               console.log("Name Clicked")
//               setModalVisible(!modalVisible)}}>
//             <Text style = {{fontSize : 24, color : "blue"}}>{obj.item.login}</Text>
//           </TouchableOpacity>

//             {/*Button to Visit Profile*/}
//             <View>
//             <Button
//               onPress = {()=>loadProfilePage(obj.item.html_url)}
//               title= "Visit Profile"
//               titleStyle={{ fontWeight: 'bold', fontSize: 18 }}

              
//               buttonStyle={{
//                 borderWidth: 0,
//                 borderColor: 'transparent',
//                 borderRadius: 20,
//                 backgroundColor : "green"
//               }}
//               containerStyle={{
//                 width: 200,
//                 marginHorizontal: 50,
//                 marginVertical: 10,
//               }}
//               icon={{
//                 name: 'arrow-right',
//                 type: 'font-awesome',
//                 size: 15,
//                 color: 'white',
//               }}
//               iconRight
//               iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
//             />            
//             </View>
//             {/* Modal */}
//             {modalVisible && <RenderModal data = {obj.item}/>}    
            
//         </View>
//     )
//   }
//   return (
//     <View style = {styles.listContainer}>
//       <FlatList 
//         contentContainerStyle = {{backgroundColor : "yellow", paddingBottom : 50, paddingTop : 10}}
//         data = {props.data}
//         renderItem = {renderList}
//         keyExtractor = {(item,index)=>index.toString()}
//         ItemSeparatorComponent = {()=><View style = {styles.listItemSeperator}></View>}/>
//     </View>
//   )
// }


export default function App() {
  const[data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({})
  
  useEffect(()=>{
    async function getUsers(){
      const octokit = new Octokit({ auth: `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` });
      
      let response = await octokit.request('GET /users', {
        org: "octokit",
        type: "private",
      })
      
      
      // let response = await fetch("https://api.github.com/user", {
      //   method : "GET",
      //   header : {
      //     "Content-Type" : "application/json",
      //     "Accept" : "application/vnd.github.v3+json",
      //   }
      // })
      let result = response
      return result
    }
    (async ()=>{
      let result = await getUsers()
      setData([...result.data])
      console.log("ALL The USERS ARE", result.data[0])
    })()

  }, [])
  
  if(!data){
    return(
      <View style = {{alignItems : "center", justifyContent : "center"}}><Text>Loading...</Text></View>
    )
  }
  
  return (
    <AppContext.Provider value = {{modalVisible, setModalVisible, setModalData}}>
      <View style={styles.container}>
        <SearchBoxComponent/>
        <DisplayList data = {data}/>
        {modalVisible && <UserInfoModal data = {modalData}/>}
      
      
      </View>    
    </AppContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingTop : StatusBar.currentHeight,
  },

  // listContainer : {
  //   width : "100%",
  //   //alignItems : "center",
  //   //justifyContent : "center",
  //   backgroundColor : "red",
  //   //paddingBottom : 10,
  //   marginTop : 10,
  // },
  
  // listItemContainer : {
  //   width : "100%",
  //   alignItems : "center",
  //   justifyContent : "center",
  //   paddingTop : 10,
  // },
  // listItemSeperator : {
  //   borderBottomWidth : 2,
  //   borderColor : "#e5e7eb",
  //   paddingVertical : 10,
    
  // },

  // Styles for modal
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  // },

  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center"
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2
  // },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },

});
