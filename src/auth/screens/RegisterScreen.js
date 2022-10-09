import React, { useState } from 'react';
import { connect } from 'react-redux';
import fireStorage from '@react-native-firebase/storage';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';

import {
  Text,
  View,
  Button,
  Avatar,
  Touchable,
  Content,
  TextInput,
  DateTimePicker,
  AlertMessage,
} from '../../common/index';
import * as Colors from '../../config/colors';
import FacebookLogo from '../../assets/images/edit-facebook-logo.png';
import EyeIcon from '../../assets/icons/edit-eye-icon.svg';

import {getError} from '../redux/selectors';
import {register as registerAction} from '../redux/actions';

/* =============================================================================
<RegisterScreen />
============================================================================= */
const RegisterScreen = ({navigation, register, error}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dob, setDob] = useState();
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const disabled = loading || !email || !password || !firstName || !lastName || !dob || !photo;

  const [secureText, setSecureText] = useState(true);

  const _handlePhotoPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        setPhoto(response.assets[0]);
      },
    );
  };


  const _handleLoginPress = () => {
    navigation.navigate('Login')
  };

  const _handleSubmit = async () => {
    if(!disabled) {
      setLoading(true);
      const storageRef = fireStorage().ref('profile_pics/').child(photo.fileName);

      await storageRef.putFile(photo.uri);
      
      const fileUrl = await storageRef.getDownloadURL();
      
      register({
        email,
        password,
        firstName,
        lastName,
        fileUrl,
      });
      setLoading(false);
    };
  };

  return (
      <Content style={styles.contentContainer} contentContainerStyle={styles.content}>
        <FastImage style={styles.logo} source={FacebookLogo} />
        <TextInput 
          value={email}
          containerStyle={styles.inputContainer} 
          contentContainerStyle={styles.inputContent} 
          placeholder='Phone or email'
          onChange={setEmail}
          />
        <TextInput 
          secureTextEntry={secureText}
          value={password}
          containerStyle={styles.inputContainer} 
          contentContainerStyle={styles.inputContent} 
          right={(
            <Touchable style={styles.eyeBtn} onPress={() => setSecureText(!secureText)}>
              <EyeIcon />
            </Touchable>
          )}
          placeholder='Password'
          onChange={setPassword}
          />
        <TextInput 
          value={firstName}
          containerStyle={styles.inputContainer} 
          contentContainerStyle={styles.inputContent} 
          placeholder='Enter first name'
          onChange={setFirstName}
          />
        <TextInput 
          value={lastName}
          containerStyle={styles.inputContainer} 
          contentContainerStyle={styles.inputContent} 
          placeholder='Enter last name'
          onChange={setLastName}
          />
        <DateTimePicker 
          value={dob}
          placeholder='Enter date of birth' 
          onChange={setDob}
          />
        <Touchable horizontal onPress={_handlePhotoPress}>
            <Avatar size={90} url={photo} alt='Profile Pic' />
            <Text style={styles.dividerTxt}>Upload Profile Picture</Text>
        </Touchable>
        <Button
          block
          variant='primary'
          title='Register' 
          loading={loading}
          style={styles.loginBtn}
          onPress={_handleSubmit}
        />
        <View horizontal style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerTxt}>Or</Text>
          <View style={styles.divider} />
        </View>
        <Button
          title='Login'
          style={styles.createAccountBtn}
          titleStyle={styles.createAccountBtnTxt}
          onPress={_handleLoginPress}
        />
        {error && (
        <AlertMessage 
          message={error.message} 
          backgroundColor='#F6EAE9' 
        />
      )}
      </Content>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: '30%',
    backgroundColor: Colors.white,
  },
  logo: {
    width: 80,
    height: 80,
  },
  inputContainer:{
    flex: 0,
    marginTop: 25,
  },
  inputContent:{
    paddingHorizontal: 0,
    borderBottomWidth: 1.5,
  },
  eyeBtn:{
    padding: 10,
  },
  loginBtn:{
    marginVertical: 25,
  },
  forgotPassBtnTxt:{
    fontWeight: 'bold',
    color: Colors.primary,
  },
  dividerContainer:{
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerTxt:{
    marginHorizontal: 10,
  },
  createAccountBtn:{
    backgroundColor: Colors.success,
  },
  createAccountBtnTxt: {
    color: Colors.white,
  },
})

const mapStateToProps = (state) => ({
  error: getError(state),
});

const mapDispatchToProps = {
  register: registerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
