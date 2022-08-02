import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

function AllPlaces ({ route }) {
    const [loadedPlaces, setLoadedPlaces] = useState([])

    const isFocused = useIsFocused();
    useEffect(() => {
        async function loadPlaces() {
            if(isFocused) {
                const places = await fetchPlaces();
                setLoadedPlaces(places);
                // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
            }    
        }
        loadPlaces();
    }, [isFocused])
    return <PlacesList places={loadedPlaces} />
}

export default AllPlaces;