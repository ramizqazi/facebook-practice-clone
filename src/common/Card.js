import React from 'react';
import {StyleSheet, View} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Card />
============================================================================= */
const Card = ({width, height, children, style, shadow}) => {
  const _style = {
    width,
    height,
  };

  return (
    <View
      style={[styles.container, _style, style, shadow ? styles.shadow : null]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F5F5F8',
    backgroundColor: Colors.white,
  },
  shadow: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default Card;
