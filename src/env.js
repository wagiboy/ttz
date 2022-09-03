/**
 * These enviroment variable should have been defined in .env but I can't fix these webpack < 5 error 
 * for CLI 2 use module.exports
 * for CLI 3 use .env file and VUE_APP_ access
 **/
module.exports = {
 /* ------------------------------------------------------------------------
  * Signing up with quicknode.com gives us one free endpoint 
  * plus 100k tx a day. This endpoint is a vitural ethereum node.
  * I've pointed this endpoint to Polygon's Mumbai test network
  * Alchemy also offers such an endpoint */
  httpProvider:   "https://still-newest-seed.matic-testnet.discover.quiknode.pro/d39765b7e8ba3931078b731aa8029cadb07d9d3f/",

  // reading real-time events necessitates web sockets
  wssProvider: "wss://still-newest-seed.matic-testnet.discover.quiknode.pro/d39765b7e8ba3931078b731aa8029cadb07d9d3f/",

  // the address of the smart contract to instantiate
  contractAddress: '0xcc509d852f84c9a95a74a18117636d09837dff34',
  // old           '0xFd3980b0d55c186d8f13CE88f107E5B3BE4D444c',
  
  // the address transactions will be made from and paid for
  walletAddress:  '0xb842ffb5196a0ee01546478e1a993a3e16e0445d',
  
  // private key of wallet to sign transactions
  privateKey:     "ff429ecf3117400e06314526eaba4de9bf37fd325e3c26f9d531291fc8f057ba",
}

/**
 * 2nd wallet address - 0xe83Bc36AB088eE9DEBf0EdC358836013D1cfa18c
 * 3rd wallet address - 0xCB45ad9D8fC670b94A93504Deb0Dc00C25ec370a
 * 4th wallet address - 0x265277924d0D424CEbd6b9522f3D9c68F40D7864
 */