/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';


const OTPScreen = ({navigation}) => {

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <View style = {styles.Container}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
            <View style = {[styles.nestedContainerL1]}>
                <View style = {[styles.nestedContainerL2]}>
                <Text style = {styles.textStyle}>OTP</Text>
                <View style = {[styles.nestedContainerL3]}>
                    <TextInput style = {[styles.phoneNumberInputStyle, {width: '100%'}]} placeholderTextColor = "#fff" placeholder = "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _"/>
                </View>
                </View>
                <TouchableOpacity style = {[styles.buttonStyle]} onPress = {() => navigation.navigate('Home')}>
                    <Text style = {styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>

    );
};



export default OTPScreen;