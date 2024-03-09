import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contacts, setContacts] = useState([]);
  
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if(status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
        <View style={styles.listContainer}>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
        </View>}
        data={contacts} 
      />
      <Button
        onPress={() => getContacts()}
        title='Get contacts'
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
  list: {
    marginLeft: '5%',
    marginTop: 50
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
