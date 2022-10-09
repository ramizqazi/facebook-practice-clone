import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import View from '../View';
import Text from '../Text';
import Touchable from '../Touchable'
import PostCardAuthorInfo from './PostCardAuthorInfo';
import LikeIcon from '../../assets/icons/edit-like-icon.svg';
import CommentIcon from '../../assets/icons/edit-comment-icon.svg';
import ShareIcon from '../../assets/icons/edit-share-icon.svg';
import * as Colors from '../../config/colors';

import { getPost } from '../../entities/redux/selectors';

/* =============================================================================
<PostCard />
============================================================================= */
const PostCard = ({id, post}) => {
  const postImg = post?.postImg;
  const description = post?.description;

  return(
    <View style={styles.container}>
      <PostCardAuthorInfo id={id} />
      <View>
       {description && <Text  numberOfLines={2} style={styles.descTxt}>{description}</Text>}
       {postImg && <FastImage source={{uri: postImg}} style={styles.img} />}
      </View>
      <View style={styles.divider} />
      <View horizontal style={styles.btnContainer}>
        <Touchable horizontal style={styles.btn}>
          <LikeIcon />
          <Text style={styles.btnTxt}>Like</Text>
        </Touchable>
        <Touchable horizontal style={styles.btn}>
          <CommentIcon />
          <Text style={styles.btnTxt}>Comment</Text>
        </Touchable>
        <Touchable horizontal style={styles.btn}>
          <ShareIcon />
          <Text style={styles.btnTxt}>Share</Text>
        </Touchable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    marginVertical: 7,
    backgroundColor: Colors.white,
  },
  descTxt:{
    marginBottom:10,
    marginHorizontal: 10,
  },
  img:{
    flex:1,
    aspectRatio:0.6,
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
  divider:{
    height: 1,
    marginHorizontal: -20,
    backgroundColor: '#f5f5f5',
  },
});

const mapStateToProps = (state, { id }) => ({
  post: getPost(state, { id }),
});


// eslint-disable-next-line max-len
const propsAreEqual = (prevProps, nextProps) => prevProps.id === nextProps.id
 && prevProps.post?.postImg === nextProps.post?.postImg
 && prevProps.post?.description === nextProps.post?.descTxt
 && JSON.stringify(prevProps.post?.author) === JSON.stringify(nextProps.post?.author);

 export default connect(mapStateToProps)(React.memo(PostCard, propsAreEqual));
