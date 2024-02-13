import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [luku, setLuku] = useState('');
  const [valuutat, setValuutat] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [summa, setSumma] = useState('');

  useEffect(() => {
    getLatest();
  }, [])

  const getLatest = () => {
    fetch('https://api.apilayer.com/exchangerates_data/latest', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.EXPO_PUBLIC_API_KEY
      }
    })
    .then(response => response.json())
    .then(data => setValuutat(Object.keys(data.rates)))
    .catch(error => {
      Alert.alert('Error', error.message)
    })
    
  }

  const getRate = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${luku}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.EXPO_PUBLIC_API_KEY
      }
    })
    .then(response => response.json())
    .then(data => {
      setSumma(data.result)
    })
    .catch(error => {
      Alert.alert('Error', error.message)
    })
  }

  const notEmpty = () => {
    if(summa !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <View style={{margin: 5}}>
        {notEmpty()? <Text>{summa.toFixed(2)}€</Text> : ''}
        <TextInput style={styles.input}
          inputMode='numeric'
          onChangeText={data => setLuku(data)}
        />
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
        >
          {valuutat.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Button 
        title="search"
        onPress={() => getRate()}
        />
      </View>
      <StatusBar style="auto" />
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
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
    margin: 5
  },
});
