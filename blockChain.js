import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Audio } from "expo-av";
import beepSound from "./beep.mp3";
import provider from "./ethers";

const BlockchainData = () => {
  const [blockNumber, setBlockNumber] = useState(null);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(beepSound);
      setSound(sound);
    };
    loadSound();

    provider.on("block", async (blockNumber) => {
      setBlockNumber(blockNumber);
      if (sound) {
        sound.playAsync();
      }
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const blockNumberString = blockNumber
    ? blockNumber.toLocaleString(undefined, { minimumIntegerDigits: 4 })
    : "0000";

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Block Number</Text>
        <View style={styles.card}>
          <Animated.Text style={[styles.blockNumber, animatedStyle]}>
            {blockNumberString}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blockNumber: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BlockchainData;
