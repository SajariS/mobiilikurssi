import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function App() {

  const [input, setInput] = useState('');

  const handleSpeech = () => {
    if(input !== '') {
      Speech.speak(input);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setInput(input)}
        inputMode='text'
        value={input}
      />
      <Button
        onPress={() => handleSpeech()}
        title='press to hear text'
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
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
    margin: 5,
    marginTop: 20
  },
});
