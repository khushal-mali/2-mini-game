import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver, roundsNumber, setRoundsNumber }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // ✅ Add initial guess once when game starts
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    setRoundsNumber([initialGuess]);
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("⚠️ Don't lie!", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setRoundsNumber((prev) => [...prev, newRndNumber]); // ✅ Add only the new guess
  }

  function renderGuessLogItem(itemData) {
    const roundNumber = roundsNumber.length - itemData.index;
    return (
      <View style={styles.logItem}>
        <Text style={styles.logText}>#{roundNumber}</Text>
        <Text style={styles.logText}>💡Opponent's Guess: {itemData.item}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>🤖 Opponent's Guess</Title>

      <Card>
        <NumberContainer>{currentGuess}</NumberContainer>

        <InstructionText style={styles.subTitle}>
          Is your number higher or lower?
        </InstructionText>

        <View style={styles.controlsContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="add" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={roundsNumber}
          renderItem={renderGuessLogItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, alignItems: "center" },
  subTitle: {
    fontSize: 16,
    color: Colors.accent500,
    marginBottom: 12,
    opacity: 0.8,
  },
  controlsContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "80%",
    gap: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  logItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  logText: {
    color: "white",
    fontSize: 16,
  },
});
