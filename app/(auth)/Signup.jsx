import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { auth } from "../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase sign-up method
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage for storing user status
import { useRouter } from "expo-router"; // Router to navigate after sign-up

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Router hook for redirection

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Firebase sign-up
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log("Registered with:", user.email);

      // After successful sign-up, save user status in AsyncStorage
      await AsyncStorage.setItem("userSignedUp", "true");

      // Redirect to the ParkingList page after successful sign-up
      router.push("/(tabs)/ParkingList");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else {
        alert(error.message);
      }
    }
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
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SignUp;
