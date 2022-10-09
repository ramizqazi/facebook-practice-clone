import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View, TextInput, Touchable } from '../../common/index';
import ChevronLeft from '../../assets/icons/edit-left-arrow-icon.svg';
import SearchIcon from '../../assets/icons/edit-search-icon.svg';
import * as Colors from '../../config/colors';

const ProfileHeader = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return(
    <View horizontal style={styles.container}>
      <Touchable style={styles.backBtn}>
        <ChevronLeft />
      </Touchable>
      <TextInput 
        left={<SearchIcon />}
        placeholder="Search"
        containerStyle={styles.textInputContainer} 
        contentContainerStyle={styles.inputContent}
      />
    </View>
  );
};

const getStyles = (insets) => 
  StyleSheet.create({
    container: {
      borderWidth: 1,
      alignItems: 'center',
      borderColor: Colors.border,
    },  
    backBtn:{
      paddingBottom: 10,
      paddingHorizontal: 15,
      paddingTop: insets.top + 10,
    },
    textInputContainer:{
      marginRight: 10,
      paddingBottom: 5,
      marginTop: insets.top,
    },
    inputContent: {
      height: 43,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: 'white',
      backgroundColor: '#f6f7f9',
    },
});

export default ProfileHeader;
