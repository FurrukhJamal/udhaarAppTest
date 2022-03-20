import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/appContext'

/**@params : user data object that is provided in renderItem component to display each user
 * @return : returns a modal view displaying relevant data of the selected user
 * 
 */
export default function UserInfoModal(props) {
    
    const[followers, setFollowers] = useState(0)
    const[following, setFollowing] = useState(0)
    const[name, setName] = useState("")
    const[location, setLocation] = useState(null)
    const{setModalVisible, modalVisible} = useContext(AppContext)

    /**effect : makes the api call to setup all the relevant data required for modal */
    useEffect(()=>{
      async function getUserData(){
        let response = await fetch(`https://api.github.com/users/${props.data.login}`)
        let result = await response.json()
        return result

      }
      (async ()=>{
        let result = await getUserData()
        setFollowers(result.followers)
        setFollowing(result.following)
        setName(result.name)
        setLocation(result.location)
      })()
    },[])
        
        return (
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              //console.log("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity 
              style={styles.centeredView}
              onPress = {()=>setModalVisible(!modalVisible)}>
              <View style={styles.modalView}>
                <Image 
                  style = {{width : 60, height : 60}}
                  resizeMode = "contain"
                  source = {{uri : props.data.avatar_url}}
                />
                
                <Text style={[styles.modalText, {fontWeight : "bold"}]}>{name}</Text>

                {location && <Text>{location}</Text>}
                
                <View style = {styles.modalRow}>
                  <Text style = {{fontWeight : "bold"}}>Followers : </Text>
                  <Text>{followers}</Text>
                </View>

                <View style = {styles.modalRow}>
                  <Text style = {{fontWeight : "bold"}}>Following : </Text>
                  <Text>{following}</Text>
                </View>                
                
                <Pressable
                  style={[styles.button, styles.buttonClose, {marginTop : 10}]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          </Modal>
        
         
        )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    //backgroundColor : "teal"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalRow : {
    flexDirection : "row"
  }
})

