import { services } from '../../services';
let networkId = 56;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();
function getContractAddresses() {
  if (networkId === '0x61' || +networkId === 97)
    return {
      nft:'0x5D6ab8731de94A1c32081264308B87Cb6fF68609',
      marketPlace:'0x7de22B8C525A21D0D2eb12b6F65500A0Cc084dA8'
    };
  else if (+networkId === 56 || networkId === '0x38')
    return {
      nft:'0x5D6ab8731de94A1c32081264308B87Cb6fF68609',
      marketPlace:'0x7de22B8C525A21D0D2eb12b6F65500A0Cc084dA8'
    };
  else
    return {
      nft:'0x5D6ab8731de94A1c32081264308B87Cb6fF68609',
      marketPlace:'0x7de22B8C525A21D0D2eb12b6F65500A0Cc084dA8'
    };
}
export default getContractAddresses;
