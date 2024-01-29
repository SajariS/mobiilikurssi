import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (value) => {
    setInput(value);
  }

  const handleAdd = () => {
    setList([...list, {key: input}]);
    setInput('');
  }

  const handleClear = () => {
    setList([]);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        onChangeText={e => handleChange(e)}
        inputMode="text"
        value={input}
      />
      <View style={styles.boxContainer}>
        <Button
        title="Add"
        onPress={() => handleAdd()}
        />
        <Button
        title="Clear"
        onPress={() => handleClear()}
        />
      </View>
      <FlatList style={styles.list}
        data={list}
        renderItem={({item}) => 
          <Text>{item.key}</Text>
        }
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <Text style={{fontSize: 20, color: 'blue'}}>Shopping list:</Text>
        }
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
    marginTop: 100
  },
  list: {
    width: 150,
    textAlign: 'center'
  },
  boxContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    width: 100
  }
});
