import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';



export default function App() {

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_apiKey,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    databaseURL: process.env.EXPO_PUBLIC_databaseURL,
    projectId: process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: "1:693844590066:web:131dd37898d5c9d2bebf6b"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [item, setItem] = useState({
    product: '',
    amount: ''
  });
  const [list, setList] = useState([]);

  const handleSave = () => {
    push(ref(database, 'items/'), item);
    setItem({product: '', amount: ''});
  };

  const handleDelete = (id) => {
    remove(ref(database, `items/${id}`));
  };

  const handleChange = (value, param) => {
    setItem({...item, [param]: value});
  };

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if(data !== null) {
        setList(Object.keys(data).map(key => ({ id: key, ...data[key]})));
      }
      else {
        setList([]);
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          onChangeText={(product) => handleChange(product, 'product')}
          inputMode="text"
          value={item.product}
        />
        <TextInput style={styles.input}
            onChangeText={(amount) => handleChange(amount, 'amount')}
            inputMode="numeric"
            value={item.amount}
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
