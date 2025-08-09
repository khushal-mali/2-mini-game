import { Image, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      // colors={[Colors.primary700, Colors.primary800]}
      style={styles.rootContainer}
    >
      <Title style={styles.title}>🎉 GAME OVER! 🎉</Title>

      <Animated.View
        style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image style={styles.image} source={require("../assets/images/success.png")} />
      </Animated.View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber.length}</Text>{" "}
          rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", width: "55%" }}>
        <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  imageContainer: {
    marginVertical: 36,
    overflow: "hidden",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: Colors.accent500,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  resultText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
  },
  highlight: {
    color: Colors.accent500,
    fontWeight: "bold",
  },
});
