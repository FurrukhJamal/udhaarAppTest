import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/appContext'
import useFetch from '../hook/useFetch'

export default function UserInfoModal(props) {
    
    const[followers, setFollowers] = useState(0)
    const[following, setFollowing] = useState(0)
    const[name, setName] = useState("")
    const[location, setLocation] = useState(null)
    const{setModalVisible, modalVisible} = useContext(AppContext)

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
            
          >
            <View style={styles.centeredView}>
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
            </View>
          </Modal>
        
         
        )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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



 
        //     <View>
        //       <Text>Hello World</Text>
              
        //       <View>
        //         {!isFollowersLoading && <Text>Followers : {followers}</Text>}
        //         {!isFollowingLoading && <Text>Following : {following}</Text>}
        //       </View>
              
        //     </View>
            
          
          
        // </View>