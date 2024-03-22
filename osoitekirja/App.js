import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import SQLiteService from './services/SQLiteService';
import Interface from './components/Interface';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    SQLiteService.initialize();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="My Places" component={Interface} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
