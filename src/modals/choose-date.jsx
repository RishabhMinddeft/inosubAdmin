import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const ChooseDate = () => {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <ModalContentOuter>
                <CDTitle>Select the duration</CDTitle>
                <CustomCalender>
                    <Calendar onChange={onChange} value={value} selectRange="true" />
                </CustomCalender>
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

const CustomCalender = styled.div`
  padding:23px 30px 34px 30px;
  .react-calendar__navigation{display: flex; justify-content: space-between; margin-bottom:20px;
    .react-calendar__navigation__prev2-button, .react-calendar__navigation__next2-button{display:none;}
    button{border:none; background:none; color:#6BFCFC; font-size:24px;
        .react-calendar__navigation__label__labelText {font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 700; font-size: 20px; line-height: 26px; color: #FFFFFF;}
    }
  }
  .react-calendar__viewContainer{
      .react-calendar__month-view__weekdays__weekday{ text-align:center; font-weight: 700; font-size: 16px; line-height: 20px; color: #6BFCFC;
        abbr{text-decoration:none;}
      }
      .react-calendar__month-view__days{
        button.react-calendar__tile{
            font-weight: 700; font-size: 16px; line-height: 20px; color: #FFFFFF; background:none; border:none; padding: 0px; height: 48.7px; border-radius:50%;
            &.react-calendar__tile--active{background: linear-gradient(263.59deg, #343FA1 0%, #6350BB 100%); color:#6BFCFC;
                &.react-calendar__tile--range{border-radius:0px;
                    &.react-calendar__tile--rangeStart{border-top-left-radius:50px; border-bottom-left-radius:50px;}
                    &.react-calendar__tile--rangeEnd{border-top-right-radius:50px; border-bottom-right-radius:50px;}
                }
            }
        }
      }
  }
`;

export default ChooseDate;
