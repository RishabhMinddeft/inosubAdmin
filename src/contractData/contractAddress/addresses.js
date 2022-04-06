import { services } from '../../services';
let networkId = 56;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();
function getContractAddresses() {
  if (networkId === '0x61' || +networkId === 97)
    return {
      nft:'0xe224ceA39700e62Dda8686cc3F01c65A68a8f5DA',
      marketPlace:'0x500eC085e3016362D18bf981449773a141919eB5'
    };
  else if (+networkId === 56 || networkId === '0x38')
    return {
      nft:'0xe224ceA39700e62Dda8686cc3F01c65A68a8f5DA',
      marketPlace:'0x500eC085e3016362D18bf981449773a141919eB5'
    };
  else
    return {
      nft:'0xe224ceA39700e62Dda8686cc3F01c65A68a8f5DA',
      marketPlace:'0x500eC085e3016362D18bf981449773a141919eB5'
    };
}
export default getContractAddresses;
