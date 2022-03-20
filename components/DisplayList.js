import { FlatList, TouchableOpacity, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AppContext from '../context/appContext'
import { Button } from 'react-native-elements'

/**@params : Props.data an array with the objects for each user's data passed from App.js
 * @returns : A flatlist with username, avatar and link to Github Profile
 */
export default function DisplayList(props) {
    const{setModalVisible, setModalData, modalVisible} = useContext(AppContext)
  
  
    /**@param a valid github profile link
     * effect : opens a webBrowser with given github profile page link
     */
    function loadProfilePage(url){
      Linking.openURL(url)
    }
  
  
     /**@params :  data array of objects from Flatlist's data prop in DisplayListComponent
      * @returns : a view to display each item in list with username, avatar and link to github profile
      *   
      */   
    function renderList(obj){
      //console.log(obj)
      return(
        <View style = {styles.listItemContainer}>
            <View>
              <Image 
                style = {{ height : 80, width : 80 }} 
                resizeMode = "contain"
                source = {{uri : obj.item.avatar_url}} />
            </View>
            <TouchableOpacity 
              style = {{marginTop : 8}}
              onPress = {()=>{
                console.log("Name Clicked")
                setModalData({...obj.item})
                setModalVisible(!modalVisible)}}>
              <Text style = {{fontSize : 24, color : "blue"}}>{obj.item.login}</Text>
            </TouchableOpacity>
  
              {/*Button to Visit Profile*/}
              <View>
              <Button
                onPress = {()=>loadProfilePage(obj.item.html_url)}
                title= "Visit Profile"
                titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.containerStyle}
                icon={{
                  name: 'arrow-right',
                  type: 'font-awesome',
                  size: 15,
                  color: 'white',
                }}
                iconRight
                iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
              />            
              </View>
             
        </View>
      )
    }
    
    
    
    return (
      <View style = {styles.listContainer}>
        <FlatList 
          contentContainerStyle = {{ paddingBottom : 80, paddingTop : 10}}
          data = {props.data}
          renderItem = {renderList}
          keyExtractor = {(item,index)=>index.toString()}
          ItemSeparatorComponent = {()=><View style = {styles.listItemSeperator}></View>}/>
      </View>
    )
}
  


const styles = StyleSheet.create({
    listItemContainer : {
        width : "100%",
        alignItems : "center",
        justifyContent : "center",
        paddingTop : 10,
    },
    listContainer : {
        width : "100%",
        marginTop : 10,
    },
    listItemSeperator : {
        borderBottomWidth : 2,
        borderColor : "#e5e7eb",
        paddingVertical : 10,
        
    },
    buttonStyle : {
      borderWidth: 0,
      borderColor: 'transparent',
      borderRadius: 20,
      backgroundColor : "green"
  },
    containerStyle : {
      width: 200,
      marginHorizontal: 50,
      marginVertical: 10,
  },

})