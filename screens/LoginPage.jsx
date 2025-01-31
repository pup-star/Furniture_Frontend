import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import styles from './login.style';
import { Button, BackBtn } from '../components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import axios from 'axios';
import AsyncStorage from  "@react-native-async-storage/async-storage";



const validationSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, 'Password must be at least 8 charecter')
    .required('Required'),
    email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
  });


const LoginPage = ({navigation}) => {
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

  
 const inValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
            [
                {
                    text: "Cancel", 
                    onPress: ()=> {},
                },
                {
                    text: "Container", 
                    onPress: ()=> {}
                },
                {defaultIndex : 1}
            ]
        )
    }
    //Post login API AndreDoe@example.com
    const login = async(values) => {
        setLoader(true)
        console.log(values)

        const endpoint = "http://localhost:3000/api/login";
        // const data = values;
        const response = await axios.post(endpoint, values)
        if (response.status === 200){
            console.log(response.status)
            setLoader(false);
            setResponseData(response.data)
            console.log(response.data)
            //console.log(`token: ${response.data.token}`);
            console.log(`user${response.data._id}`)
            //console.log(`user${responseData._id}`)
            // await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
            // await AsyncStorage.setItem('id', JSON.stringify(responseData._id))
            // navigation.replace('Bottom Navigation')
            //await AsyncStorage.setItem(response.data.token)
            //await AsyncStorage.setItem(response.data.token, JSON.stringify(response.data));
            await AsyncStorage.setItem('token', JSON.stringify(response.data._id));
            let userdata = await AsyncStorage.getItem("token");
            let data = JSON.parse(userdata);
            console.log(`getItem id: ${data}`)
            //navigation.replace('Bottom Navigation')
            navigation.navigate('Bottom Navigation')
        } else {
            setLoader(false);
            Alert.alert('Login Failed')
            console.log(error)
        }
    }



  return (
   <ScrollView contentContainerStyle={{paddingBottom: 60}} >
    <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
            <BackBtn onPress={()=> navigation.replace("Bottom Navigation")}/>
                <Image
                source={require('../assets/images/bk.png')}
                style={styles.cover}
                />
            <Text style={styles.title}>Unlimited Luxurious FurniTure</Text>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={(values) => login(values)}
                >

                {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                    <View>
                        {/* email */}
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper(touched.email ? COLORS.secondary: COLORS.offwhite)}>
                            <MaterialCommunityIcons
                            name="email-outline"
                            size={20}
                            color={COLORS.grey}
                            style={styles.iconStyle}
                            />
                            <TextInput
                            placeholder="Email"
                            onFocus={()=> {setFieldTouched('email')}}
                            onBlur={()=> {setFieldTouched('email', '')}}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{flex: 1}}
                            />
                        </View>
                        {touched.email && errors.email && (
                            <Text style={styles.errorMessage}>{errors.email}</Text>
                        )}
                      </View>

                      {/* password */}
                      <View style={styles.wrapper}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper(touched.password ? COLORS.secondary: COLORS.offwhite)}>
                            <MaterialCommunityIcons
                            name="lock-outline"
                            size={20}
                            color={COLORS.grey}
                            style={styles.iconStyle}
                            />
                            <TextInput
                            secureTextEntry={obsecureText}
                            placeholder="Password"
                            onFocus={()=> {setFieldTouched('password')}}
                            onBlur={()=> {setFieldTouched('password', '')}}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{flex: 1}}
                            />

                            <TouchableOpacity onPress={()=> {setObsecureText(!obsecureText)}}>
                                <MaterialCommunityIcons
                                name={obsecureText? "eye-outline": "eye-off-outline"}
                                size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorMessage}>{errors.password}</Text>
                        )}
                      </View>


                    <Button 
                    loader={loader}
                    title={"L O G I N"} 
                    onPress={isValid ? handleSubmit: inValidForm} 
                    isValid={isValid}/>

                    <Text 
                    style={styles.registration} 
                    onPress={()=> {
                    navigation.navigate('SignUp')}}>Register</Text>
                    </View>
                )}
            </Formik>
        </View>
    </SafeAreaView>
   </ScrollView>
  )
}

export default LoginPage