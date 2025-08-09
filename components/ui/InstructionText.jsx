import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const InstructionText = ({ children }) => {
  return <Text style={styles.instructionText}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "open-sans",
    color: Colors.accent500,
    textAlign: "center",
  },
});
