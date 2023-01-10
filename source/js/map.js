import L from 'leaflet';
import { createCard } from './cards.js';
import { DEFAULT_LAT, DEFAULT_LONG, activateForm, setAddress } from './form.js';

const ZOOM = 13;
const POINTER_WIDTH = 40;
const MAIN_POINTER_WIDTH = 52;

const map = L.map('map-canvas');
const markers = [];

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_POINTER_WIDTH, MAIN_POINTER_WIDTH],
  iconAnchor: [MAIN_POINTER_WIDTH / 2, MAIN_POINTER_WIDTH],
});

const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
tileLayer.setZIndex(100);
tileLayer.addTo(map);

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LONG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const addMainMarker = () => {
  mainMarker.addTo(map);
};

export const mainMarkerDefaultPosition = () => {
  mainMarker.setLatLng(L.latLng(DEFAULT_LAT, DEFAULT_LONG));
};

const onMapLoad = () => {
  activateForm();
  setAddress(DEFAULT_LAT, DEFAULT_LONG);
  addMainMarker();
};

export const renderCards = (advertisements) => {
  advertisements.forEach(({ author, location, offer }) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [POINTER_WIDTH, POINTER_WIDTH],
      iconAnchor: [POINTER_WIDTH / 2, POINTER_WIDTH],
    });
    const lat = location.lat;
    const lng = location.lng;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      }
    );

    marker.addTo(map).bindPopup(createCard(offer, author), {
      keepInView: true,
    });
    markers.push(marker);
  });
};

export const setUpMap = (advertisements) => {
  map.on('load', onMapLoad).setView(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LONG,
    },
    ZOOM
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  renderCards(advertisements);
};

export const removeMapMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

mainMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  setAddress(lat, lng);
});
