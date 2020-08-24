"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmOTP = exports.signInWithPhone = exports.authState = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _auth = _interopRequireDefault(require("@react-native-firebase/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import {storeurl} from '../config';
var authState = function authState(rsl, rej) {
  return function (dispatch) {
    (0, _auth["default"])().onAuthStateChanged(function (user) {
      if (user) {
        rsl(user);

        try {
          setTimeout(function () {
            (0, _auth["default"])().signOut();
          }, 60000);
        } catch (_unused) {}
      }
    });
  };
};

exports.authState = authState;

var signInWithPhone = function signInWithPhone(phone, rsl, rej) {
  return function (dispatch) {
    (0, _auth["default"])().signInWithPhoneNumber(phone).then(function (confirmResult) {
      rsl(confirmResult);
    })["catch"](function (error) {
      rej(error.message);
    });
  };
};

exports.signInWithPhone = signInWithPhone;

var confirmOTP = function confirmOTP(otp, confirmation, rsl, rej) {
  return function (dispatch) {
    confirmation.confirm(otp)["catch"](function (error) {
      rej(error.message);
    });
  };
}; // export const signup = (data, rsl, rej) => {
//   return (dispatch) => {
//     axios(`${storeurl}Authentication/signup`, {
//       data,
//       method: 'post',
//     })
//       .then((res) => {
//         if (res.data.status == true) {
//           dispatch({
//             type: 'PROFILE',
//             user: res.data.data[0],
//           });
//           rsl();
//         } else {
//           rej(res.data.message);
//         }
//       })
//       .catch((err) => {
//         rej(err.message);
//       });
//   };
// };
// export const signin = (data, rsl, rej) => {
//   return (dispatch) => {
//     axios(`${storeurl}Authentication/login_user`, {
//       data,
//       method: 'post',
//     })
//       .then((res) => {
//         if (res.data.status == true) {
//           dispatch({
//             type: 'PROFILE',
//             user: res.data.data,
//           });
//           rsl();
//         } else {
//           rej(res.data.message);
//         }
//       })
//       .catch((err) => {
//         rej(err.message);
//       });
//   };
// };
// export const logout = () => {
//   return (dispatch) => {
//     dispatch({
//       type: 'PROFILE',
//     });
//   };
// };


exports.confirmOTP = confirmOTP;