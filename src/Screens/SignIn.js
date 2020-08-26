/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import {styles} from '../Styles/style';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';


const SignIn = ({navigation}) => {
    const [toggle,setToggle] = useState(false);
    const [code, setCode] = useState('92');
    // const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState('');

    async function signInWithPhoneNumber() {
        if (phone !== ''){
            try {
                const confirmation = await auth().signInWithPhoneNumber('+'+code+phone);
                auth().onAuthStateChanged( (user) => {
                    if(user){
                        if (user.phoneNumber === ('+'+code+phone)) {
                            navigation.navigate('Home');
                            console.log(user.phoneNumber);
                        } 
                    }
                    else
                    {
                        // reset state if you need to  
                        // dispatch({ type: "reset_user" });
                        navigation.navigate('OTP',{confirmation,phone: '+'+code+phone });
                    }
                });
                // setConfirm(confirmation);
                console.log('=>>>>>>>>>>>>>>>>>>>',confirmation);
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
        <View style = {{flex: 0.35,justifyContent: 'flex-end'}}>
            <Image style = {styles.logoStyle} source = {require('../../assets/Logo.png')}/>
        </View>
            
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


// function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     try{
//         const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//         auth().onAuthStateChanged( (user) => {
//             if (user.phoneNumber === `+92${phone}`) {
//                 // Obviously, you can add more statements here, 
//                 //       e.g. call an action creator if you use Redux. 
    
//                 // navigate the user away from the login screens: 
//                 alert('Done');
//                 console.log(user.phoneNumber);
//             } 
//             else 
//             {
//                 // reset state if you need to  
//                 // dispatch({ type: "reset_user" });
//                 alert('Not Done')
//             }
//         });
//         setConfirm(confirmation);
//         console.log(confirm);
//     }catch(e){
//         alert(e.message)
//     }
//   }

// //   function confirmCode() {
// //       confirm
// //       .confirm(code)
// //       .then(user => {
// //           alert(`Verified ${user.uid}`);
// //           console.log(confirm);
// //       })
// //       .catch(e => {
// //           alert(e.message)
// //       });
// //   }
// //   useEffect( () => {
    
// // }, []);

//   if (!confirm) {
//     return (
//         <View>
//             <TextInput value={phone} onChangeText={text => setPhone(text)} keyboardType = {'number-pad'}/>
//             <Button
//                 title="Phone Number Sign In"
//                 onPress={() => signInWithPhoneNumber('+923072179416')}
//             />
//         </View>
//     );
//   }else{
//     return (
//         <>
//           <TextInput value={code} onChangeText={text => setCode(text)} />
//           <Button title="Confirm Code"/>
//         </>
//       );
//   }

  
// }



export default SignIn;