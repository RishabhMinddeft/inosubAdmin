import { services } from '../../services';
let networkId = 56;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();

// 7: "0xb97Da845F01dC7d12606985505904bf1948228bA",
// 14: "0x1EE137E5699267A233f2a876AED8ecc77c0A03a4",
// 30: "0xf5A397B7a18e92a21504fBcaBD8be3b0dF462daF",
// 60: "0x9Ec350f83caB91094CcB97082743210Dc194E717",
function getContractAddresses() {
  if (networkId === '0x61' || +networkId === 97)
    return {
      pancakeLP: '0x74fA517715C4ec65EF01d55ad5335f90dce7CC87',
      seedifyToken: '0xd82fE6bf9dCE7EC68a8F455f20f04007cBF845e7',
      7: '0x8597c6c7c0dBa098Fc6B357559d414fA104eb9c0',
      // 7: '0x9a3C8e8402220a228ad1fB99a669f98e79B20ffb',
      14: '0x6CEb5aE2D116f9162af9fEa72E7C5c0F5C3c6AD5',
      30: '0xdF0AD9443994c42698c5d9F5a0C34093Db065320',
      60: '0x76eac6aeBe65eadc7e0d4BbAe17d1e38f1837c3a',
      90: '0x9a3C8e8402220a228ad1fB99a669f98e79B20ffb',
      farmingContract: {
        pancakeSwap: {
          contract: '0x37F27d45dF100020d4B7a036374082Acda683aED',
          lpToken: '0x7593AFc6594Ae138804d55ca29bBCD193A83Ddf7',
        },
        bakerySwap: {
          contract: '0x5b40238E06B2a8bEef5de1C4AD329E52902Eb8BB',
          lpToken: '0xc2Eed0F5a0dc28cfa895084bC0a9B8B8279aE492',
        },
      },
    };
  else if (+networkId === 56 || networkId === '0x38')
    return {
      pancakeLP: '0x74fA517715C4ec65EF01d55ad5335f90dce7CC87',
      seedifyToken: '0x477bc8d23c634c154061869478bce96be6045d12',
      7: '0xb667c499b88AC66899E54e27Ad830d423d9Fba69',
      14: '0x027fC3A49383D0E7Bd6b81ef6C7512aFD7d22a9e',
      30: '0x8900475BF7ed42eFcAcf9AE8CfC24Aa96098f776',
      60: '0x66b8c1f8DE0574e68366E8c4e47d0C8883A6Ad0b',
      90: '0x5745b7E077a76bE7Ba37208ff71d843347441576',
      farmingContract: {
        pancakeSwap: {
          contract: '0x1F10564BAD9367CfF4247A138eBbA9a9aaeb789E',
          lpToken: '0x74fa517715c4ec65ef01d55ad5335f90dce7cc87',
        },
        bakerySwap: {
          contract: '0x1544be2dC66eaE3E91d983c6D27c9CB1CDe74AcF',
          lpToken: '0x782f3f0d2b321D5aB7F15cd1665B95EC479Dcfa5',
        },
      },
      oldFarmingContract: {
        pancakeSwap: {
          contract: '0x7439bCF0B97ecd7f3A11c35Cc2304F01Eaf04fC0',
          lpToken: '0x74fa517715c4ec65ef01d55ad5335f90dce7cc87',
        },
        bakerySwap: {
          contract: '0x1272B728B8964e75786c0f1772033719C0Fa5eAc',
          lpToken: '0x782f3f0d2b321D5aB7F15cd1665B95EC479Dcfa5',
        },
      },
    };
  else
    return {
      pancakeLP: '0x74fA517715C4ec65EF01d55ad5335f90dce7CC87',
      seedifyToken: '0x477bc8d23c634c154061869478bce96be6045d12',
      7: '0xb667c499b88AC66899E54e27Ad830d423d9Fba69',
      14: '0x027fC3A49383D0E7Bd6b81ef6C7512aFD7d22a9e',
      30: '0x8900475BF7ed42eFcAcf9AE8CfC24Aa96098f776',
      60: '0x66b8c1f8DE0574e68366E8c4e47d0C8883A6Ad0b',
      90: '0x5745b7E077a76bE7Ba37208ff71d843347441576',
      farmingContract: {
        pancakeSwap: {
          contract: '0x1F10564BAD9367CfF4247A138eBbA9a9aaeb789E',
          lpToken: '0x74fa517715c4ec65ef01d55ad5335f90dce7cc87',
        },
        bakerySwap: {
          contract: '0x1544be2dC66eaE3E91d983c6D27c9CB1CDe74AcF',
          lpToken: '0x782f3f0d2b321D5aB7F15cd1665B95EC479Dcfa5',
        },
      },
      oldFarmingContract: {
        pancakeSwap: {
          contract: '0x7439bCF0B97ecd7f3A11c35Cc2304F01Eaf04fC0',
          lpToken: '0x74fa517715c4ec65ef01d55ad5335f90dce7cc87',
        },
        bakerySwap: {
          contract: '0x1272B728B8964e75786c0f1772033719C0Fa5eAc',
          lpToken: '0x782f3f0d2b321D5aB7F15cd1665B95EC479Dcfa5',
        },
      },
    };
}
export default getContractAddresses;
