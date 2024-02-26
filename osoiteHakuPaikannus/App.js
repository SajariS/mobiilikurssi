import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Alert, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  const [location, setLocation] = useState(null);

  const [cordinates, setCordinates] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [marker,setMarker] = useState(false)
  const [render, setRender] = useState(false)
  const [text, setText] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permissions to get location')
      return;
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High});
    setLocation(location)
    setRender(true)
  }

  const handlePress = () => {
    if(text !== '') {
      getGeocode();
    }
  }

  const getGeocode = () => {
    fetch(`https://geocode.maps.co/search?q=${text.replace(/ /g, '+')}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => { setCordinates({...cordinates, 
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)});
      setMarker(true);
      }
    )
    .catch(error => {
      Alert.alert('Error', error.message)
    })
  }

  return (
    <View style={styles.container}>
      {render && <>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }}
          region={cordinates}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            pinColor='green'
            title='You are here'
          />
          {marker && <Marker
            coordinate={{
              latitude: cordinates.latitude,
              longitude: cordinates.longitude
            }}
          /> }
        </MapView>
        <TextInput style={styles.input}
          inputMode='text'
          onChangeText={text => setText(text)}
        />
        <Button
          title='search'
          onPress={() => handlePress()}
        /> 
      </>}
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
