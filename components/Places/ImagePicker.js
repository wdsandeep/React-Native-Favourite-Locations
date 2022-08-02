import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

function ImagePicker({ onTakeImage }) {
    const [pickedImage, setPickedImage] = useState('');
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        // console.log(cameraPermissionInformation.status);
        if(cameraPermissionInformation.status !== PermissionStatus.GRANTED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permission touse this app.');
            return false;
        }

        return true;

    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        // console.log(image);
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    } 

    return <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon="camera" onPress={takeImageHandler} >Take Image</OutlineButton>
        </View>
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }

});
