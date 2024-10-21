import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './profile.style';
import { COLORS } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({navigation}) => {
    const [userData, setUserdata] = useState(null);
    const [userLogin, setUserLogin] = useState();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    

    useEffect(()=> {
        //checkExistingUser();
        fetchProfile();
        navi();
    },[]);


    const fetchProfile = async ()=> {
        setIsLoading(true)
        let userdata = await AsyncStorage.getItem("token");
        let data = JSON.parse(userdata);
        console.log(`homepage getItem id: ${data}`)
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${data}`)
            if (response.status === 200) { 
            setData(response.data)
            setIsLoading(false)
            console.log(response.data.location)
            } else {
                Alert.alert("Error Fecth Data")
            }
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }


    // const checkExistingUser = async ()=> {
    //     const id = await AsyncStorage.getItem('token')
    //     const userId = `user${JSON.parse(id)}`;

    //     try {
    //         const currentUser = await AsyncStorage.getItem(userId);

    //         if (currentUser !== null) {
    //             const personData = JSON.parse(currentUser)
    //             setUserdata(parseData)
    //             setUserLogin(true)
    //         }else {
    //             navigation.navigate('Login')
    //         }
    //     } catch (error) {
    //         console.log("error retrieving the data:", error)
    //     }
    // }
    const userLogout = async()=> {
        setIsLoading(true)
        let userdata = await AsyncStorage.getItem("token");
        let data = JSON.parse(userdata);
        console.log(`Profile removeItem id: ${data}`);

        try {
            await AsyncStorage.multiRemove([data, 'token']);
            navigation.replace("Login")
        } catch (error) {
            console.log("error logout")
        }
    }
    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout",
            [
                {
                    text: "Cancel", onPress: ()=> console.log("cancel pressed")
                },
                {
                    text: "Continue", onPress: ()=> userLogout(),
                },
                {defaultIndex : 1}
            ]
        )
    }
    // const clearCache = () => {
    //     Alert.alert(
    //         "Logout",
    //         "Are you sure you want to delete all saved data on your device",
    //         [
    //             {
    //                 text: "Cancel", onPress: ()=> console.log("cancel clear cache")
    //             },
    //             {
    //                 text: "Continue", onPress: ()=> console.log("clear cache pressed")
    //             },
    //             {defaultIndex : 1}
    //         ]
    //     )
    // }
    // const deleteAccount = () => {
    //     Alert.alert(
    //         "Delete Account",
    //         "Are you sure you want to delete your account",
    //         [
    //             {
    //                 text: "Cancel", onPress: ()=> console.log("cancel pressed")
    //             },
    //             {
    //                 text: "Continue", onPress: ()=> console.log("delete account pressed")
    //             },
    //             {defaultIndex : 1}
    //         ]
    //     )
    // }
    const navi = () => {
        if (data === null) {
            navigation.navigate("Login");
        }
    }
  
  return (
    <View style={styles.container}>
        <View style={styles.container}>
            <StatusBar backgroundColor ={COLORS.grey}/>

            <View style={{width: '100%'}}>
                <Image
                source={require('../assets/images/space.jpg')}
                style={styles.cover}
                />
            </View>
            <View style={styles.profileContainer}>
                <Image
                source={require('../assets/images/profile.jpeg')}
                style={styles.profile}
                />
                <Text style={styles.name}> {data ? data.username : "User"}</Text>
                {data === null? (
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <View style={styles.loginBtn}>
                            <Text style={styles.menuText}> L O G I N     </Text>
                        </View>
                    </TouchableOpacity>
                ): (
                    <View style={styles.loginBtn}>
                            <Text style={styles.menuText}>{data ? data.email : "Google@gamil.com" }   </Text>
                    </View>
                )}
                {!data? (
                    <View>
                        <Text>Please Login First</Text>
                    </View>
                ) : (
                    <View style={styles.menuWrapper}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Favorites')}>
                            <View style={styles.menuItem(0.2)}>
                                <MaterialCommunityIcons
                                name='heart-outline'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Favorites</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Orders')}>
                            <View style={styles.menuItem(0.2)}>
                                <MaterialCommunityIcons
                                name='truck-delivery-outline'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Orders</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                            <View style={styles.menuItem(0.2)}>
                                <SimpleLineIcons
                                name='bag'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Cart</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> clearCache()}>
                            <View style={styles.menuItem(0.2)}>
                                <MaterialCommunityIcons
                                name='cached'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Clear cache</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> deleteAccount()}>
                            <View style={styles.menuItem(0.2)}>
                                <AntDesign
                                name='deleteuser'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Delete Account</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> logout()}>
                            <View style={styles.menuItem(0.2)}>
                                <AntDesign
                                name='logout'
                                color={COLORS.primary}
                                size={24}
                                />
                                <Text style={styles.menuText}>Logout                                    (Login)</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    </View>
  )
  
}

export default Profile

// const styles = StyleSheet.create({})