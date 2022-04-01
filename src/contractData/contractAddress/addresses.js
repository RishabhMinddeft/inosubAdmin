import { services } from '../../services';
let networkId = 56;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();
function getContractAddresses() {
  if (networkId === '0x61' || +networkId === 97)
    return {
      nft:'0xA540C4dF8746d29034aA1502fB8be5c66168153B',
      marketPlace:'0xF4cd6f67a53bd2FEd328BF3385Cbbb98716E768c'
      
    };
  else if (+networkId === 56 || networkId === '0x38')
    return {
      nft:'0xA540C4dF8746d29034aA1502fB8be5c66168153B',
      marketPlace:'0xF4cd6f67a53bd2FEd328BF3385Cbbb98716E768c'
    };
  else
    return {
      nft:'0xA540C4dF8746d29034aA1502fB8be5c66168153B',
      marketPlace:'0xF4cd6f67a53bd2FEd328BF3385Cbbb98716E768c'
    };
}
export default getContractAddresses;
