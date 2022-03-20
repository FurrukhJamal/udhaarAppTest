import { Pressable, Modal, Linking, Image, StatusBar, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import SearchBoxComponent from "./components/SearchBoxComponent";
import AppContext from './context/appContext';
import DisplayList from './components/DisplayList';
import UserInfoModal from './components/Modal';

const GITHUBACCESSTOKEN= "Your_github_accessToken"

export default function App() {
  const[data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({})
  
  /**Effect : makes API call and populate the users list data */
  useEffect(()=>{
    async function getUsers(){
      const octokit = new Octokit({ auth: GITHUBACCESSTOKEN });
      
      let response = await octokit.request('GET /users', {
        org: "octokit",
        type: "private",
      })
      
      let result = response
      return result
    }
    
    (async ()=>{
      let result = await getUsers()
      setData([...result.data])
      //console.log("ALL The USERS ARE", result.data[0])
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
    backgroundColor: "azure",
    alignItems: 'center',
    paddingTop : StatusBar.currentHeight,
  },
});
