import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as constants from './constants';

const ProfileCollection = firestore().collection('profiles');

/**
 * AUTH_STATE_CHANGE
 */
export const changeAuthState = (payload) => ({
  type: constants.AUTH_STATE_CHANGE,
  payload,
});

/**
 * login
 */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.LOGIN.REQUEST });

    await auth().signInWithEmailAndPassword(email, password);

    const profile = await ProfileCollection.where('userId', "==", auth().currentUser.uid).get();
    const userProfile =  profile.docs[0].data();
    
    dispatch({ type: constants.LOGIN.SUCCESS, payload: userProfile});
  } catch (error) {
    dispatch({ type: constants.LOGIN.FAIL, error });
  } finally {
    dispatch({ type: constants.LOGIN.COMPLETE });
  }
};

/**
 * Register
 */
export const register = (info) => async (dispatch) => {
  try {
    dispatch({ type: constants.REGISTER.REQUEST });
    const {
      email,
      password,
      firstName,
      lastName,
      fileUrl,
    } = info;

    await auth().createUserWithEmailAndPassword(email, password);
    
    await auth().currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
      photoURL: fileUrl,
    });

    const profileDoc = ProfileCollection.doc(auth().currentUser.uid);

    const profile =  {
      email,
      firstName,
      lastName,
      profileUrl: fileUrl,
      coverPicUrl: 'https://images8.alphacoders.com/282/thumb-1920-282535.jpg',
      userId: auth().currentUser.uid,
    };

    await profileDoc.set(profile);

    dispatch({ type: constants.REGISTER.SUCCESS, payload: profile });
  } catch (error) {
    dispatch({ type: constants.REGISTER.FAIL, error });
  } finally {
    dispatch({ type: constants.REGISTER.COMPLETE });
  }
};

/**
 * Logout
 */
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: constants.LOGOUT.REQUEST });

    const user = auth().currentUser;

    if (user) {
      await auth().signOut();
    }

    dispatch({ type: constants.LOGOUT.SUCCESS });
  } catch (error) {
    dispatch({ type: constants.LOGOUT.FAIL, error });
  } finally {
    dispatch({ type: constants.LOGOUT.COMPLETE });
  }
};
