import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userStatus = await AsyncStorage.getItem("userSignedUp");
        console.log("User status retrieved:", userStatus); // Log retrieved status
        if (userStatus === "true") {
          console.log("Redirecting to ParkingList...");
          router.push("/(tabs)/ParkingList");
        }
      } catch (error) {
        console.error("Error checking user status", error);
      }
    };
  
    checkUserStatus();
  }, []);
  //   // Check if the user is already signed up
  //   const checkUserStatus = async () => {
  //     try {
  //       const userStatus = await AsyncStorage.getItem("userSignedUp");
  //       console.log("User status:", userStatus); // Debug log
  //       if (userStatus === "true") {
  //         // Redirect to ParkingList if the user is signed up
  //         router.push("/(tabs)/ParkingList");
  //       }
  //     } catch (error) {
  //       console.error("Error checking user status", error);
  //       Alert.alert("Error", "Unable to verify user status.");
  //     }
  //   };

  //   checkUserStatus();
  // }, []);
  // useEffect(() => {
  //   const initializeStorage = async () => {
  //     try {
  //       await AsyncStorage.setItem("userSignedUp", "true"); // Set the value
  //       console.log("User status set to true");
  //     } catch (error) {
  //       console.error("Error setting user status", error);
  //     }
  //   };
  
  //   initializeStorage();
  // }, []);
  // const checkStorage = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("userSignedUp");
  //     console.log("Retrieved user status:", value);
  //   } catch (error) {
  //     console.error("Error retrieving user status", error);
  //   }
  // };
  
  // useEffect(() => {
  //   checkStorage();
  // }, []);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
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
        <Text style={styles.description}>
          Discover nearby parking, save time, and park smartly.
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            setTimeout(() => {
              router.push("/(auth)/Signin");
            }, 500);
          }}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 ParkSmart ~ All rights reserved</Text>
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
