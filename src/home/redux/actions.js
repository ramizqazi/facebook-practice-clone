import {normalize} from 'normalizr';
import firestore from '@react-native-firebase/firestore';

import * as constants from './constants';

import {addEntities} from '../../entities/redux/actions';
import {post as postSchema} from '../../entities/api/schema';

const PostCollection = firestore().collection('posts');

/**
 * get Posts
 */
 export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: constants.GET_POSTS.REQUEST });

    const postSnapshot = await PostCollection.orderBy('createdAt', 'desc').get();

    if (!postSnapshot.empty) {
      const posts = [];
      postSnapshot.forEach((snapshot) => {
        posts.push({
          ...snapshot.data(),
          id: snapshot.id,
        });
      });

      const {entities, result} = normalize(posts, [postSchema]);

      dispatch(addEntities(entities));
      dispatch({
        type: constants.GET_POSTS.SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    dispatch({ type: constants.GET_POSTS.FAIL, error });
  } finally {
    dispatch({ type: constants.GET_POSTS.COMPLETE });
  }
};

/**
 * CREATE POST
 */
export const createPost = (postInfo) => async (dispatch) => {
  try {
    dispatch({ type: constants.CREATE_POST.REQUEST });

    const { fileUrl, postCaption, profile } = postInfo;

    const post = {
      author: profile,
      id: profile?.userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    if(postCaption) {
      post.description = postCaption;
    };

    if(fileUrl) {
      post.postImg = fileUrl;
    };

    await PostCollection.doc().set(post);
    
    const {entities, result} = normalize(post, postSchema);
    dispatch(addEntities(entities));
    dispatch({ 
      type: constants.CREATE_POST.SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({ type: constants.CREATE_POST.FAIL, error });
  } finally {
    dispatch({ type: constants.CREATE_POST.COMPLETE });
  }
};
