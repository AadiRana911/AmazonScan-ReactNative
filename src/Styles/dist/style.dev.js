"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

/* eslint-disable prettier/prettier */
var styles = _reactNative.StyleSheet.create({
  camContainer: {
    flex: 1 // justifyContent: 'center',
    // alignItems: 'center',

  },
  Container: {
    flex: 1,
    backgroundColor: '#2a3e5a',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15%'
  },
  nestedContainerL1: {
    // backgroundColor: '#ff0000',
    width: '90%',
    flex: 0.1,
    justifyContent: 'space-around'
  },
  nestedContainerL3: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  logoStyle: {
    width: 150,
    height: 150
  },
  textStyle: {
    color: '#fff',
    fontSize: 16
  },
  countryCodeInputStyle: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '20%',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneNumberInputStyle: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '70%',
    color: '#fff'
  },
  buttonStyle: {
    marginTop: '20%',
    width: '90%',
    // marginBottom: '10%',
    // top: '10',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#3393e6',
    paddingVertical: 20,
    borderRadius: 100
  },
  buttonTextStyle: {
    fontSize: 22,
    color: '#fff'
  },
  preview: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: 400,
    height: 100
  }
});

exports.styles = styles;