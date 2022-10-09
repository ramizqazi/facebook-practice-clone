import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {TabView} from 'react-native-tab-view';

import Container from '../../common/Container';
import HomeHeader from '../components/HomeHeader';
import HomeTab from '../components/HomeTab';
import Home from '../components/Home/index'

import { getPosts as getPostsAction } from '../redux/actions';

const HomeScreen = ({ getPosts }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
    },
    {
      key: 'watch',
    },
    {
      key: 'notifications',
    },
    {
      key: 'settings',
    },
  ]);

  // GET POSTS
  useEffect(() => {
    getPosts();
  }, []);

  return(
    <Container>
      <HomeHeader />
      <TabView
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        />
    </Container>
  );
};

const renderTabBar = (props) => <HomeTab {...props}/>

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'home':
      return <Home />;
  }
};


const mapDispatchToProps = {
  getPosts: getPostsAction,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
