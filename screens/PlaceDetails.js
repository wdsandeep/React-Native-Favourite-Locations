import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";


function PlaceDetails({ route, navigation }) {
    const [fetchedPlace, setFetchedPlace] = useState();

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        // use selected place id to fetch data for a single place
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);   
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title,
            });
        }
        loadPlaceData();
    }, [selectedPlaceId]);

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        });
    }

    if (!fetchedPlace) {
        return <View style={styles.fallback}>
            <Text>Loading place data...</Text>
        </View>
    }

    return <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>View on Map</OutlineButton>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign:'center',
        fontWeight: 'bold',
        alignItems: 'center',
    }
})