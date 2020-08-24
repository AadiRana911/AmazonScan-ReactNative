/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React,{useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';
import auth from '@react-native-firebase/auth';

const OTPScreen = ({navigation,route}) => {
    const [time, setTime] = useState(60);
    const [otp,setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(true);
    const {confirm} = route.params;
    const [confirmed, setConfirmed] = useState(confirm);
    const [initializing, setInitializing] = useState(true);
    const [user, SetUser] = useState();

    async function resendCode() {
        try {
            const {phoneNum} = route.params;
            console.log('MyPhoneNumber==========>' + phoneNum);
            const confirmation = await auth().signInWithPhoneNumber(phoneNum);
            setConfirmed(confirmation);
            console.log('Confirmed is =>>>>>>>>>>>>', confirmed);
            setIsOtpSent(true);
        }catch(e){
            alert(e.message);
        }
    }
    async function confirmCode() {
        try {
            const response = await confirmed.confirm(otp);
            response && await AsyncStorage.setItem('isLoggedIn', 'true');
            alert('Done');
            if (!initializing && user){
                navigation.navigate('Home');
            }
        } catch (error) {
           alert(error.message);
        }
    }
    const onAuthStateChanged = (user1) => {
        SetUser(user1);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <View style = {styles.Container}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
            <View style = {[styles.nestedContainerL1]}>
                <View style = {[styles.nestedContainerL2]}>
                <Text style = {styles.textStyle}>OTP</Text>
                <View style = {[styles.nestedContainerL3]}>
                    <TextInput onChangeText={e=>{setOtp(e)}} value = {otp} style = {[styles.phoneNumberInputStyle, {width: '100%'}]} placeholderTextColor = "#fff" placeholder = "_ _ _ _ _ _ _ _ _ _ " keyboardType = {'number-pad'}/>
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