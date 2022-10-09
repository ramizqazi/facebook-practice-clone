import React, {useState} from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<DateTimePicker />
============================================================================= */
const DateTimePicker = ({
  mode,
  label,
  value,
  format,
  labelStyle,
  placeholder,
  containerStyle,
  contentContainerStyle,
  onChange,
  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const _showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const _hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const _handleChange = inputValue => {
    _hideDatePicker();

    if (onChange) {
      onChange(moment(inputValue).format('DD/MM/YYYY'));
    }
  };

  return (
    <TouchableOpacity
      onPress={_showDatePicker}
      style={[styles.container, containerStyle]}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.content, contentContainerStyle]}>
        {value ? (
          <Text numberOfLines={1} style={styles.value}>
            {mode === 'date' && value}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.placeholder}>
            {placeholder}
          </Text>
        )}
      </View>
      <DateTimePickerModal
        mode={mode}
        isVisible={isDatePickerVisible}
        onConfirm={_handleChange}
        onCancel={_hideDatePicker}
        {...props}
      />
    </TouchableOpacity>
  );
};

DateTimePicker.defaultProps = {
  mode: 'date',
  format: 'DD/MM/YYYY',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  label: {
    marginBottom: 6,
    color: Colors.label,
    fontSize: 10,
    lineHeight: 18,
  },
  content: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  value: {
    fontSize: 16,
    color: Colors.black,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.placeholder,
  },
});

export default DateTimePicker;
