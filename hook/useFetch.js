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
                let response = await fetch(url)
                let result = await response.json()
               // console.log("Result in custom hook", result)
                return result.length        
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