import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [luku, setLuku] = useState('');
  const [arvaus, setArvaus] = useState('');
  const [print, setPrint] = useState('');
  const [count, setCount] = useState(0);

  const prepareLuku = () => {
    setLuku(Math.floor(Math.random() * 100) + 1)
    setPrint('Guess a number between 1-100');
    setCount(0);
  }

  const handleChange = (value) => {
    setArvaus(value);
  }

  const handleGuess = () => {
    if(parseInt(luku) > parseInt(arvaus)) {
      setPrint(`Your guess ${arvaus} is too low`);
      setCount(parseInt(count) + 1);
    }
    else if(parseInt(luku) < parseInt(arvaus)) {
      setPrint(`Your guess ${arvaus} is too high`);
      setCount(parseInt(count) + 1);
    }
    else {
      Alert.alert(`You guessed the number in ${count + 1} guesses`);
      prepareLuku();
    }
  }

  useEffect(() => {
    prepareLuku();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>{print}</Text>
      <TextInput style={styles.input}
        inputMode="numeric"
        onChangeText={(value) => handleChange(value)}
      />
      <Button
      title="Make guess"
      onPress={() => handleGuess()}
      />
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
    margin: 20
  }
});
