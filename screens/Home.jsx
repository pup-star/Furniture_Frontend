import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const Home = () => {
    const [userData, setUserdata] = useState(null);
    const [userLogin, setUserLogin] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] =useState(false);
    const [error, setError] = useState(null)
    useEffect(()=> {
       // checkExistingUser();
       fetchHome();
    },[]);


    // const checkExistingUser = async ()=> {
    //     // const id = await AsyncStorage.getItem('token')
    //     // const userId = `user${JSON.parse(id)}`;
    //     let userdata = await AsyncStorage.getItem("token");
    //     let data = JSON.parse(userdata);
    //     console.log(`homepage getItem id: ${data}`)

    //     try {
    //         const currentUser = await AsyncStorage.getItem(data);

    //         if (currentUser !== null) {
    //             const parsedData = JSON.parse(currentUser)
    //             setUserdata(parsedData)
    //             setUserLogin(true)
    //         }
    //     } catch (error) {
    //         console.log("error retrieving the data:", error)
    //     }
    // }

    const fetchHome = async ()=> {
        setIsLoading(true)
        let userdata = await AsyncStorage.getItem("token");
        let data = JSON.parse(userdata);
        console.log(`homepage getItem id: ${data}`)
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${data}`)
            if (response.status === 200) { 
            setData(response.data)
            setIsLoading(false)
            console.log(response.data.username)
            } else {
                Alert.alert("Error Fecth Data")
            }
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <View style={styles.appBarWrapper}>
            <View style={styles.appBar}>
             <Ionicons name='location-outline' size={24}/>
             <Text style={styles.location}> {data ? data.location : 'Shanghai China'}</Text>
             <View style={{ alignItems: "flex-end"}}>
                <View style={styles.cartCount}>
                    <Text style={styles.cartNumber}>8</Text>
                </View>
                <TouchableOpacity>
                <Fontisto name='shopping-bag' size={24}/>
                </TouchableOpacity>
             </View>
            </View>
        </View>
            <ScrollView>
                <Welcome/>
                <Carousel/>
                <Headings/>
                <ProductRow/>
            </ScrollView>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home
