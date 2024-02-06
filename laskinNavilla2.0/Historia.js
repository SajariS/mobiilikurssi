import { FlatList, Text, StyleSheet, View } from "react-native";


export default function Historia({route, navigation}) {

    const { data } = route.params;

    return(
        <View style={styles.container}>
            <FlatList style={styles.list}
            data={data}
            renderItem={({item}) => 
            <Text>{item.text}</Text>
            }
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<Text style={{fontSize: 25}}>History: </Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: 150,
        textAlign: 'center'
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});