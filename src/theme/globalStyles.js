import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';  
import Media from '../theme/media-breackpoint';

var Gs = {}
 
Gs.GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    background-color: #13151C;
    color: #fff; 
    font-family: 'Rajdhani', sans-serif;
  }
  .MainBox{background-color: #13151C;}
  img{ max-width:100%; height:auto;}
  a{text-decoration:none;}
  button:hover{cursor:pointer;}
  button:focus, input:focus, textarea:focus, select:focus{outline:none; box-shadow:none;}

`; 

Gs.Container = styled.div`
  margin:0 auto; width: 100%; max-width:1441px;
  ${Media.xl} {
    max-width:1276px;
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