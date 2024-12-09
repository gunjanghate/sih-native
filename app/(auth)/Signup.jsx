import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase sign-up method

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already in use.");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 20, // Optional: padding for spacing
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%", // Ensure inputs take up the full width
    maxWidth: 350, // Optional: maximum width for inputs (you can adjust this)
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: 350, // Optional: maximum width for the button
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SignUp;
