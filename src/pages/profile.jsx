import React from 'react';
import { Link } from 'react-router-dom';
import Gs from '../theme/globalStyles';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactTooltip from 'react-tooltip';
import { BsCheckCircleFill } from 'react-icons/bs';

import ProfilePicture from '../assets/images/dummy3.jpg';
import CopyIcon from '../assets/images/copy.png';
import FBIcon from '../assets/images/s-facebook.png';
import TWIcon from '../assets/images/s-twitter.png';
import TSIcon from '../assets/images/translate.png';
import GIcon from '../assets/images/google.png';
import ProfileIMG from '../assets/images/dummy1.jpg';
import ProfileIMG2 from '../assets/images/dummy2.jpg';
import Calender2 from '../assets/images/calender2.png';
import LMShape from '../assets/images/lm-shape.png';

const Profile = (props) => {

  return (
    <>
      <Gs.Container>
        <ProfileBox>
          <ProfileLeft>
            <div className='img-outer'>
              <img src={ProfilePicture} alt='' />
            </div>
          </ProfileLeft>
          <ProfileRight>
            <PRTop>
              <PRName>Trista Francis</PRName>
              <SocialList>
                <Link to='#'><img src={FBIcon} alt='' /></Link>
                <Link to='#'><img src={TWIcon} alt='' /></Link>
                <Link to='#'><img src={GIcon} alt='' /></Link>
                <Link to='#'><img src={TSIcon} alt='' /></Link>
              </SocialList>
            </PRTop>
            <PRDesc data-tip="<p>Link Copied</p> <BsCheckCircleFill />" data-html="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</PRDesc>
            <PRBottom>
              <CopyInputOuter>
                <input type='text' placeholder='DdzFFzCqrhshMSx....' />
                <img src={CopyIcon} alt='' data-tip="Click to copy your wallet adress." />
              </CopyInputOuter>
              <EditProfile>Edit Profile</EditProfile>
            </PRBottom>
          </ProfileRight>
        </ProfileBox>
        <CustomHTabs>
          <Tabs>
            <TabList>
              <Tab><div className='inner'>ALL</div></Tab>
              <Tab><div className='inner'>ART</div></Tab>
              <Tab><div className='inner'>MUSIC</div></Tab>
              <Tab><div className='inner'>COLLECTIBLES</div></Tab>
              <Tab><div className='inner'>SPORTS</div></Tab>
            </TabList>
            <TabPanel>
              <LeftOuter>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
              </LeftOuter>
            </TabPanel>
            <TabPanel>
              <LeftOuter>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
              </LeftOuter>
            </TabPanel>
            <TabPanel>
              <LeftOuter>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
              </LeftOuter>
            </TabPanel>
            <TabPanel>
              <LeftOuter>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
              </LeftOuter>
            </TabPanel>
            <TabPanel>
              <LeftOuter>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
                <LeftInner>
                  <LeftBox>
                    <LeftTop>
                      <div className='img-outer'>
                        <img src={ProfileIMG} alt='' />
                      </div>
                      <Timer>
                        <img src={Calender2} alt='' />
                        <p>05 : 12 : 07 : 45</p>
                      </Timer>
                    </LeftTop>
                    <CILHeader>
                      <CILTitle>Game Asset Name</CILTitle>
                      <GreyBadge>10X</GreyBadge>
                    </CILHeader>
                    <OtherDetail>
                      <ODLeft>
                        <div className='img-outer'>
                          <img src={ProfileIMG2} alt='' />
                        </div>
                        <div>
                          <PName>CREATOR</PName>
                          <PDetail>GAME NAME</PDetail>
                        </div>
                      </ODLeft>
                      <ODRight>
                        <EditBtn>Edit Item</EditBtn>
                      </ODRight>
                    </OtherDetail>
                  </LeftBox>
                  <LeftBottom>
                    <OtherDetail>
                      <ODRight className='text-left'>
                        <PName className='ver2'>OFFER</PName>
                        <SValue>4.89 SFUND <PName className='ver2 ver3'>= 12.246 BUSD</PName></SValue>
                      </ODRight>
                      <GreyBadge>10X</GreyBadge>
                    </OtherDetail>
                  </LeftBottom>
                </LeftInner>
              </LeftOuter>
            </TabPanel>
          </Tabs>
        </CustomHTabs>
        <LoadMore>
          <img src={LMShape} alt='' />
          <Link to='#'>Load More</Link>
          <img src={LMShape} className='mirrored' alt='' />
        </LoadMore>
      </Gs.Container>
      <ReactTooltip className='TT-design' />
    </>
  )
}


const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const LoadMore = styled(FlexDiv)`
  margin:0px 0px 100px;
  img{margin:0px 20px;}
  a{font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB; letter-spacing:0.5px;
    :hover{opacity:0.8;}
  }
`;

const ProfileBox = styled(FlexDiv)`
  justify-content:flex-start; align-items:flex-start; margin:32px 0px 0px; padding:50px; background: linear-gradient(180deg, rgba(26, 35, 42, 0) 30.5%, rgba(123, 245, 251, 0.1) 42.43%), #13141E; border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(60px);
`;

const ProfileLeft = styled.div`
  .img-outer{ border-radius: 2px; border: 1px solid #7BF5FB; backdrop-filter: blur(60px); width:201px; height:185px; overflow:hidden;
    img{width:100%; height:100%; object-fit:cover; }
  }
`;

const ProfileRight = styled.div`
  margin-left:32px; width: calc(100% - 235px);
`;

const PRName = styled.div`
  font-style: normal; font-weight: 700; font-size: 36px; line-height: 43px; color: #FFFFFF; margin:0px 0px 19px;
`;

const PRDesc = styled.div`
  max-width:528px; font-style: normal; font-weight: 500; font-size: 17px; line-height: 25px; color: #FFFFFF; opacity: 0.8; margin-bottom:23px;
`;

const PRBottom = styled(FlexDiv)`
  justify-content:space-between;
`;

const CopyInputOuter = styled.div`
  position:relative; max-width:218px; margin:0px; width:100%;
  img{position:absolute; top:12px; right:12px; cursor:pointer;}
  input{width:100%; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; padding:13px 16px; min-height:50px;
    font-style: normal; font-family: 'Adrianna Rg'; font-weight: 400; font-size: 16px; line-height: 22px; color: #FFFFFF;
    ::placeholder{color: #FFFFFF; opacity: 0.7;}
  }
`;

const EditProfile = styled.button`
  border: 1px solid #6BFCFC; background:none; box-sizing: border-box; border-radius: 4px; padding:14px 60px; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB;
  :hover{background:#6BFCFC; color:#1D2A34;}
`;

const PRTop = styled(FlexDiv)`
  justify-content:space-between;
`;

const SocialList = styled(FlexDiv)`
  a{background: #1D2A34; border: 1.5px solid #7BF5FB; box-sizing: border-box; border-radius: 2px; width:37.5px; height:37.5px; margin:0px 6px; display:flex; align-items:center; justify-content:center;
    :hover{opacity:0.8;}
  }
`;

const CustomHTabs = styled.div`
  margin-bottom:32px;
  .react-tabs__tab-list{ display:flex; align-items:center; justify-content:center; margin-bottom:0px; border-bottom:0px; margin-top: -1px;
    .react-tabs__tab{width:20%; text-align:center; font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #6BFCFC; min-height:67px;
      display:flex; align-items:center; justify-content:center; border: 1px solid #7BF5FB; box-sizing: border-box; border-top:0px;
      &.react-tabs__tab--selected{background: linear-gradient(360deg, rgba(123, 245, 251, 0.44) -52.99%, rgba(123, 245, 251, 0) 100%); border-radius:0px;
        .inner{opacity:1;}
      }
      :after{display:none;}
      .inner{opacity:0.5;}
    }
  }
  .react-tabs__tab-panel{padding:24px 0px 0px; box-sizing: border-box;}
`;

const LeftOuter = styled(FlexDiv)`
  justify-content:flex-start; margin:0px -12px;
`;

const LeftInner = styled.div`
  width:calc(25% - 24px); margin:0px 12px 24px 12px;
`;

const LeftBox = styled.div`
  border: 1px solid #7BF5FB; backdrop-filter: blur(60px); border-radius: 4px; padding:16px 16px 20px; border-bottom-left-radius:0px; border-bottom-right-radius:0px; border-bottom:0px;
  .img-outer{ border-radius: 2px; margin-bottom:21px;
    width:100%; height:246px; overflow:hidden; border: 1px solid #7BF5FB; backdrop-filter: blur(60px);
    img{width:100%; height:100%; object-fit:cover;}
  }
`;

const LeftBottom = styled.div`
  border: 1px solid #7BF5FB; border-radius: 4px; padding:20px 16px 16px; border-top-left-radius:0px; border-top-right-radius:0px;
`;

const CILHeader = styled(FlexDiv)`
  justify-content:space-between; margin-bottom:24px;
`;

const CILTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 21px; line-height: 25px; color: #FFFFFF;
`;

const GreyBadge = styled(FlexDiv)`
  font-style: normal; font-weight: 400; font-size: 17px; line-height: 26px; color: #D7E1E9; background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(60px); border-radius: 69px; padding: 0px 8px;
`;

const OtherDetail = styled(FlexDiv)`
  justify-content:space-between; 
`;

const ODLeft = styled(FlexDiv)`
  .img-outer{ border-radius: 2px; width:40px; height:40px; overflow:hidden; border:none; margin-right:8px; margin-bottom:0px; 
    img{width:100%; height:100%; object-fit:cover; }
  }
`;

const PName = styled.div`
  font-style: normal; font-weight: 500; font-size: 14px; line-height: 18px; color: #FFFFFF; opacity: 0.8; margin:0px 0px 3px;
  &.ver2{font-size: 15px; line-height: 19px;}
  &.ver3{margin:0px; display:inline-block;}
`;

const PDetail = styled.div`
  font-style: normal; font-weight: 700; font-size: 16px; line-height: 19px; color: #FFFFFF;
`;

const ODRight = styled.div`
  text-align:right;
  &.text-left{text-align:left;}
`;

const SValue = styled.div`
  font-style: normal; font-weight: 600; font-size: 18px; line-height: 23px; color: #FFFFFF;
`;

const EditBtn = styled.button`
  background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%); border:none; padding:15px; font-family: 'Rajdhani', sans-serif; letter-spacing:0.5px; 
  transition: all .4s ease-in-out; border-radius: 4px; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB;
  :hover{opacity:0.9;}
`;

const LeftTop = styled.div`
  position:relative;
`;

const Timer = styled(FlexDiv)`
  background: rgba(0, 0, 0, 0.2); border: 1px solid #7BF5FB; backdrop-filter: blur(30px); border-radius: 40px; position:absolute; top:auto; bottom:16px; left: 0px;
  right: 0px; width: max-content; margin: 0 auto; padding:3px 10px 1px;
  img{margin-right:8px;}
  p{font-style: normal; font-weight: 600; font-size: 16px; line-height: 20px; margin:0px; color: #7BF5FB;}
`;

export default Profile;