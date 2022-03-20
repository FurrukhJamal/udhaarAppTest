import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function SearchBoxComponent() {
    const [search, setSearch] = useState("")
  
    function handleTextChange(value){
      //console.log("Value is: " , value)
      setSearch(value)
    }
    
    /**Handles searching, the setTimeout function could be modified to search for query after 1sec
     * of keypress
     */
    function handleKeyPressOut(){
      //console.log("Pressed out triggered")
      setTimeout(()=>{
        console.log("Search hit after one secoond of keyPress")
      }, 1000)
    }
  
    return(
      <View style = {styles.searchBoxContainer}>
        <TextInput
          onChangeText = {handleTextChange}
          onKeyPress = {handleKeyPressOut}
          placeholder = "Search" 
          style = {styles.searchText}/>
      </View>
    )
}

const styles = StyleSheet.create({
    searchBoxContainer : {
        width : "100%",
        alignItems : "center",
        paddingTop : 20,
    },

    searchText : {
        borderColor : "gray",
        borderWidth : 1,
        width : "80%",
        paddingHorizontal : 10,
        paddingVertical : 10,
        
    },
})