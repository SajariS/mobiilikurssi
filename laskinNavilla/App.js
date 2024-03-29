import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import LaskuriScreen from "./LaskuriScreen";
import HistoriaScreen from './HistoriaScreen';

const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Laskuri" component={LaskuriScreen} />
          <Stack.Screen name="Historia" component={HistoriaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
