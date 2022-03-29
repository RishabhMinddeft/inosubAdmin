import React, { useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';

const CompleteListing = () => {
  return (
    <>
      <ModalContentOuter>
        <CDTitle>Complete Your Listing</CDTitle>
        <CustomCheckBox>
          <label class="container">
            <input type="checkbox" />
            <p>Initalize your wallet</p>
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <input type="checkbox" />
            <p>Approve this item for sale</p>
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <input type="checkbox" />
            <p>Confirm Launching</p>
            <span class="checkmark"></span>
          </label>
        </CustomCheckBox>
      </ModalContentOuter>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const ModalContentOuter = styled(FlexDiv)``;

const CDTitle = styled.div`
  font-style: normal; font-weight: 700; font-size: 24px; line-height: 29px; text-align: center; color: #FFFFFF; padding:26px 15px; border-bottom:1px solid #7BF5FB; width:100%;
`;

const CustomCheckBox = styled.div`
  padding:24px; width:100%;
  .container {
    display: block; position: relative; padding:23px 24px; margin-bottom: 24px;
    cursor: pointer; background: rgba(54, 57, 79, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box; border-radius: 2px; min-height:77px;
    p{margin:0px; opacity: 0.7; font-family: 'Adrianna Sb'; font-style: normal; font-weight: 600; font-size: 19px; line-height: 27px; color: #FFFFFF; letter-spacing:0.5px;}
    :last-child{margin-bottom:0px;}
  }
  .container input {
    position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0;
  }
  .checkmark {
    position: absolute; top: 23px; left: auto; right:24px; height: 30px; width: 30px; border-radius:50%; background: rgba(255, 255, 255, 0.5)
  }
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .container input:checked ~ .checkmark {
    background-color: #6BFCFC;
  }
  .container input:checked + p{
    opacity:1;
  }
  .checkmark:after {
    content: ""; position: absolute; display: block;
  }
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  .container .checkmark:after {
    left: 11px; top: 7px; width: 5px; height: 11px; border: solid #13141e; border-width: 0 3px 3px 0; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg);
  }
`;

export default CompleteListing;
