import {React,useEffect, useState} from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";

const ParkingMap = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
  // Destructure latitude and longitude from route.params
  // const { latitude = 21.1458, longitude = 79.0882 } = route.params || {};
  const { latitude = 21.1458, longitude = 79.0882 } = location?.coords || {};
  console.log("Latitude:", latitude, "Longitude:", longitude);
  // Parking spots near Nagpur (mock data)
  const parkingSpots = [
    { id: 1, latitude: 21.1458, longitude: 79.0882, title: "Spot 1", slots: 5 },
    { id: 2, latitude: 21.1500, longitude: 79.0895, title: "Spot 2", slots: 3 },
  ];

  // Dynamically set initial region using latitude and longitude, fall back to default
  const initialRegion = {
    latitude: latitude || 21.1458,
    longitude: longitude || 79.0882,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true} // Show user's location on the map
        followUserLocation={true} // Automatically follow user's location
      >
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            title={spot.title}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{spot.title}</Text>
                <Text>{`Available slots: ${spot.slots}`}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        <Marker coordinate={{ latitude, longitude }}>
          <Callout>
            <View style={styles.calloutContainer}>
              <Text>This is user location</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  calloutContainer: {
    padding: 10,
    minWidth: 150,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ParkingMap;
