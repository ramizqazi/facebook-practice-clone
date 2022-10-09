import React from 'react';
import {StyleSheet, Pressable, Text, ActivityIndicator} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Button />
============================================================================= */
const Button = ({
  flex,
  block,
  title,
  style,
  loading,
  variant,
  txtColor,
  children,
  titleStyle,
  backgroundColor,
  ...props
}) => {
  const _CustomBackgroundColor = {
    backgroundColor: backgroundColor ? backgroundColor : null,
  };

  const _CustomTxtColor = {
    color: txtColor ? txtColor : null,
  };

  return (
    <Pressable
      style={[
        styles.container,
        flex && styles.flex,
        block && styles.block,
        _CustomBackgroundColor,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        style,
      ]}
      {...props}>
      {loading ? <ActivityIndicator color={Colors.white} /> : null}
      {!loading && title ? (
        <Text
          style={[
            styles.title,
            _CustomTxtColor,
            variant === 'primary' && styles.titlePrimary,
            variant === 'secondary' && styles.titleSecondary,
            titleStyle,
          ]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderColor: Colors.outline,
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  block: {
    width: '100%',
  },
  primary: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  secondary: {
    borderColor: Colors.black,
    backgroundColor: Colors.black,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'SFProDisplay-Semibold',
    textAlign: 'center',
  },
  titlePrimary: {
    color: Colors.white,
    fontFamily: 'SFProDisplay-Regular',
  },
  titleSecondary: {
    color: Colors.white,
    fontFamily: 'SFProDisplay-Regular',
  },
});

/* Export
============================================================================= */
export default Button;
