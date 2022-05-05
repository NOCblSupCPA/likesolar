import React from "react";
import { View, 
  Text, 
  Button, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TextInput, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";

export default function Solar() {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {

  },
});
