import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../theme/globalStyles';
import Media from '../theme/media-breackpoint';

const ChooseDate = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <ModalContentOuter>
        <CDTitle>Select the duration</CDTitle>
        <CustomCalender>
          <Calendar onChange={onChange} value={value} selectRange="true" />
        </CustomCalender>
        <ButtonOuterList>
          <CancelBtn>Cancel</CancelBtn>
          <SelectBtn>Select</SelectBtn>
        </ButtonOuterList>
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

const ButtonOuterList = styled(FlexDiv)`
  margin-bottom:34px;
  ${Media.xs} {
    display:block; width:100%; text-align: center;
  }
`;

const CancelBtn = styled.button`
  background:none; border: 1px solid #6BFCFC; box-sizing: border-box; border-radius: 4px; font-family: 'Rajdhani', sans-serif; padding:14px 35px; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB;
  :hover{opacity:0.8;}
  ${Media.xs} {
    padding:14px; width:90%; margin:0px auto 10px;
  }
`;

const SelectBtn = styled.button`
  font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB; background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%);
  border-radius: 4px; padding:15px 79px; border:none; transition: all .4s ease-in-out; margin-left:15px;
  :hover{opacity:0.9;}
  ${Media.xs} {
    padding:14px; width:90%; margin:0px auto 10px;
  }
`;

const CustomCalender = styled.div`
  padding:23px 30px 15px 30px;
  ${Media.xs} {
    padding:23px 15px 15px 15px;
  }
  .react-calendar__navigation{display: flex; justify-content: space-between; margin-bottom:20px;
    .react-calendar__navigation__prev2-button, .react-calendar__navigation__next2-button{display:none;}
    button{border:none; background:none; color:#6BFCFC; font-size:24px;
        .react-calendar__navigation__label__labelText {font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF;}
    }
  }
  .react-calendar__viewContainer{
    .react-calendar__month-view__weekdays{ margin-bottom:10px;
      .react-calendar__month-view__weekdays__weekday{ text-align:center; font-weight: 700; font-size: 16px; line-height: 20px; color: #6BFCFC;
        abbr{text-decoration:none;}
      }
    }
    .react-calendar__month-view__days{
      button.react-calendar__tile{
          font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; line-height: 20px; color: #FFFFFF; background:none; border:none; padding: 0px; height: 30px; margin:8px 0px; border-radius:50%;
          &.react-calendar__tile--active{background: linear-gradient(180deg, #343FA1 0%, #6350BB 100%); color:#6BFCFC; 
              &.react-calendar__tile--range{border-radius:0px;
                  &.react-calendar__tile--rangeStart{border-top-left-radius:50px; border-bottom-left-radius:50px;}
                  &.react-calendar__tile--rangeEnd{border-top-right-radius:50px; border-bottom-right-radius:50px;}
              }
          }
          &.react-calendar__month-view__days__day--neighboringMonth{opacity:0.5;}
      }
    }
  }
`;

export default ChooseDate;
