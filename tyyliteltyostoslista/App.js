import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem, Icon} from '@rneui/themed';

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

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content style={styles.listContainer}>
        <View>
          <ListItem.Title>{item.product}</ListItem.Title>
          <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        </View>
        <Icon name="trash-can-outline" type="material-community" color="grey" onPress={() => handleDelete(item.id)} />
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Shopping List', style: styles.headerText }}
      />
        <Input style={styles.input}
          placeholder='Product'
          label='PRODUCT'
          onChangeText={product => setProduct(product)} value={product}
        />
        <Input style={styles.input}
          placeholder='Amount'
          label='AMOUNT'
          onChangeText={amount => setAmount(amount)} value={amount}
        />
        <Button buttonStyle={styles.button}
        raised icon={{name: 'save'}}
        onPress={handleSave}
        title='Save'
      />
      <Text style={styles.textH}>Shopping list</Text>
      <FlatList
        style={styles.list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
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
    width: '100%',
    margin: 5,
  },
  list: {
    marginLeft: '5%',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    width: 200
  },
  bought: {
    color: 'blue'
  },
  textH: {
    fontSize: 20
  },
  headerText: {
    color: 'white',
    fontSize: 17
  }
});
