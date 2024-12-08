import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Parking App</Text>
      <Button title="Go to Auth" onPress={() => router.push('/(auth)/LoginScreen')} />
      <Button title="Go to Tabs" onPress={() => router.push('/(tabs)/ParkingList')} />
    </View>
  );
}
//user ek baar signup krne ke baad vo sidha tab parking list mai rediret kare
