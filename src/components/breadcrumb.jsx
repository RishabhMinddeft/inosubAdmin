import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';

import LogoImg from '../assets/images/logo.png';

function Breadcrumb() {

  return (
    <BCrumbMain>
      <Gs.Container>
      </Gs.Container>
    </BCrumbMain >
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const BCrumbMain = styled.div`
  background: url(${FooterBG}) no-repeat; padding:80px 0px; background-size: cover;
`;

export default Breadcrumb;
