import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';  
import Media from '../theme/media-breackpoint';

var Gs = {}
 
Gs.GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    background-color: #13141e;
    color: #fff; 
    font-family: 'Rajdhani', sans-serif;
  }
  .MainBox{background-color: #13141e; position:relative;}
  img{ max-width:100%; height:auto;}
  a{text-decoration:none;}
  button:hover{cursor:pointer;}
  button:focus, input:focus, textarea:focus, select:focus, a:focus{outline:none; box-shadow:none;}

  .customOverlay.react-responsive-modal-overlay{background: rgb(19 20 30 / 80%);}
  .customModal.react-responsive-modal-modal{background: linear-gradient(0deg, rgba(26, 35, 42, 0) 40.44%, rgba(123, 245, 251, 0.1) 62.4%), #13151C; border: 1px solid #7BF5FB; border-radius: 2px;
    max-width:403px; width:100%;
    ${Media.xs} {
      max-width:fit-content;
    }
  }
  .customModal2.react-responsive-modal-modal{ border: 1px solid #7BF5FB; border-radius: 2px; max-width:403px; width:100%; padding:0px;
    ${Media.xs} {
      max-width:fit-content;
    }
  }
  .customModal3.react-responsive-modal-modal{ max-width:403px; width:100%; background: linear-gradient(180deg, rgba(123, 245, 251, 0.1) 3.68%, rgba(18, 19, 28, 0) 30.75%);
    border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(20px); padding:0px; border-radius: 2px;
    ${Media.xs} {
      max-width:fit-content;
    }
  }
  .customModal4.react-responsive-modal-modal{ max-width:813px; width:100%; background: linear-gradient(180deg, rgba(123, 245, 251, 0.1) 3.68%, rgba(18, 19, 28, 0) 30.75%);
    border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(20px); padding:0px; border-radius: 2px;
    ${Media.md} {
      max-width:fit-content;
    }
  }
  .customModal .react-responsive-modal-closeButton, .customModal2 .react-responsive-modal-closeButton, .customModal3 .react-responsive-modal-closeButton{right:16px; top:16px;}

  .TT-design{font-style: normal !important; font-weight: 500 !important; font-size: 14px !important; line-height: 21px !important; color: #6BFCFC !important; background: rgba(54, 57, 79, 0.5) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important; backdrop-filter: blur(20px); border-radius: 2px; min-width:214px;} 
  .TT-design:before{border-top: 8px solid rgba(255, 255, 255, 0.15) !important;}
  .TT-design:after{border-top-color:rgba(54, 57, 79, 1) !important;}
  .TT-design .lc-outer{ display:flex; align-items:center; justify-content:space-between; }
  .TT-design .lc-outer svg{font-size:16px;}

  .Toastify__toast{background: linear-gradient(180deg, rgba(26, 35, 42, 0) -7.56%, rgba(123, 245, 251, 0.1) 62.4%), #13151C !important; border-radius: 2px; max-width:350px; padding:0px;}
  .Toastify__toast-body{padding:0px; }
  .Toastify__close-button {position:absolute; top:16px; right:16px; opacity:1;}
  .Toastify__close-button svg{ height: 21px; width: 19px;}
  .Toastify__toast--success .Toastify__close-button svg{color:#7BF5FB;}
  .Toastify__progress-bar{display:none;}
  .Toastify__toast--success{ border: 1px solid #7BF5FB;}
`; 

Gs.Container = styled.div`
  margin:0 auto; width: 100%; max-width:1441px;
  ${Media.xl} {
    max-width:1180px;
  }
  ${Media.lg} {
    max-width:1170px;
  }
  ${Media.md2} {
    max-width:961px;
  }
  ${Media.md} {
    max-width:737px;
  }
  ${Media.sm} {
    max-width: -webkit-fill-available;
    margin: 0px 15px;
  }
`;
 
export default Gs; 