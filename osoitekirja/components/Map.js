import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import SQLiteService from "../services/SQLiteService";

export default function Map({ route, navigation }) {

    const { data } = route.params;

    const handleSave = () => {
        SQLiteService.addRow(data.title, data.longitude.toString(), data.latitude.toString())
        .then(navigation.navigate('My Places'))
        .catch(err => console.error(err))
    }

    return(
        <View style={styles.container} >
            <MapView style={styles.map}
                initialRegion={{
                    longitude: data.longitude,
                    latitude: data.latitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }}
            >
                <Marker
                    coordinate={{
                        longitude: data.longitude,
                        latitude: data.latitude
                    }}
                    pinColor='red'
                    title={data.markerTitle}
                />
            </MapView>
            {data.newAddress &&             
            <Button buttonStyle={styles.button}
                raised icon={{name: 'save'}}
                title='Save'
                onPress={handleSave}
            /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    map: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    button: {
        width: '50%',
        position: 'absolute',
        bottom: 30, 
        alignSelf: 'center'
    }
})