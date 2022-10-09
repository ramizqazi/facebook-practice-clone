import React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import * as Colors from '../config/colors';

const AlertMessage = ({
  bold,
  black,
  white,
  small,
  light,
  medium,
  message,
  primary,
  backgroundColor,
}) => {
  const _layout = {
    backgroundColor: backgroundColor && backgroundColor,
  };

  return (
    <View style={[styles.container, _layout]}>
      <Text
        style={[
          styles.message,
          primary && styles.primary,
          black && styles.black,
          white && styles.white,
          light && styles.light,
          bold && styles.bold,
          medium && styles.medium,
          small && styles.small,
        ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  primary: {
    color: Colors.primary,
  },
  black: {
    color: Colors.black,
  },
  white:{
    color: Colors.white,
  },
  light: {
    color: Colors.border,
  },
  bold: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
  },
  medium: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
  },
  small: {
    fontSize: 14,
  },
});

export default AlertMessage;
