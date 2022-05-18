const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');
const web3 = require('web3');
// const claimTokens = require('./Address.json');

export const createRootHash = (userArr) => {
  const leaf = userArr.map((claimToken) => call(claimToken));
  const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true });
  console.log(merkleTree);

  const root = merkleTree.getRoot();
  console.log('Root hash is ', '0x' + root.toString('hex'));

  return '0x' + root.toString('hex');
};

const call = (claimToken) => {
  return web3.utils.soliditySha3(
    { type: 'address', value: claimToken.walletAddress },
    { type: 'uint256', value: claimToken.allocation }
  );
};

// export const createAllUserProofs = (userArr, hexProofs) => {
//   const newHexProofs = hexProofs;
//   const leaf = userArr.map((claimToken) => call(claimToken));
//   const merkleTree = new MerkleTree(leaf, keccak256, { sortPairs: true });
//   for (let i = 0; i < userArr.length; i++) {
//     const hexProof = merkleTree.getHexProof(
//       call({
//         walletAddress: userArr[i].walletAddress,
//         eTokens: userArr[i].eTokens,
//       })
//     );
//     if (newHexProofs[i]?.length) {
//       newHexProofs[i].push(hexProof);
//     } else {
//       newHexProofs[i] = [];
//       newHexProofs[i].push(hexProof);
//     }
//   }
//   console.log('updated', newHexProofs);
//   // console.log("hexproof",hexProof);
// };

// const hexProof = merkleTree.getHexProof(
//   call({
//     walletAddress: '0x8c8Ea652DE618a30348dCce6df70C8d2925E6814',
//     eTokens: '30000000000000000000',
//   })
// );
// console.log(hexProof);

// console.log(
//   merkleTree.verify(
//     hexProof,
//     call({
//       walletAddress: '0x8c8Ea652DE618a30348dCce6df70C8d2925E6814',
//       eTokens: '30000000000000000000',
//     }),
//     root
//   )
// );
