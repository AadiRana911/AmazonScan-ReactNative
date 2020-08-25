/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/style';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';


const SignIn = ({navigation}) => {
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     async function fetchSession(){
    //         const value = await AsyncStorage.getItem('isLoggedIn');
    //         // if (value === 'true' ){
    //         //     navigation.navigate('Home');
    //         // }
    //     }
    //     fetchSession();
    //   },[]);
    const [toggle,setToggle] = useState(false);
    const [code, setCode] = useState('92');
    // const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState('');

    async function signInWithPhoneNumber() {
        if (phone !== ''){
            try {
                const confirmation = await auth().verifyPhoneNumber('+'+code+phone)
                .on('state_changed', (phoneAuthSnapshot) => {
                  console.log('Snapshot state: ', phoneAuthSnapshot.state);
                  console.log('Snapshot state: ', phoneAuthSnapshot.code);
                  console.log('Snapshot state: ', phoneAuthSnapshot.error);
                  console.log('Snapshot state: ', phoneAuthSnapshot.verificationId);
                  navigation.navigate('OTP',{authSnapshot: phoneAuthSnapshot});
                });
                console.log('=>>>>>>>>>>>>>>>>>>>',confirmation)
            } catch (e){
                alert(e.message);
            }
        } else {
            alert('Kindly enter phone no');
        }
       // setConfirm(confirmation);
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <View style = {styles.Container}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
            <View style = {[styles.nestedContainerL1]}>
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