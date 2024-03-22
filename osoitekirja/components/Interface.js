import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SQLiteService from "../services/SQLiteService";
import { Button, Input, ListItem } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";

export default function Interface({ navigation }) {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    //Stack navi ei lauennut tyhjällä useEffectillä, tällä korjaantuu ja koodi ajetaan kun ruutu on fokusissa
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            SQLiteService.update()
            .then(data => setList(data))
            .catch(err => console.error(err))
        }
    }, [isFocused])

    const handleShow = () => {
        fetch(`https://geocode.maps.co/search?q=${input.replace(/ /g, '+')}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            setInput('');
            navigation.navigate('Map', {data: {
                longitude: parseFloat(data[0].lon), 
                latitude: parseFloat(data[0].lat),
                markerTitle: data[0].display_name,
                title: input,
                newAddress: true
            }});
        })
        .catch(err => console.error(err))
    }

    const handleDelete = (id) => {
        SQLiteService.deleteRow(id)
        .then(SQLiteService.update()
            .then(data => setList(data))
            .catch(err => console.error(err)))
        .catch(err => console.error(err))
    }

    renderItem = ({ item }) => (
        <ListItem bottomDivider 
            onPress={() => navigation.navigate('Map', {data: {
                longitude: parseFloat(item.longitude),
                latitude: parseFloat(item.latitude),
                markerTitle: item.title
            }})}
            onLongPress={() => handleDelete(item.id)}
        >
            <ListItem.Content style={styles.listContainer} >
                <ListItem.Title>{item.title}</ListItem.Title>
                <View style={styles.listSubContainer}>
                    <ListItem.Subtitle style={styles.subtitle}>Open on map</ListItem.Subtitle>
                    <ListItem.Chevron color="black" size={23} />
                </View>
            </ListItem.Content>
        </ListItem>
    )


    return(
        <View style={styles.container}>
            <Input inputStyle={styles.input} labelStyle={styles.inputLabel}
                placeholder="Type in address..."
                label='PLACEFINDER'
                onChangeText={input => setInput(input)}
                value={input}
            />
            <Button buttonStyle={styles.button}
                raised icon={{name: 'map'}}
                onPress={handleShow}
                title='Show on map'
            />
            <FlatList
                style={styles.list}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                data={list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    input: {
        width: '100%',
        margin: 5,
    },
    inputLabel: {
        marginTop: 10
    },
    list: {
      width: '100%',
      textAlign: 'center'
    },
    button: {
        width: 200
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listSubContainer: {
        flexDirection: 'row'
    },
    subtitle: {
        color: 'gray'
    },
    icon: {
        fontSize: 20
    }
  });