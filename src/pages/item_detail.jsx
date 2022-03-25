import React from 'react';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ProfileIMG from '../assets/images/dummy1.jpg';
import EyeIcon from '../assets/images/eye.png';
import DollarIcon from '../assets/images/dollar.png';
import RocketIcon from '../assets/images/rocket.png';

const ItemDetail = () => {

  return (
    <>
      <Gs.Container>
        <IDOuter>
          <IDLeft>
            <IDHeader>
              <IDTitle>List item for sale</IDTitle>
              <div className='view'>
                <img src={EyeIcon} alt='' />
                <p>235</p>
              </div>
            </IDHeader>
            <hr />
            <CustomTabs2>
              <label>Type</label>
              <Tabs>
                <TabList>
                  <Tab><img src={DollarIcon} alt='' /> Fixed Price</Tab>
                  <Tab><img src={RocketIcon} alt='' /> Timed</Tab>
                </TabList>
                <TabPanel>
                  <label>Description</label>
                  <FDEsc>Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada. Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum</FDEsc>
                </TabPanel>
                <TabPanel>
                  <label>Description</label>
                  <FDEsc>Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada. Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum</FDEsc>
                </TabPanel>
              </Tabs>
            </CustomTabs2>
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
  align-items:flex-start; justify-content:flex-start; margin:73px 0px 92px;
`;

const IDLeft = styled.div`
  width:50%;
  hr{margin:24px 0px; border-color: rgba(255, 255, 255, 0.17); border-top:0px;}
`;

const IDRight = styled.div`
  width:50%;
  .img-outer{ background: linear-gradient(0deg, rgba(26, 35, 42, 0) 84.72%, rgba(123, 245, 251, 0.1) 98.82%), #13151C; padding:24px;
    border: 1px solid #7BF5FB; box-sizing: border-box; width:532px; height:532px; overflow:hidden; border-radius: 2px; margin-left:auto;
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const IDHeader = styled(FlexDiv)`
  justify-content:space-between;
  .view{display:flex; align-items:center; justify-content:center; background: #2D2F43; border-radius: 81px; padding:5px 10px 6px;
    p{margin:0px 0px 0px 4px; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF;}
  }
`;

const IDTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF;
`;

const CustomTabs2 = styled.div`
  label{font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #FFFFFF; margin-bottom:16px; display:block;}
  .react-tabs__tab-list{ display:flex; align-items:center; justify-content:space-between; margin-bottom:0px; border-bottom:0px;
    .react-tabs__tab{width:calc(50% - 8.5px); text-align:center; opacity:0.5; font-style: normal; font-weight: 700; font-size: 17px; line-height: 20px; color: #6BFCFC; min-height:67px;
      display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box;
      img{margin-right:8px;}
      &.react-tabs__tab--selected{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px; opacity:1;}
      :after{display:none;}
    }
  }
  .react-tabs__tab-panel{padding:32px 0px;}
`;

const FDEsc = styled.div`
  font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 17px; line-height: 24px; color: #FFFFFF; opacity: 0.9;
`;

// const InputOuter = styled.div`
//   margin-bottom:40px; 
//   input,textarea,select{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
//     font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
//     ::placeholder{color: #FFFFFF; opacity: 0.7;}
//   }
//   textarea{min-height:116px; resize:none;}
//   select{-webkit-appearance: none; -moz-appearance: none; appearance: none; background:none; cursor:pointer;
//     option{background: rgba(54, 57, 79, 1);}
//   }
//   &.mb-0{margin-bottom:0px;}
//   .select-outer{position:relative; z-index:0; background: rgba(54, 57, 79, 0.5);}
// `;

export default ItemDetail;
