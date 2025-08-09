import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

let minBoundary = 1;
let maxBoundary = 100;

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (val) => {
    // Remove any non-numeric characters
    const cleanValue = val.replace(/[^0-9]/g, "");
    setEnteredNumber(cleanValue);
  };

  const resetInputHandler = () => setEnteredNumber("");

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber.trim());

    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      Alert.alert("⚠️ Invalid Number", "Please enter a number between 1 and 99.", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    // Reset game boundaries for a fresh game
    minBoundary = 1;
    maxBoundary = 100;

    Keyboard.dismiss();
    onPickNumber(chosenNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>🎯 Guess My Number</Title>

      <Card>
        <InstructionText style={styles.instructionText}>
          Enter Your Secret Number
        </InstructionText>

        <TextInput
          style={styles.numberInput}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />

        <View style={styles.btnsContainer}>
          <PrimaryButton onPress={resetInputHandler}>🔄 Reset</PrimaryButton>
          <PrimaryButton onPress={confirmInputHandler}>✅ Confirm</PrimaryButton>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  subTitle: {
    fontSize: 16,
    color: Colors.accent500,
    marginTop: 4,
    opacity: 0.8,
  },

  numberInput: {
    width: 70,
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.accent500,
    marginVertical: 10,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 3,
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  },
});
