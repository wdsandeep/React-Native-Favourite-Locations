export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {lat: location.lat, lng: location.lng}; // { lat: 0.12, lng: 1.234}
        this.id = id; // new Date().toString() + Math.random().toString();
    }
}