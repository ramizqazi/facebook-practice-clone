import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  Text,
  View,
  Button,
  Touchable,
  Container,
  TextInput,
  AlertMessage,
} from '../../common/index';
import FacebookLogo from '../../assets/images/edit-facebook-logo.png';
import EyeIcon from '../../assets/icons/edit-eye-icon.svg';
import * as Colors from '../../config/colors';

import {getError} from '../redux/selectors';
import {login as loginAction} from '../redux/actions';

/* =============================================================================
<LoginScreen />
============================================================================= */
const LoginScreen = ({navigation, login, error}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const disabled = !email || !password;

  const _handleCreateAccountPress = () => {
    navigation.navigate('Register');
  };

  const _handleSubmit = async () => {
    if(!disabled) {
      setLoading(true);

      await  login(email, password);

      setLoading(false);
    };
  };

  return (
    <Container style={styles.container}>
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
      <Button
        loading={loading}
        variant='primary'
        block title='Log In' 
        style={styles.loginBtn}
        onPress={_handleSubmit}
      />
      <Touchable>
        <Text style={styles.forgotPassBtnTxt}>Forgot Password ?</Text>
      </Touchable>
      <View horizontal style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerTxt}>Or</Text>
        <View style={styles.divider} />
      </View>
      <Button
        style={styles.createAccountBtn}
        titleStyle={styles.createAccountBtnTxt}
        title='Create new Facebook Account'
        onPress={_handleCreateAccountPress}
      />
      {error && (
        <AlertMessage 
          message={error.message} 
          backgroundColor='#F6EAE9' 
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop: '60%',
    paddingHorizontal: 30,
    alignItems: 'center',
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
    marginVertical: 40,
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
  login: loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
