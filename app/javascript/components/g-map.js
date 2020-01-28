import styles from './map-style';
import { loadScript } from '../utils/load-script';
import mapStyle from './map-style';

export default {
    name: 'g-map',
    props: {
      contacts: Array,
      highlightPin: Number,
      pinActive: String,
      pinInactive: String
    },
    data: () => (
        {
            google: null,
            googleMap: null,
            googleMarkers: [],
        }
    ),
    mounted() {
      window.initMap = this.initMap;
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDzLExdXrakdy0A7sWsb8lPKRY8oUb7Q-8&callback=initMap')
    },
    watch: {
        contacts: {
            handler() {
                if (this.google) {
                  this.addMarkers();
                }
            },
        },
        highlightPin: {
            handler() {
              this.googleMarkers.forEach((marker) => {
                const highlight = marker.id === this.highlightPin;
                marker.setIcon(highlight ? this.pinActive : this.pinInactive);
              });
            },
        },
    },
    methods: {
        initMap() {
            this.google = window.google;
            this.googleMap = new this.google.maps.Map(
                document.getElementById('g-map'), {
                  center: {lat: -34.397, lng: 150.644},
                  zoom: 8,
                  disableDefaultUI: true,
                  zoomControl: true,
                  styles: mapStyle,
                }
            );
            this.trackMapMovement();
            this.addMarkers();
        },
        showAllMarkers() {
            const bounds = new this.google.maps.LatLngBounds();
            if (this.googleMarkers.length > 0) {
                this.googleMarkers.forEach(marker => bounds.extend(marker.position));
                this.googleMap.fitBounds(bounds);
            }
        },
        addMarkers() {
            this.clearMarkers();
            this.contacts.forEach((contact) => {
                const googleMarker = new this.google.maps.Marker({
                    position: new this.google.maps.LatLng(contact.lat, contact.lng),
                    map: this.googleMap,
                    icon: { url: this.pinInactive },
                    id: contact.id,
                });
                this.googleMarkers.push(googleMarker);
            });
            this.showAllMarkers();
        },
        clearMarkers() {
            this.googleMarkers.forEach(marker => marker.setMap(null));
            this.googleMarkers = [];
        },
        trackMapMovement() {
            this.googleMap.addListener('bounds_changed', () => {
                this.emitVisibleItemsIds();
            });
        },
        emitVisibleItemsIds() {
            const visibleItemsIds = [];
            const bounds = this.googleMap.getBounds();
            this.googleMarkers.forEach((marker) => {
                if (bounds.contains(marker.getPosition())) {
                    visibleItemsIds.push(marker.id);
                }
            });
            this.$emit('update-visible-items', visibleItemsIds)
        },
    },
    template: `
      <div id="g-map" class="g-map"></div>
    `,
};
