
const getCompactAddress = (address) => {
    let compactAddress = address
      ? address.substring(0, 4) +
      '....' +
      address.substring(address.length - 4, address.length)
      : '00000000000'
    return compactAddress;
}

const getCompactProfileAddress = (address) => {
  let compactAddress = address
    ? address.substring(0, 15) +
    '....'
    : '00000000000'
  return compactAddress;
}


const Utility = {
  getCompactAddress,
  getCompactProfileAddress,
}

export default Utility