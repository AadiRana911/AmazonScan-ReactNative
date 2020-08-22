/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert, Switch, StyleSheet} from 'react-native';
import {styles} from '../Styles/style';
import {RNCamera} from 'react-native-camera';
import RNBeep from 'react-native-a-beep';
import axios from 'axios';

// set up the request parameters


const HomeScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  let currentBarCodeValue = '';
  let results;
 const rainForestSearchApi = async(paramsToSearch) => {
   try{
    console.log('Current: ', currentBarCodeValue);
    const res = await axios.get('https://api.rainforestapi.com/request', { params: paramsToSearch })
    // console.log(JSON.stringify(res.data.product,0,2));

    results = res.data.product;
    console.log('R => ',results.title);
    navigation.navigate(
      'ResultsShow',
      {
        title: results.title,
        label: results.label,
        link: results.link,
        rating: results.rating,
        ratingsTotal: results.ratings_total,
        image: results.main_image.link,
        specs: results.specifications,
        price: results.buybox_winner.price,
      });
   }catch(err){
     Alert.alert("The requested gtin doesn't exist in Amazon's database")
   }
 };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onBarCodeRead = (e) => {
    setIsCaptured(true);

    RNBeep.beep();

    currentBarCodeValue = e.data;
    console.log('detected data', e.data, 'of type', typeof (e.data))
    console.log('CCBV', currentBarCodeValue);
    const paramsToSearch = {
      api_key: '7F367D7092814A0CAA3D4FE010C44F1D',
      type: 'product',
      amazon_domain: 'amazon.com',
      gtin: currentBarCodeValue,
    };
    // Alert.alert('Barcode value is '+e.data, ' Barcode type is '+e.type);
    rainForestSearchApi(paramsToSearch);
    // console.log(JSON.stringify(response.data, 0, 2));
    setTimeout(() => {
      setIsCaptured(false);
    }, 3000);
};

// const rainForestApi = async () => {
//   try {
//       setResponse(await axios.get('https://api.rainforestapi.com/request', { params }));

//   } catch (err){
//       setErrorMessage('Something Went Wrong');
//   }
// };

  return(
    <View style = {[styles.Container, style.container]}>
      <View style = {style.view2}>
        <View style = {[style.view3]}>
          <Text style = {[styles.textStyle, style.switchTextLeft]}>Single</Text>
          <Switch
            trackColor={{ false: '#fff', true: '#00f000' }}
            thumbColor={isEnabled ? '#00ff00' : '#00ff00'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style = {style.switchStyle} />
            <Text style = {[styles.textStyle, style.switchTextRight]}>Multiple</Text>
        </View>
        <View  style = {[style.camView]}>
        <RNCamera
          style={styles.preview}
          // type={RNCamera.Constants.Type.back}
          flashMode="off"
          captureAudio={false}
          ratio = {'3:4'}
          // flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead = {
            (e)=>{
              if (!isCaptured){
                onBarCodeRead(e);
              }
            }}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // onGoogleVisionBarcodesDetected={({barcodes}) => {
            //   console.warn(barcodes[0].data);
            // if (!Utils.isNull(barcodes[0].data) & this.isCan) {
            //   this.runAction(barcodes[0].data)
            // }
          // }} 

          />
        </View>
         {/* <View>
          <TouchableOpacity style = {[styles.buttonStyle, style.scanButtonTransformation]}>
              <Text style = {styles.buttonTextStyle}>Scan</Text>
          </TouchableOpacity>
        </View>
        <Text style = {[styles.textStyle, style.orButtonAlignment]}>Or</Text>  */}
        <View style = {style.bottomViewStyle}>
          <TextInput style = {style.upcCodeInputStyle} placeholder = 'Write your upc code here'/>
          <TouchableOpacity style = {style.addButtonStyle}>
            <Text style = {[styles.buttonTextStyle, style.addButtonText]}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style = {style.bottomViewStyle}>
          <TextInput style = {style.upcCodeOutputStyle} value = {currentBarCodeValue}/>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  view2: {
    flex: 0.55, 
    justifyContent: 'space-between'
  },
  view3: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    width: '90%', 
    marginBottom: '10%'
  },
  switchTextLeft: {
    marginRight: 10,
  },
  switchTextRight: {
    marginLeft: 10,
  },
  switchStyle: {
    transform: [
      { scaleX: 1.4 },
      { scaleY: 1.4 }
    ]
  },
  camView: {

    borderColor: '#3393e6', 
    height: '70%', 
    justifyContent: 'center',
    // flex: 1,
    padding: 50,

    // flexDirection: 'row'
    },
  // scanButtonTransformation: {
  //   transform: [
  //     { scaleX: 0.6 }, 
  //     { scaleY: 0.6 }
  //   ]
  // },
  // orButtonAlignment: {
  //   marginTop: 0,
  //   alignSelf: 'center',
  // },
  bottomViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    alignItems: 'center',
    marginTop: '10%',
  },
  upcCodeInputStyle: {
    backgroundColor: '#fff', 
    width: '65%', 
    borderRadius: 30, 
    paddingHorizontal: 20
  },
  upcCodeOutputStyle: {
    backgroundColor: '#fff', 
    width: '90%', 
    borderRadius: 30, 
    paddingHorizontal: 20
  },
  addButtonStyle: {
    width: '25%', 
    backgroundColor: '#3393e6', 
    paddingVertical: 5, 
    borderRadius: 20, 
    alignItems: 'center'
  },
  addButtonText: {
    fontSize: 20,
  }
});

export default HomeScreen;
