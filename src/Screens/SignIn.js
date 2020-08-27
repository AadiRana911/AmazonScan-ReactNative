/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import {styles} from '../Styles/style';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';


const SignIn = ({navigation}) => {
    const [toggle,setToggle] = useState(false);
    const [code, setCode] = useState('92');
    const [phone, setPhone] = useState('');

    BackHandler.addEventListener('hardwareBackPress',() => BackHandler.exitApp());

    async function signInWithPhoneNumber() {
        if (phone !== ''){
            try {
                const confirmation = await auth().signInWithPhoneNumber('+' + code + phone);
                auth().onAuthStateChanged( async(user) => {
                    if(user){
                        if (user.phoneNumber === ('+' + code + phone)) {
                            await AsyncStorage.setItem('isLoggedIn', 'true');
                            navigation.navigate('Home');
                            console.log(user.phoneNumber);
                        } else {
                            navigation.navigate('OTP',{confirmation, phoneNum: '+' + code + phone });
                        }
                    }
                    else {
                        navigation.navigate('OTP',{confirmation, phoneNum: '+' + code + phone });
                    }
                });
            } catch (e){
                alert(e.message);
            }
        } else {
            alert('Kindly enter phone no');
        }
       // setConfirm(confirmation);
    }
    useEffect(() => {
        console.log('outside');
        const storeDataLocally = async() => {
            console.log('inside');
            const user = await AsyncStorage.getItem('isLoggedIn');
            console.log('user is' + user);
            if(user === 'true'){
                navigation.navigate('Home');
            }
        };
        storeDataLocally();
    },[]);

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <View style = {styles.Container}>
        <View style = {{flex: 0.15,justifyContent: 'flex-end'}}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
        </View>
            <View style = {[styles.nestedContainerL1,]}>
                <View style = {[styles.nestedContainerL2]}>
                <Text style = {styles.textStyle}>Phone</Text>
                <View style = {[styles.nestedContainerL3]}>
                    <TouchableOpacity style = {[styles.countryCodeInputStyle]} onPress={()=>{setToggle(!toggle)}}>
                        <Text style = {styles.textStyle}>{ `+${code}`}</Text>
                    </TouchableOpacity>
                    {toggle &&  <CountryPicker withCallingCode = {true} onSelect = {((country) => setCode(country.callingCode[0]))} style = {{color: '#2a3e5a'}} containerButtonStyle = {styles.countryCodeInputStyle} visible onClose = {() => setToggle(false)}/>}
                    <TextInput   onChangeText={(e)=>setPhone(e)}  value={phone} style = {styles.phoneNumberInputStyle} placeholderTextColor = "#fff" placeholder = "__ __ __ __ __ __ __ __ __ __ __" keyboardType = {'number-pad'}/>
                </View>
                </View>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {(phoneNumber) => signInWithPhoneNumber(phoneNumber)}>
                    <Text style = {styles.buttonTextStyle}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>

    );
};


export default SignIn;