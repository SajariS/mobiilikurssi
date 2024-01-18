import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [summa, setSumma] = useState('');
  const [input, setInput] = useState({luku1: '', luku2: ''});

  const handleChange = (event, name) => {
    setInput({...input, [name]: [event]});
  }

  const handlePress = (operator) => {
    if(operator === '+') {
      setSumma(parseInt(input.luku1) + parseInt(input.luku2));
    }
    else {
      setSumma(parseInt(input.luku1) - parseInt(input.luku2));
    }
  }
  

  return (
    <View style={styles.container}>
      <Text>Result: {summa}</Text>
      <TextInput style={styles.input}
        inputMode="numeric"
        onChangeText={e => handleChange(e, 'luku1')}
      />
      <TextInput style={styles.input}
        inputMode="numeric"
        onChangeText={e => handleChange(e, 'luku2')}
      />
      <StatusBar style="auto" />
      <Button 
      title="+"
      onPress={() => handlePress('+')}
      />
      <Button 
      title="-"
      onPress={() => handlePress('-')}
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
    borderWidth: 2,
    width: 200
  }
});
