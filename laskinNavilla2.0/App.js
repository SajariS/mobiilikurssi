import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Laskin from './Laskin';
import Historia from './Historia';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Laskin" component={Laskin} />
        <Stack.Screen name="Historia" component={Historia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
