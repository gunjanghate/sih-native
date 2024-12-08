// import { useRouter } from 'expo-router';
// import { View, Text, Button } from 'react-native';

// export default function Index() {
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Welcome to Parking App</Text>
//       <Button title="Get Started" onPress={() => router.push('/(auth)/LoginScreen')} />
//       {/* <Button title="Go to Tabs" onPress={() => router.push('/(tabs)/ParkingList')} /> */}
//     </View>
//   );
// }
// //user ek baar signup krne ke baad vo sidha tab parking list mai rediret kare
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
          <Text style={styles.title}>Park-N-Go</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine}></View>
            <View style={styles.menuLine}></View>
            <View style={styles.menuLine}></View>
          </View>
        </TouchableOpacity>
        {menuOpen && (
          <View style={styles.menuDropdown}>
            <Text style={styles.menuItem}>Admin Controls</Text>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* <Image
          source={require("../assets/test.png")}
          style={styles.illustration}
        />
        <Image
          source={require("../assets/CarTest.gif")}
          style={styles.carAnimation}
        /> */}
        <Text style={styles.description}>
          Discover nearby parkings, save time, and park smartly.
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            setTimeout(() => {
              router.push("/(auth)/LoginScreen");
            }, 500);
          }}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 ParkSmart ~ All rights reserved
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  menuIcon: {
    justifyContent: "space-between",
    height: 20,
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: "#fff",
    marginBottom: 3,
  },
  menuDropdown: {
    position: "absolute",
    top: 60,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuItem: {
    color: "#000",
    fontSize: 16,
    padding: 5,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  illustration: {
    width: "80%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  carAnimation: {
    width: "70%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});
