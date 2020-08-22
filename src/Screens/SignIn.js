/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/style';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';


const SignIn = ({navigation}) => {
    const [toggle,setToggle] = useState(false);
    const [code, setCode] = useState("92");
    const [confirm, setConfirm] = useState(null);
    const [otp, setOTP] = useState('');

    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(otp);
        } catch (error) {
            console.log('Invalid code.');
        }
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
                    <TextInput style = {styles.phoneNumberInputStyle} placeholderTextColor = "#fff" placeholder = "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _" keyboardType = {'number-pad'}/>
                </View>
                </View>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {() => navigation.navigate('OTP')}>
                    <Text style = {styles.buttonTextStyle}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>

    );
};



export default SignIn;