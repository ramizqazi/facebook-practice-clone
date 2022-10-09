import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import {CreatePostCard, Content, PostCard, Text} from '../../../common/index'

import {getPosts, getLoading} from '../../redux/selectors';

const Home = ({posts, loading}) => {
  return(
    <Content>
      <CreatePostCard />
      {posts?.length ? posts.map(renderPost): <Text center style={{marginTop: 120}}>No Post Available</Text>}
      {loading &&  <ActivityIndicator size={30} color="white" />}
    </Content>
  );
};

const renderPost = (post) => <PostCard id={post}  key={post} />

const mapStateToProps = (state) => ({
  posts: getPosts(state),
  loading: getLoading(state),
})

export default connect(mapStateToProps)(Home);
