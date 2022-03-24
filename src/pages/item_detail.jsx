import React, { useState } from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';

import ProfileIMG from '../assets/images/dummy1.jpg';

const ItemDetail = () => {

  return (
    <>
      <Gs.Container>
        <IDOuter>
          <IDLeft>

          </IDLeft>
          <IDRight>
            <div className='img-outer'>
              <img src={ProfileIMG} alt='' />
            </div>
          </IDRight>
        </IDOuter>
      </Gs.Container>

    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const IDOuter = styled(FlexDiv)`
  align-items:flex-start; justify-content:flex-start; margin:32px 0px 100px;
`;

const IDLeft = styled.div`
  width:calc(100% - 50px); margin-right:50px;
`;

const IDRight = styled.div`
  width:50%;
`;

export default ItemDetail;
