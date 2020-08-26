/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ActivityIndicator, View, Text, Image, TextInput, TouchableOpacity, Alert, Switch, StyleSheet} from 'react-native';
import {styles} from '../Styles/style';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

// import Entypo from 'react-native-vector-icons/Entypo';
// import RNBeep from 'react-native-a-beep'


// set up the request parameters


const HomeScreen = ({navigation}) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  let currentBarCodeValue = '';
  let results;
  const [upc, setUpc] = useState({data: ''});
  const [isRequested, setIsRequested] = useState(false);
 const rainForestSearchApi = async(paramsToSearch) => {
   try{
    console.log('Current: ', currentBarCodeValue);
    setIsRequested(true);
    const res = await axios.get('https://api.rainforestapi.com/request', { params: paramsToSearch });
    // console.log(JSON.stringify(res.data.product,0,2));

    results = res.data.product;
    // console.log('R => ',results.title);
    setIsRequested(false);
    navigation.navigate(
      'ResultsShow',
      {
        title: results.title,
        label: results.label,
        rating: results.rating,
        ratingsTotal: results.ratings_total,
        image: results.main_image.link,
        specs: results.specifications,
        price: results.buybox_winner.price,
      });
   }catch(err){
     setIsRequested(false);
     Alert.alert(err.message);
   }
 };

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onBarCodeRead = (e, isUpcEntered) => {
    setIsCaptured(true);
    // RNBeep.beep();
    if(!isUpcEntered){
      currentBarCodeValue = e.data;
    }else{
      currentBarCodeValue = upc.data;
    }
    console.log('detected data', e.data, 'of type', typeof (e.data))
    console.log('CCBV', currentBarCodeValue);
    const paramsToSearch = {
      api_key: '6BD8E203BA0D476CBBDB44CC4FDE7B13',
      type: 'product',
      amazon_domain: 'amazon.com',
      gtin: currentBarCodeValue,
    };
    // Alert.alert('Barcode value is '+e.data, ' Barcode type is '+e.type);
    rainForestSearchApi(paramsToSearch);
    // console.log(JSON.stringify(response.data, 0, 2));
    setTimeout(
      () => {
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
        {/* <View style = {[style.view3]}>
          <Text style = {[styles.textStyle, style.switchTextLeft]}>Single</Text>
          <Switch
            trackColor={{ false: '#fff', true: '#00f000' }}
            thumbColor={isEnabled ? '#00ff00' : '#00ff00'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style = {style.switchStyle} />
            <Text style = {[styles.textStyle, style.switchTextRight]}>Multiple</Text>
        </View> */}
        <View  style = {[style.camView]}>
        <RNCamera
          style={styles.preview}
          // type={RNCamera.Constants.Type.back}
          flashMode="off"
          captureAudio={false}
          ratio = {'1:1'}
          // flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead = {
            (e)=>{
              if (!isCaptured){
                onBarCodeRead(e, false);
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
        {isRequested && 
              <View style={[styles.container, styles.horizontal]}>
                {/* <ActivityIndicator />
                <ActivityIndicator size="large" />
                <ActivityIndicator size="small" color="#0000ff" /> */}
                <ActivityIndicator style = {{marginTop: '20%'}} size="large" color="#00ff00" />
              </View>
            }
         {/* <View>
          <TouchableOpacity style = {[styles.buttonStyle, style.scanButtonTransformation]}>
              <Text style = {styles.buttonTextStyle}>Scan</Text>
          </TouchableOpacity>
        </View>
        <Text style = {[styles.textStyle, style.orButtonAlignment]}>Or</Text>  */}
        <View style = {style.bottomViewStyle}>
          <TextInput onChangeText = {(e) => setUpc({data:e})} value = {upc} style = {style.upcCodeInputStyle} placeholder = 'Write your upc code here' keyboardType = 'number-pad'/>
          <TouchableOpacity style = {style.addButtonStyle} onPress = {() => {onBarCodeRead(upc, true)}}>
            <Text style = {[styles.buttonTextStyle, style.addButtonText]}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity onPress = {() => {}}>
        <Entypo style = {style.icon} color = {'#fff'} name = 'log-out'/>
      </TouchableOpacity> */}
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
    justifyContent: 'space-between',
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: '10%',
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
      { scaleY: 1.4 },
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
    marginTop: '30%',
  },
  upcCodeInputStyle: {
    backgroundColor: '#fff',
    width: '65%',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  upcCodeOutputStyle: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  addButtonStyle: {
    width: '25%',
    backgroundColor: '#3393e6',
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
  },
  icon: {
    fontSize: 38,
    // backgroundColor: 'green',
  },
  activityContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: "center",
    marginVertical: '5%',
    paddingTop: '100%' 
  },
  activityHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default HomeScreen;
