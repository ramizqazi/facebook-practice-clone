import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<TextInput />
============================================================================= */
const TextInput = ({
  left,
  right,
  type,
  label,
  value,
  editable,
  inputStyle,
  labelStyle,
  placeholder,
  containerStyle,
  contentContainerStyle,
  onPress,
  onChange,
  ...props
}) => {
  const textInput = useRef();
  const [focused, setFocused] = useState(false);

  const _handleChange = inputValue => {
    if (onChange) {
      onChange(inputValue);
    }
  };

  const _handlePress = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
    if(typeof onPress === 'function') {
      onPress();
    } 
  };

  const _style = focused && {
    borderColor: Colors.primary,
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      disabled={!editable}
      onPress={_handlePress}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.content, contentContainerStyle, _style]}>
        {left}
        <RNTextInput
          ref={textInput}
          value={value}
          style={[
            styles.input,
            left && styles.inputWithLeft,
            right && styles.inputWithRight,
            inputStyle,
          ]}
          editable={editable}
          selectionColor="#8A93A0"
          placeholderTextColor={Colors.placeholder}
          placeholder={placeholder}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onChangeText={_handleChange}
          {...props}
        />
        {right}
      </View>
    </Pressable>
  );
};

TextInput.defaultProps = {
  type: 'primary',
  editable: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    letterSpacing: 1,
    color: '#2A3037',
    fontFamily: 'SFProDisplay-Semibold',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 15,
    color: Colors.grey3,
    paddingHorizontal: 0,
    fontFamily: 'SFProDisplay-Regular',
  },
  inputWithLeft: {
    marginLeft: 14,
  },
  inputWithRight: {
    marginRight: 14,
  },
});

export default TextInput;
