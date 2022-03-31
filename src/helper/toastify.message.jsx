import { toast } from 'react-toastify';
import CheckIcon from '../assets/images/check.png';
import styled from 'styled-components';
import '../theme/globalStyles';


const success = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <div className='s-left'>
                <img src={CheckIcon} alt='' />
                <SATitle>Success Message</SATitle>
            </div>
        </SAHeader>
        <SABottom>
            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> */}
            <p>{message}</p>
        </SABottom>
    </div>
    return toast.success(toastDiv, {
        icon: false
    })
}

const warning = (message, option) => {
    return toast.warning(message, option)
}

const error = (message, option) => {
    return toast.error(message, option)
}

const info = (message, option) => {
    return toast.info(message, option)
}

const loading = (message, option) => {
    return toast.loading(message, option)
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const SAHeader = styled(FlexDiv)`
  justify-content:space-between; padding:16px 16px 16px 20px; border-bottom:1px solid #7BF5FB; 
  .s-left{display:flex; align-items:center;}
  svg{color: #7BF5FB; font-size:26px; cursor:pointer;}
`;

const SATitle = styled.div`
  margin:0px 0px 0px 10px; font-style: normal; font-weight: 700; font-size: 18px; line-height: 22px; color: #FFFFFF; font-family: 'Rajdhani', sans-serif;
`;

const SABottom = styled.div`
  padding:20px;
  p{font-family: 'Adrianna Rg'; font-style: normal; font-weight: 400; font-size: 14px; line-height: 26px; color: #FFFFFF; margin:0px;}
`;

export const Toast = {
    success,
    loading,
    warning,
    error,
    info
}