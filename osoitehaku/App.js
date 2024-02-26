import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Alert, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  const [cordinates, setCordinates] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [marker,setMarker] = useState(false)

  const [text, setText] = useState('');

  const handlePress = () => {
    if(text !== '') {
      getGeocode();
      setMarker(true)
    }
  }

  const getGeocode = () => {
    fetch(`https://geocode.maps.co/search?q=${text.replace(/ /g, '+')}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => setCordinates({...cordinates, 
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
    }))
    .catch(error => {
      Alert.alert('Error', error.message)
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={cordinates}
      >
        {marker && <Marker
          coordinate={{
            latitude: cordinates.latitude,
            longitude: cordinates.longitude
          }}
        />}
      </MapView>
      <TextInput style={styles.input}
        inputMode='text'
        onChangeText={text => setText(text)}
      />
      <Button
        title='search'
        onPress={() => handlePress()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
    margin: 5
  },
});
