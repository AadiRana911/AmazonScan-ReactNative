import axios from 'axios';
import auth from '@react-native-firebase/auth';
// import {storeurl} from '../config';
export const authState = (rsl, rej) => {
  return (dispatch) => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        rsl(user);
        try {
          setTimeout(() => {
            auth().signOut();
          }, 60000);
        } catch {}
      }
    });
  };
};

export const signInWithPhone = (phone, rsl, rej) => {
  return (dispatch) => {
    auth()
      .signInWithPhoneNumber(phone)
      .then((confirmResult) => {
        rsl(confirmResult);
      })
      .catch((error) => {
        rej(error.message);
      });
  };
};

export const confirmOTP = (otp, confirmation, rsl, rej) => {
  return (dispatch) => {
    confirmation.confirm(otp).catch((error) => {
      rej(error.message);
    });
  };
};

// export const signup = (data, rsl, rej) => {
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
