/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {View, Image} from 'react-native';
import {styles} from '../Styles/style';

import AsyncStorage from '@react-native-community/async-storage';


const SplashScreen = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(async() => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if(isLoggedIn === 'true'){
                navigation.navigate('Home');
            }else{
                navigation.navigate('SignIn');
            }
        },3000);
        return() => clearTimeout(timer);
    },[]);

    return (
        <View style = {[styles.Container,{flex: 1,justifyContent: 'center'}]}>
            <Image style = {{height: 250, width: 250}} source = {require('../../assets/Logo.png')}/>
        </View>
    );
};



export default SplashScreen;