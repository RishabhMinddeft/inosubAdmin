
const getCompactAddress = (address) => {
    let compactAddress = address
      ? address.substring(0, 6) +
      '....' +
      address.substring(address.length - 6, address.length)
      : '00000000000'
    return compactAddress;
}


const Utility = {
  getCompactAddress,
}

export default Utility