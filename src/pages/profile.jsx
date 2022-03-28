import React from 'react';
import { connect } from 'react-redux';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';

import ProfilePicture from '../assets/images/dummy3.jpg';

const Profile = (props) => {

  console.log('- Profile Page -')

  return (
    <Gs.Container>
      <ProfileBox>

      </ProfileBox>
    </Gs.Container>
  )
}


const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ProfileBox = styled.div`
  margin:32px 0px 24px; background: linear-gradient(180deg, rgba(26, 35, 42, 0) 30.5%, rgba(123, 245, 251, 0.1) 42.43%), #13141E; border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(60px);
`;

export default Profile;