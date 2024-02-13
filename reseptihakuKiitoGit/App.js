import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => {
      Alert.alert('Error', error.message)
    })
  }

  const handlePress = () => {
    getRecipes();
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}} >{item.strMeal}</Text>
            <Image source={{uri: item.strMealThumb}} style={{width: 70, height: 70}} />
          </View>
        }
      />
      <View style={{margin: 5}}>
        <TextInput style={styles.input}
          inputMode='text'
          onChangeText={text => setKeyword(text)}
        />
        <Button 
        title="search"
        onPress={() => handlePress()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%'
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
    width: 300,
    textAlign: 'left'
    
  }
});
