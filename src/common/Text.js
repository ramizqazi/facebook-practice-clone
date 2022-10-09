import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Text />
============================================================================= */
const Text = ({
  h1,
  h2,
  h3,
  xl,
  lg,
  md,
  sm,
  xs,
  bold,
  light,
  medium,
  style,
  center,
  primary,
  children,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        xl && styles.xl,
        lg && styles.lg,
        md && styles.md,
        sm && styles.sm,
        xs && styles.xs,
        bold && styles.bold,
        light && styles.light,
        medium && styles.medium,
        center && styles.center,
        primary && styles.primary,
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.grey3,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
  },
  h1: {
    color: Colors.black,
    fontSize: 32,
    fontFamily: 'SFProDisplay-Bold',
  },
  h2: {
    color: Colors.black,
    fontSize: 28,
    fontFamily: 'SFProDisplay-Bold',
  },
  h3: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
  },
  xl: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
  },
  lg: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'SFProDisplay-Semibold',
  },
  md: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
  },
  sm: {
    fontSize: 14,
  },
  xs: {
    fontSize: 12,
  },
  thin: {
    fontFamily: 'SFProDisplay-Thin',
  },
  bold: {
    fontFamily: 'SFProDisplay-Bold',
  },
  light: {
    fontFamily: 'SFProDisplay-Light',
  },
  medium: {
    fontFamily: 'SFProDisplay-Medium',
  },
  regular: {
    fontFamily: 'SFProDisplay-Regular',
  },
  center: {
    textAlign: 'center',
  },
  primary: {
    color: Colors.primary,
  },
});

/* Export
============================================================================= */
export default Text;
