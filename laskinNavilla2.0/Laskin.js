import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function Laskin({ navigation }) {
    const [summa, setSumma] = useState('');
    const [input, setInput] = useState({luku1: '', luku2: ''});
    const [data, setData] = useState([]);
  
    const handleChange = (event, name) => {
      setInput({...input, [name]: [event]});
    }
  
    const handlePress = (operator) => {
      setData([...data, {key: data.length + 1, text: summa}]);
      if(operator === '+') {
        const result = parseInt(input.luku1) + parseInt(input.luku2)
        setSumma(result);
        setData([...data, {key: data.length + 1, text: `${input.luku1} + ${input.luku2} = ${result}`}])
      }
      else {
        const result = parseInt(input.luku1) - parseInt(input.luku2)
        setSumma(result);
        setData([...data, {key: data.length + 1, text: `${input.luku1} - ${input.luku2} = ${result}`}])
      }
    }
    return(
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
        <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between', width: 100 }}>
          <Button 
          title="+"
          onPress={() => handlePress('+')}
          />
          <Button 
          title="-"
          onPress={() => handlePress('-')}
          />
          <Button
          title="Historia"
          onPress={() => navigation.navigate('Historia', {data})}
          />
        </View>
      </View>
    )
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
    list: {
      width: 150,
      textAlign: 'center'
    }
  });