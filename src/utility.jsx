
const getCompactAddress = (address) => {
    let compactAddress = address
      ? address.substring(0, 5) +
      '....' +
      address.substring(address.length - 5, address.length)
      : '00000000000'
    return compactAddress;
}


export default {
    getCompactAddress,
}