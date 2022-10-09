import React from 'react';
import { connect } from 'react-redux';
import {Image, StyleSheet} from 'react-native';

import {View, Touchable} from '../../common/index';
import LogoutIcon from  '../../assets/icons/edit-logout-icon.svg';

import {logout as logoutAction} from '../../auth/redux/actions';

const HomeHeader = ({logout}) => {
  const _handleLogout = () => {
    logout();
  };

  return(
    <View horizontal style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/edit-app-log.jpg')} />
      <View horizontal>
        <Touchable style={styles.headerBtn}>
          <Image style={styles.searchIcon} source={require('../../assets/images/edit-search.png')} />
        </Touchable>
        <Touchable style={styles.headerBtn}>
          <Image style={styles.searchIcon} source={require('../../assets/images/edit-messenger.png')} />
        </Touchable>
        <Touchable style={styles.headerBtn} onPress={_handleLogout}>
         <LogoutIcon />
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },  
  logo: {
    width: 150,
    height: 50,
  },  
  searchIcon:{
    width: 22,
    height: 22,
  },
  headerBtn: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 40 /2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f2f7',
  }
})

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(null, mapDispatchToProps)(HomeHeader);
