import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  
  const db = SQLite.openDatabase('shoppinglist.db');

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const handleSave = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist(product, amount) values (?, ?);',
        [product, parseInt(amount)]);
    }, () => console.error('Error when adding item into DB'), handleUpdate)
  };

  const handleUpdate = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) => setList(rows._array));
    }, () => console.error('Error in fetching table from DB'), null)
  };

  const handleDelete = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?', [id]);
    }, () => console.error('Error in deleting item from DB'), handleUpdate)
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount int);');
    }, () => console.error('Error when creating DB'), handleUpdate);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          onChangeText={(product) => setProduct(product)}
          inputMode="text"
          value={product}
        />
        <TextInput style={styles.input}
            onChangeText={(amount) => setAmount(amount)}
            inputMode="numeric"
            value={amount}
        />
      </View>
      <Button
        onPress={() => handleSave()}
        title='Save'
      />
      <Text style={styles.textH}>Shopping list</Text>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
        <View style={styles.listContainer}>
          <Text>{item.product} {item.amount} </Text>
          <Text style={styles.bought} onPress={() => handleDelete(item.id)}>bought</Text>
        </View>}
        data={list}
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
  inputContainer: {
    marginTop: 100,
  },
  list: {
    marginLeft: '5%'
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bought: {
    color: 'blue'
  },
  textH: {
    fontSize: 20
  }
});
