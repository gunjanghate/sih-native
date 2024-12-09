import { Tabs } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { TouchableOpacity } from 'react-native'; 
import { auth } from '../../config/FirebaseConfig'; 
import { useRouter } from 'expo-router';
export default function TabsLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  
  const handleLogout = () => {
    console.log("Attempting to log out..."); // Log to confirm the logout attempt
    auth.signOut().then(() => {
      console.log('User logged out successfully');
      router.replace("/(auth)/LoginScreen");
      console.log("Navigating to LoginScreen..."); // Log to check if routing is happening
    }).catch((error) => {
      console.error("Logout error:", error); // Log error if logout fails
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
