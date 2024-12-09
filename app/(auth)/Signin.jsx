import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { auth } from "../../config/FirebaseConfig"; // Firebase auth config
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase sign-in method
import { useRouter } from "expo-router"; // Import useRouter from expo-router

const SignIn = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const router = useRouter(); // Hook to get router from expo-router

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        router.replace("/(tabs)/ParkingList"); // Replace navigation to the home screen on successful login
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password.");
        } else {
          alert("Invalid credentials. Please check your email and password.");
        }
      });
  };

  const handleSignUp = () => {
    router.push("/(auth)/Signup"); // Navigate to the SignUp screen
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.signUpButton]}>
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 20, // Optional: padding for extra space
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%", // Ensure inputs take up full width
    maxWidth: 350, // Optional: maximum width for inputs
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: 350, // Optional: maximum width for button
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#34C759", // You can adjust the color of the sign-up button here
    marginTop: 10,
  },
});

export default SignIn;
