// import { Tabs } from 'expo-router';

// export default function TabsLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen name="ParkingList" options={{ title: 'Parking List' }} />
//       <Tabs.Screen name="ParkingMap" options={{ title: 'Parking Map' }} />
//     </Tabs>
//   );
// }
// import { Tabs } from 'expo-router';
// import { Feather, AntDesign } from '@expo/vector-icons'; // Import icons here
// import Colors from "@/constants/Colors";
// import { useColorScheme } from "@/components/useColorScheme";
// import { useClientOnlyValue } from "@/components/useClientOnlyValue"; // Replace with your color imports

// export default function TabsLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarStyle: {
//           backgroundColor: Colors[colorScheme ?? 'light'].background,
//           position: 'absolute',
//           bottom: 40,
//           justifyContent: 'center',
//           alignSelf: 'center',
//           height: 50,
//           marginHorizontal: 100,
//           paddingHorizontal: 10,
//           paddingVertical: 10,
//           paddingBottom: 8,
//           borderRadius: 40,
//           borderWidth: 1,
//           borderTopWidth: 1,
//           borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
//           borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault,
//         },
//         tabBarShowLabel: false,
//         tabBarInactiveTintColor:
//           colorScheme === 'dark'
//             ? 'gray'
//             : Colors[colorScheme ?? 'light'].tabIconDefault,
//         tabBarActiveTintColor:
//           colorScheme === 'dark'
//             ? 'white'
//             : Colors[colorScheme ?? 'light'].tint,
//         headerStyle: {
//           backgroundColor: Colors[colorScheme ?? 'light'].background,
//         },
//         headerTintColor: Colors[colorScheme ?? 'light'].text,
//         headerShown: false, // Removed the header settings related to drawer
//         tabBarIcon: ({ color, focused }) => {
//           let iconName;
//           if (route.name === 'ParkingList') {
//             iconName = focused ? 'list' : 'list';
//           } else if (route.name === 'ParkingMap') {
//             iconName = focused ? 'user' : 'user';
//           }

//           return <Feather name={iconName} size={15} color={color} />;
//         },
//       })}
//     >
//       <Tabs.Screen
//         name="ParkingList"
//         options={{
//           title: 'ParkingList',
//           headerTitleStyle: {
//             fontSize: 14,
//             fontFamily: 'SpaceMono',
//           },
//           tabBarIcon: ({ color }) => (
//             <Feather
//               name="list"
//               size={15}
//               style={{ marginBottom: -3 }}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="ParkingMap"
//         options={{
//           title: 'ParkingMap',
//           headerTitleStyle: { fontSize: 14, fontFamily: 'SpaceMono' },
//           tabBarIcon: ({ color }) => (
//             <AntDesign
//               size={15}
//               style={{ marginBottom: -3 }}
//               name="user"
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
import { Tabs } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { TouchableOpacity } from 'react-native'; 
import { auth } from '../../config/FirebaseConfig'; 
import { useNavigation } from '@react-navigation/native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User logged out');
      navigation.replace('/(auth)/LoginScreen'); // Ensure path is correct
    }).catch((error) => {
      console.error("Logout error", error);
    });
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          position: 'absolute',
          bottom: 40,
          justifyContent: 'center',
          alignSelf: 'center',
          height: 50,
          marginHorizontal: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 8,
          borderRadius: 40,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor:
          colorScheme === 'dark'
            ? 'gray'
            : Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarActiveTintColor:
          colorScheme === 'dark'
            ? 'white'
            : Colors[colorScheme ?? 'light'].tint,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: true, 
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'ParkingList') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'ParkingMap') {
            iconName = focused ? 'user' : 'user';
          }
          return <Feather name={iconName} size={15} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="ParkingList"
        options={{
          title: 'ParkingList',
          headerTitleStyle: { fontSize: 14, fontFamily: 'SpaceMono' },
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={15} style={{ marginBottom: -3 }} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
              <Feather name="log-out" size={20} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ParkingMap"
        options={{
          title: 'ParkingMap',
          headerTitleStyle: { fontSize: 14, fontFamily: 'SpaceMono' },
          tabBarIcon: ({ color }) => (
            <AntDesign size={15} style={{ marginBottom: -3 }} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
