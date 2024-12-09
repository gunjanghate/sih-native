import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";

import { Button } from 'react-native';

const { width, height } = Dimensions.get("window");

const ParkingApp = () => {
  const parkingData = [
    {
      id: 1,
      name: "Abdul Parking Boom",
      price: "Rs 30/hr",
      distance: 15,
      spots: 35,
      bikeSpots: 15,
      address: "Lapataganj, Ganj_Ga",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 2,
      name: "Parking Pro",
      price: "Rs 25/hr",
      distance: 3,
      spots: 12,
      bikeSpots: 5,
      address: "Central Park, Metro Area",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 3,
      name: "Parking King",
      price: "Rs 40/hr",
      distance: 8,
      spots: 50,
      bikeSpots: 20,
      address: "Kingdom Park, City",
      image: "https://via.placeholder.com/300x150",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [trackedParkings, setTrackedParkings] = useState({});
  const [intervalIds, setIntervalIds] = useState({});
  const [sortCriteria, setSortCriteria] = useState("distance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request location permissions and fetch location
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status === "denied") {
  //       setErrorMsg("Permission to access location was denied.");
  //       // Show an alert to guide the user to enable permissions manually
  //       Alert.alert(
  //         "Location Permission Denied",
  //         "You can enable location permissions in the app settings.",
  //         [
  //           { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
  //           { text: "Open Settings", onPress: () => openSettings() },
  //         ]
  //       );
  //       return;
  //     }
  
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was not granted.");
  //       return;
  //     }
  
  //     try {
  //       let currentLocation = await Location.getCurrentPositionAsync({});
  //       setLocation(currentLocation);
  
  //       // Console log latitude and longitude here
  //       const { latitude, longitude } = currentLocation.coords;
  //       console.log("Latitude:", latitude);
  //       console.log("Longitude:", longitude);
  //       setErrorMsg("Unable to fetch location");
  //       console.error("Error fetching location:", error);
  //     }catch(e){
  //       setErrorMsg("Unable to fetch location");
  //       console.error("Error fetching location:", e);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      console.log("Started");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission Status:", status); // Add this to see the status value
  
      if (status === "denied") {
        console.log("Not granted");
        setErrorMsg("Permission to access location was denied.");
        Alert.alert(
          "Location Permission Denied",
          "You can enable location permissions in the app settings.",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            { text: "Open Settings", onPress: () => openSettings() },
          ]
        );
        return;
      }
  
      if (status !== "granted") {
        setErrorMsg("Permission to access location was not granted.");
        console.log("Not granted");
        return;
      }
  
      try {
        console.log("Fetching location...");
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("Location fetched:", currentLocation); // Add this to log the location
        setLocation(currentLocation);
      } catch (error) {
        console.log("Error while fetching location:", error); // Add this to log the error
        setErrorMsg("Unable to fetch location");
      }
    })();
  }, []);
  

  // Open settings for the user to manually enable permissions
  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // For iOS
    } else {
      Linking.openSettings(); // For Android
    }
  };


  // Handle card click
  const handleCardClick = (item) => {
    if (trackedParkings[item.id]) {
      Alert.alert("Already Tracked", "This parking lot is already being tracked!");
    } else {
      setSelectedParking(item);
      setModalVisible(true);
    }
  };

  // Start tracking the parking
  const startTracking = () => {
    setTrackedParkings((prev) => ({ ...prev, [selectedParking.id]: true }));
    setModalVisible(false);

    // Start notification every 30 seconds
    const intervalId = setInterval(() => {
      Alert.alert(
        "Parking Update",
        `Remaining spots: Cars: ${selectedParking.spots}, Bikes: ${selectedParking.bikeSpots}`
      );
    }, 30000);

    setIntervalIds((prev) => ({ ...prev, [selectedParking.id]: intervalId }));
  };

  // Stop tracking and notifications
  const stopTracking = (id) => {
    clearInterval(intervalIds[id]);
    setIntervalIds((prev) => {
      const newIntervals = { ...prev };
      delete newIntervals[id]; // Remove the stopped interval
      return newIntervals;
    });
    setTrackedParkings((prev) => {
      const newTracking = { ...prev };
      delete newTracking[id]; // Stop tracking this parking
      return newTracking;
    });
  };

  // Sorting the parking data
  const sortedParkingData = [...parkingData].sort((a, b) => {
    switch (sortCriteria) {
      case "distance":
        return a.distance - b.distance;
      case "price":
        const priceA = parseInt(a.price.replace("Rs ", "").replace("/hr", ""));
        const priceB = parseInt(b.price.replace("Rs ", "").replace("/hr", ""));
        return priceA - priceB;
      case "carSpots":
        return a.spots - b.spots;
      case "bikeSpots":
        return a.bikeSpots - b.bikeSpots;
      default:
        return 0;
    }
  });

  const renderParkingCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => handleCardClick(item)}
        activeOpacity={0.8}
        style={styles.card}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.price}</Text>
          <View style={styles.cardDetails}>
            <Text style={styles.cardDetailText}>{item.distance} mins</Text>
            <Text style={styles.cardDetailText}>{item.spots} car spots</Text>
          </View>
          <Text style={styles.cardAddress}>{item.address}</Text>
        </View>
      </TouchableOpacity>

      {/* Show stop notification button if the parking is being tracked */}
      {trackedParkings[item.id] && (
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => stopTracking(item.id)}
        >
          <Text style={styles.stopButtonText}>Stop Notifications</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View All Parking Locations</Text>
        <Text style={styles.headerAddress}>Address: undefined, Nagpur, 440013</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search by Parking name" style={styles.searchInput} />
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortDropdown(!showSortDropdown)}
        >
          <Text style={styles.sortButtonText}>Sort By</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Dropdown */}
      {showSortDropdown && (
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={sortCriteria}
            style={styles.dropdown}
            onValueChange={(itemValue) => setSortCriteria(itemValue)}
          >
            <Picker.Item label="Distance" value="distance" />
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Car Spots" value="carSpots" />
            <Picker.Item label="Bike Spots" value="bikeSpots" />
          </Picker>
        </View>
      )}

      {/* Parking List */}
      <Text style={styles.listTitle}>Parkings Available Near You!</Text>
      <FlatList
        data={sortedParkingData}
        renderItem={renderParkingCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal */}
      {selectedParking && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Do you want to track this parking?</Text>
              <Text style={styles.modalText}>{selectedParking.name}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalYesButton]}
                  onPress={startTracking}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalNoButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  headerAddress: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sortButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sortButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  dropdown: {
    height: 40,
    width: "100%",
    color: "#333",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    position: "relative",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#6C63FF",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  cardDetailText: {
    fontSize: 14,
    color: "#777",
  },
  cardAddress: {
    fontSize: 12,
    color: "#999",
  },
  stopButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stopButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalYesButton: {
    backgroundColor: "#6C63FF",
  },
  modalNoButton: {
    backgroundColor: "#999",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ParkingApp;
