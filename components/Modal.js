import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import AppContext from '../context/appContext'
import useFetch from '../hook/useFetch'

export default function UserInfoModal(props) {
    //const{data : followers, isFollowersLoading} = useFetch(props.data.followers_url)
    //const{data : following, isFollowingLoading} = useFetch(props.data.following_url)
    
    const{data : followers, isFollowersLoading} = useFetch(`https://api.github.com/users/${props.data.login}/followers`)
    const{data : following, isFollowingLoading} = useFetch(`https://api.github.com/users/${props.data.login}/following`)
    const{setModalVisible, modalVisible} = useContext(AppContext)
        return (
          
          <Modal
            animationType="none"
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
                
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
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
})



 
        //     <View>
        //       <Text>Hello World</Text>
              
        //       <View>
        //         {!isFollowersLoading && <Text>Followers : {followers}</Text>}
        //         {!isFollowingLoading && <Text>Following : {following}</Text>}
        //       </View>
              
        //     </View>
            
          
          
        // </View>