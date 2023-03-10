// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";

import Constants from "expo-constants";

const wssUrl = Constants.expoConfig.extra.wssUrl;
const rpcUrl = Constants.expoConfig.extra.rpcUrl;

//const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const provider = new ethers.providers.WebSocketProvider(wssUrl);
export default provider;
