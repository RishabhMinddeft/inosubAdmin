import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';

import BcrumbFrame from '../assets/images/breadcrumb-frame.png';

function Breadcrumb() {

  return (
    <BCrumbMain>
      <Gs.Container>
        <BTitle>Connect Wallet</BTitle>
        <Blinklist>
          <Link to="/">Home</Link>
          {/* <Link to="#">Pages</Link> */}
          <p>Connect Wallet</p>
        </Blinklist>
      </Gs.Container>
    </BCrumbMain >
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const BCrumbMain = styled.div`
  background: url(${BcrumbFrame}) no-repeat; padding:24px 0px; background-size: 100% 100%;
`;

const BTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 20px; line-height: 24px; color: #FFFFFF; margin:0px 0px 10px;
`;

const Blinklist = styled(FlexDiv)`
  justify-content:flex-start;
  a{font-style: normal; font-weight: 500; font-size: 15px; line-height: 18px; color: rgba(255, 255, 255, 0.7); margin-right:15px; position:relative;
    :after{content:'/'; position:absolute; right:-10px; top:1px; }
    :hover{ color: rgba(255, 255, 255, 1);
      :after{color: rgba(255, 255, 255, 0.7);}
    }
  }
  p{margin:0px;}
`;

export default Breadcrumb;
