import React from 'react';
import {useParam} from '@react-navigation/native'

import {Container, Content} from '../../common';
import ProfileHeader from '../components/ProfileHeader';

const ProfileScreen = ({ route }) => {
  const id = route?.params?.id;
  
  return(
    <Container>
      <ProfileHeader />
      {/* <Content>
      </Content> */}
    </Container>
  );
};

export default ProfileScreen;
