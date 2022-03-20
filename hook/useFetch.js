import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
  console.log("custom hook working url is", url)
  const[data, setData] = useState(null)
  const[isLoading, setIsLoading] = useState(true)
  const[error, setError] = useState(false)
  
    useEffect(()=>{
        async function getData(){
            //console.log("Custom hoook async function working")
            try
            {
                

                //looping over all the pages for the list of followers/followings
                let pageNumber = 1
                let follower_following = []
                do
                {
                    let urlWithParams = url + "?per_page=100&page=" + pageNumber    
                    console.log(urlWithParams)
                    let response = await fetch(`${urlWithParams}`)
                    let result = await response.json()
                    //console.log("RESULT IN CUSTOM", result)
                    follower_following = [...follower_following , result]
                    pageNumber++
                }
                while(pageNumber <=1)
                // let response = await fetch(url)
                // let result = await response.json()
                console.log("Result in custom hook", follower_following.length)
                return follower_following.length        
            } 
            catch (error)
            {
                setError(error)
            }
        }
        let count;
        (async ()=>{
            count = await getData()
            console.log("Count in custom hook", count)
            setData(count)
            setIsLoading(false)
        })()

    }, [url])
    
  return {data, isLoading, error}
}