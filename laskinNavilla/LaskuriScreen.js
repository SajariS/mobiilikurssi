import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [summa, setSumma] = useState('');
  const [input, setInput] = useState({luku1: '', luku2: ''});
  const [data, setData] = useState([]);

  const handleChange = (event, name) => {
    setInput({...input, [name]: [event]});
  }

  const handlePress = (operator) => {
    setData([...data, summa]);
    if(operator === '+') {
      setSumma(parseInt(input.luku1) + parseInt(input.luku2));
    }
    else {
      setSumma(parseInt(input.luku1) - parseInt(input.luku2));
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25}}>Result: {summa}</Text>
      <TextInput style={styles.input}
        inputMode="numeric"
        onChangeText={e => handleChange(e, 'luku1')}
      />
      <TextInput style={styles.input}
        inputMode="numeric"
        onChangeText={e => handleChange(e, 'luku2')}
      />
      <StatusBar style="auto" />
      <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between', width: 100 }}>
        <Button 
        title="+"
        onPress={() => handlePress('+')}
        />
        <Button 
        title="-"
        onPress={() => handlePress('-')}
        />
      </View>
      <FlatList style={styles.list}
        data={data}
        renderItem={({item}) => 
          <Text>{item.key}</Text>
        }
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<Text style={{fontSize: 25}}>History: </Text>}
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
    marginTop: 150
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
    margin: 5
  },
  list: {
    width: 150,
    textAlign: 'center'
  }
});
