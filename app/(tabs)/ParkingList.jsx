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
} from "react-native";

const ParkingApp = () => {
  const parkingData = [
    {
      id: 1,
      name: "Abdul Parking Boom",
      price: "Rs 30/hr",
      distance: "5 mins",
      spots: "35 spots",
      bikeSpots: "15 spots",
      address: "Lapataganj, Ganj_Ga",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 2,
      name: "Parking Pro",
      price: "Rs 25/hr",
      distance: "3 mins",
      spots: "12 spots",
      bikeSpots: "5 spots",
      address: "Central Park, Metro Area",
      image: "https://via.placeholder.com/300x150",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [trackedParkings, setTrackedParkings] = useState({});
  const [intervalIds, setIntervalIds] = useState({});

  // Function to handle card click
  const handleCardClick = (item) => {
    if (trackedParkings[item.id]) {
      Alert.alert("Already Tracked", "This parking lot is already being tracked!");
    } else {
      setSelectedParking(item);
      setModalVisible(true);
    }
  };

  // Function to start tracking
  const startTracking = () => {
    setTrackedParkings((prev) => ({ ...prev, [selectedParking.id]: true }));
    setModalVisible(false);

    // Notification every 30 seconds
    const intervalId = setInterval(() => {
      Alert.alert(
        "Parking Update",
        `Remaining spots: Cars: ${selectedParking.spots}, Bikes: ${selectedParking.bikeSpots}`
      );
    }, 30000);

    // Store interval ID to stop tracking later
    setIntervalIds((prev) => ({ ...prev, [selectedParking.id]: intervalId }));
  };

  // Cleanup intervals when component unmounts
  useEffect(() => {
    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [intervalIds]);

  const renderParkingCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardClick(item)} activeOpacity={0.9}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.price}</Text>
          <View style={styles.cardDetails}>
            <Text style={styles.cardDetailText}>{item.distance}</Text>
            <Text style={styles.cardDetailText}>{item.spots}</Text>
          </View>
          <Text style={styles.cardAddress}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View All Parking Locations</Text>
        <Text style={styles.headerAddress}>Address: undefined, Nagpur, 440013</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by Parking name"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort By</Text>
        </TouchableOpacity>
      </View>

      {/* Parking List */}
      <Text style={styles.listTitle}>Parkings Available Near You!</Text>
      <FlatList
        data={parkingData}
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
              <Text style={styles.modalTitle}>
                Do you want to track this parking?
              </Text>
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
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
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
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
