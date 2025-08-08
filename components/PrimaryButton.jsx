import { StyleSheet, Text, View, Pressable } from "react-native";

const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.btnInnerContainer, styles.pressed] : styles.btnInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "#650535ff" }}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btnOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden",
  },
  btnInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
