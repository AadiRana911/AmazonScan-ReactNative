/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React,{useState, useEffect, createRef} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import {styles} from '../Styles/style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';
import auth from '@react-native-firebase/auth';
// import {requestReadSMSPermission, startReadSMS} from 'react-native-read-sms/ReadSms';
import {
    confirmOTP,
    authState,
    signInWithPhone,
    signup,
  } from '../actions/auth';

const OTPScreen = ({navigation,route}, props) => {
    const [time, setTime] = useState(60);
    const [loader, setLoader] = useState(false);
    const otpRef = createRef('otp');
    const [otp,setOtp] = useState('');
    const [resend, setResend] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(true);
    let {confirmation} = route.params;
    const [confirmed, setConfirmed] = useState(confirmation);

    async function resendCode() {
        try {
            const {phoneNum} = route.params;
            // console.log('MyPhoneNumber==========>' + phoneNum);
            const confirmation = await auth().signInWithPhoneNumber(phoneNum);
            setConfirmed(confirmation);
            // console.log('Confirmed is =>>>>>>>>>>>>', confirmed);
            setIsOtpSent(true);
        }catch(e){
            alert(e.message, 'hello');
        }
    }
    async function confirmCode() {
        try {
            await confirmation.confirm(otp);
            // await AsyncStorage.setItem('isLoggedIn', 'true');
            navigation.navigate('Home');
        } catch (error) {
           alert(error.message, 'hello, hye');
        }
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <View style = {styles.Container}>
        <View style = {{flex: 0.35,justifyContent: 'flex-end'}}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
        </View>
            <View style = {[styles.nestedContainerL1]}>
                <View style = {[styles.nestedContainerL2]}>
                <Text style = {styles.textStyle}>OTP</Text>
                <View style = {[styles.nestedContainerL3]}>
                    <TextInput ref={otpRef} onChangeText={e=>{setOtp(e)}} value = {otp} style = {[styles.phoneNumberInputStyle, {width: '100%'}]} placeholderTextColor = "#fff" placeholder = "__  __  __  __  __  __ " keyboardType = {'number-pad'} maxLength = {6} />
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-end', marginTop: '1%'}}>
                {isOtpSent && <Text style = {{alignSelf: 'center', color: '#fff', fontSize: 15}}>Resend OTP in:</Text>}
                    {isOtpSent && <CountDown
                        until = {time}
                        onFinish = {() => {setIsOtpSent(false);}}
                        size={15}
                        timeToShow={['S']}
                        timeLabels={{s: null}}
                        digitStyle={{backgroundColor: '#2a3e5a'}}
                        digitTxtStyle={{color: '#fff', fontWeight: 'normal'}}
                    />}
                    {!isOtpSent && <TouchableOpacity style = {{marginTop: '1%'}} onPress = {resendCode}>
                        <Text style = {{color: 'red', borderBottomWidth: 1, borderBottomColor: 'red'}}>Resend OTP</Text>
                    </TouchableOpacity>}
                </View>
                </View>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {() => confirmCode()}>
                    <Text style = {styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>

    );
};



export default OTPScreen;