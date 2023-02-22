import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import provider from "./ethers";

const BlockchainData = () => {
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    const getBlockNumber = async () => {
      const currentBlockNumber = await provider.getBlockNumber();
      setBlockNumber(currentBlockNumber);
    };

    getBlockNumber();
  }, []);

  return (
    <View>
      <Text>Current Block Number: {blockNumber}</Text>
    </View>
  );
};

export default BlockchainData;
