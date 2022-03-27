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
  .MainBox{background-color: #13141e;}
  img{ max-width:100%; height:auto;}
  a{text-decoration:none;}
  button:hover{cursor:pointer;}
  button:focus, input:focus, textarea:focus, select:focus, a:focus{outline:none; box-shadow:none;}

  .customOverlay.react-responsive-modal-overlay{background: rgb(19 20 30 / 80%);}
  .customModal.react-responsive-modal-modal{background: linear-gradient(0deg, rgba(26, 35, 42, 0) 40.44%, rgba(123, 245, 251, 0.1) 62.4%), #13151C; border: 1px solid #7BF5FB; border-radius: 2px;
    max-width:403px; width:100%;
  }
  .customModal2.react-responsive-modal-modal{ border: 1px solid #7BF5FB; border-radius: 2px; max-width:403px; width:100%; padding:0px;}
  .customModal3.react-responsive-modal-modal{ max-width:403px; width:100%; background: linear-gradient(180deg, rgba(123, 245, 251, 0.1) 3.68%, rgba(18, 19, 28, 0) 30.75%);
    border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(20px); padding:0px; border-radius: 2px;}
  .customModal4.react-responsive-modal-modal{ max-width:813px; width:100%; background: linear-gradient(180deg, rgba(123, 245, 251, 0.1) 3.68%, rgba(18, 19, 28, 0) 30.75%);
    border: 1px solid #7BF5FB; box-sizing: border-box; backdrop-filter: blur(20px); padding:0px; border-radius: 2px;}
  .customModal .react-responsive-modal-closeButton, .customModal2 .react-responsive-modal-closeButton, .customModal3 .react-responsive-modal-closeButton{right:16px; top:16px;}
`; 

Gs.Container = styled.div`
  margin:0 auto; width: 100%; max-width:1441px;
  ${Media.xl} {
    max-width:1181px;
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