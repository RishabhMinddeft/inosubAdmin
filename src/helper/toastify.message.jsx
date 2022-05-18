import { toast } from 'react-toastify';
import CheckIcon from '../assets/images/check.png';
import InfoIcon from '../assets/images/info.png';
import ErrorIcon from '../assets/images/error.png';
import ProcessIcon from '../assets/images/process.png';
import styled from 'styled-components';
import '../theme/globalStyles';


const success = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <img src={CheckIcon} alt='' />
            <SABottom>
                <SATitle>Success Message</SATitle>
                <p>{message}</p>
            </SABottom>
        </SAHeader>
    </div>
    return toast.success(toastDiv, {
        // autoClose: 2000,
        closeOnClick: true,
        icon: false
    })
}

// const warning = (message, option) => {
//     return toast.warning(message, option)
// }

const warning = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <img src={InfoIcon} alt='' />
            <SABottom>
                <SATitle>Warning message</SATitle>
                <p>{message}</p>
            </SABottom>
        </SAHeader>
    </div>
    return toast.warning(toastDiv, {
        // autoClose: 2000,
        closeOnClick: true,
        icon: false
    })
}

// const error = (message, option) => {
//     return toast.error(message, option)
// }

const error = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <img src={ErrorIcon} alt='' />
            <SABottom>
                <SATitle>Error message</SATitle>
                <p>{message}</p>
            </SABottom>
        </SAHeader>
    </div>
    return toast.error(toastDiv, {
        // autoClose: 2000,
        closeOnClick: true,
        icon: false
    })
}

// const info = (message, option) => {
//     return toast.info(message, option)
// }

const info = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <img src={InfoIcon} alt='' />
            <SABottom>
                <SATitle>Info message</SATitle>
                <p>{message}</p>
            </SABottom>
        </SAHeader>
    </div>
    return toast.info(toastDiv, {
        // autoClose: 2000,
        closeOnClick: true,
        icon: false
    })
}

// const loading = (message, option) => {
//     return toast.loading(message, option)
// }

const loading = (message, option) => {
    let toastDiv = <div className='custom-toastify'>
        <SAHeader>
            <img src={ProcessIcon} alt='' />
            <SABottom>
                <SATitle>Pending message</SATitle>
                <p>{message}</p>
            </SABottom>
        </SAHeader>
    </div>
    return toast.loading(toastDiv, {
        icon: false
    })
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;

const SAHeader = styled(FlexDiv)`
  justify-content:flex-start; padding:20px;
`;

const SATitle = styled.div`
  margin:0px 0px 2px 0px; font-style: normal; font-weight: 700; font-size: 20px; line-height: 24px; color: #FFFFFF; font-family: 'Rajdhani', sans-serif;
`;

const SABottom = styled.div`
  margin-left:10px; width: calc(100% - 70px);
  p{font-family: 'Rajdhani', sans-serif; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; color: #FFFFFF; margin:0px;}
`;

export const Toast = {
    success,
    loading,
    warning,
    error,
    info
}