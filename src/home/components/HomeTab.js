import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Touchable} from '../../common';
import HomeIcon from '../../assets/icons/edit-home-icon.svg';
import WatchIcon from '../../assets/icons/edit-watch-icon.svg';
import NotificationIcon from '../../assets/icons/edit-notification-icon.svg';
import SettingsIcon from '../../assets/icons/edit-settings-icon.svg';
import * as Colors from '../../config/colors';

/* =============================================================================
<HomeTab />
============================================================================= */
const HomeTab = ({navigationState, jumpTo}) => {
  return (
    <View style={styles.container}>
      {navigationState.routes.map((route, index) => (
        <Touchable
          key={index}
          disabled={index === navigationState.index}
          onPress={() => jumpTo(route.key)}>
          <View
            style={[
              styles.item,
              index === navigationState.index && styles.itemActive,
            ]}>
              {index === 0 && <HomeIcon fill={navigationState.index === 0 ? Colors.primary : '#000'} />}
              {index === 1 && <WatchIcon fill={navigationState.index === 1 ? Colors.primary : '#000'} />}
              {index === 2 && <NotificationIcon fill={navigationState.index === 2 ? Colors.primary : '#000'} />}
              {index === 3 && <SettingsIcon fill={navigationState.index === 2 ? Colors.primary : '#000'} />}
          </View>
        </Touchable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderBottomWidth: 0.9,
    justifyContent: 'space-between',
    borderBottomColor: Colors.outline,
    backgroundColor: Colors.white,
  },
  item: {
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  textActive: {
    color: Colors.primary,
  },
});

export default HomeTab;
