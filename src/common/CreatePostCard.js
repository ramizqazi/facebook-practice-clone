import React, { useState } from 'react';
import { connect } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Bar} from 'react-native-progress';
import fireStorage from '@react-native-firebase/storage';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import View from './View';
import Text from './Text';
import Avatar from './Avatar';
import TextInput from './TextInput';
import Touchable from './Touchable';
import LiveIcon from '../assets/icons/editl-live-icon.svg';
import AddPhotoIcon from '../assets/icons/edit-add-photo-icon.svg';
import RoomIcon from '../assets/icons/edit-room-icon.svg';
import ArrowRightIcon from '../assets/icons/edit-arrow-right-icon.svg';
import * as Colors from '../config/colors';

import { getUser, getProfile} from '../auth/redux/selectors';
import { createPost as createPostAction } from '../home/redux/actions';

/* =============================================================================
<CreatePostCard />
============================================================================= */
const CreatePostCard = ({user, profile, createPost}) => {
  const navigation = useNavigation();
  const profileId = profile?.userId;
  const profilePic = user?.photoURL;
  const [photo, setPhoto] = useState();
  const [postCaption, setPostCaption] = useState();
  const [loading, setLoading] = useState();

  const _handleProfilePress = () => {
    navigation.navigate('Profile', {id: profileId});
  };

  const _handlePhotoPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if(!response?.didCancel) {
          setPhoto(response.assets[0]);
        }
      },
    );
  };

  const _handleSubmit = async () => {
    if(photo || postCaption && !loading) {
      setLoading(0.1);
      
      let fileUrl = undefined;
      
      if(photo) {
        const storageRef = fireStorage().ref('post_media/').child(photo.fileName);
        
        setLoading(0.3);
        
        await storageRef.putFile(photo.uri);
        
        setLoading(0.5);
        fileUrl = await storageRef.getDownloadURL();
      }
      setLoading(0.8);
      
      await createPost({
        fileUrl,
        postCaption,
        profile,
      });
      setLoading(1);
    }
    setPhoto();
    setLoading(false);
    setPostCaption('');
  };

  return (
    <View style={styles.container}>
      <View horizontal style={styles.inputContainer}>
        <Touchable onPress={_handleProfilePress}>
          <Avatar url={{uri: profilePic}} size={45} />
        </Touchable>
        <TextInput 
          value={postCaption}
          containerStyle={styles.textInputContainer} 
          contentContainerStyle={styles.inputContent}
          placeholder="What's on your mind?"
          onChange={setPostCaption}
        />
        <Touchable style={styles.postBtn} onPress={_handleSubmit} >
          {!loading ? <ArrowRightIcon />: <ActivityIndicator color='white' />}
        </Touchable>
      </View>
      {loading && <Bar progress={loading} width={350} style={styles.progressBar} />}
      {photo &&  (
        <FastImage source={photo} style={styles.img} />
      )}
      <View style={styles.divider} />
      <View horizontal style={styles.btnContainer}>
        <Touchable horizontal style={styles.btn}>
          <LiveIcon />
          <Text style={styles.btnTxt}>Live</Text>
        </Touchable>
        <Touchable horizontal style={styles.btn} onPress={_handlePhotoPress}>
          <AddPhotoIcon />
          <Text style={styles.btnTxt}>Photo</Text>
        </Touchable>
        <Touchable horizontal style={styles.btn}>
          <RoomIcon />
          <Text style={styles.btnTxt}>Room</Text>
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop: 10,
    backgroundColor: Colors.white,
  },
  inputContainer:{
    paddingHorizontal: 20,
  },
  textInputContainer:{
    marginLeft: 10,
  },
  inputContent: {
    borderWidth: 1,
    borderRadius: 25,
  },
  postBtn:{
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
  },
  img:{
    flex: 1,
    aspectRatio: 0.8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  progressBar:{
    marginVertical: 10,
    marginHorizontal: 20,
  },
  divider:{
    height: 1,
    marginTop: 10,
    marginHorizontal: -20,
    backgroundColor: '#f5f5f5',
  },
  btnContainer:{
    flex:1,
    justifyContent: 'space-between',
  },
  btn:{
    flex:1,
    paddingVertical:15,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent: 'center',
  },
  btnTxt:{
    marginLeft: 8,
  },
});

const mapStateToProps = (state) => ({
  user: getUser(state),
  profile: getProfile(state),
});

const mapDispatchToProps = {
  createPost: createPostAction,
};

// eslint-disable-next-line max-len
const propsAreEqual = (prevProps, nextProps) =>  JSON.stringify(prevProps.user) === JSON.stringify(nextProps.user) 
 && prevProps.user?.photoURL === nextProps.user?.photoURL
 && JSON.stringify(prevProps.profile) === JSON.stringify(nextProps.profile);


export default connect(
  mapStateToProps,
  mapDispatchToProps)(React.memo(CreatePostCard, propsAreEqual));
