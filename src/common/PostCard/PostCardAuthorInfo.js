import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';

import View from '../View';
import Text from '../Text';
import Avatar from '../Avatar';
import Touchable from '../Touchable';
import UsersIcon from '../../assets/icons/edit-users-icon.svg';
import MenuIcon from '../../assets/icons/edit-menu-icon.svg';
import CloseIcon from '../../assets/icons/edit-close-icon.svg';
import {firestoreTimestampToDate} from '../../util/firebaseHelpers';

import { getPost } from '../../entities/redux/selectors';

/* =============================================================================
<PostCardAuthorInfo />
============================================================================= */
const PostCardAuthorInfo = ({post}) => {
  const authorProfilePic = post?.author?.profileUrl;
  const authorDisplayName = `${post?.author?.firstName} ${post?.author?.lastName}`;
  const createdAt = moment(firestoreTimestampToDate(post?.createdAt)).fromNow();

  return(
    <View horizontal style={styles.container}>
      <View horizontal>
        <Avatar size={45} url={{uri: authorProfilePic}} />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.authorNameTxt}>{authorDisplayName}</Text>
          <Text style={styles.postTimeStampTxt}>{createdAt}. <UsersIcon /></Text>
        </View>
      </View>
      <View horizontal>
        <Touchable style={styles.btn}>
          <MenuIcon />
        </Touchable>
        <Touchable style={styles.btn}>
          <CloseIcon />
        </Touchable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent:'space-between',
  },
  profileInfoContainer:{
    marginLeft: 10,
  },
  authorNameTxt:{
    fontWeight: 'bold',
  },
  postTimeStampTxt:{
    fontSize: 13,
  },
  btn:{
    width: 20,
    height: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state, { id }) => ({
  post: getPost(state, { id }),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(PostCardAuthorInfo);
