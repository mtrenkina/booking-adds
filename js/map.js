import { createCard } from './cards.js';
import {
  START_LATITUDE,
  START_LONGITUDE,
  activateForm,
  setAddress,
} from './form.js';

const ZOOM = 9;
const POINTER_WIDTH = 40;
const MAIN_POINTER_WIDTH = 52;

const map = L.map('map-canvas');
const markers = [];

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_POINTER_WIDTH, MAIN_POINTER_WIDTH],
  iconAnchor: [MAIN_POINTER_WIDTH / 2, MAIN_POINTER_WIDTH],
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainMarker = L.marker(
  {
    lat: START_LATITUDE,
    lng: START_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const addMainMarker = () => {
  mainMarker.addTo(map);
};

const onMapLoad = () => {
  activateForm();
  setAddress(START_LATITUDE, START_LONGITUDE);
  addMainMarker();
};

export const renderCards = (advertisements) => {
  advertisements.forEach(({ author, location, offer }) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [POINTER_WIDTH, POINTER_WIDTH],
      iconAnchor: [POINTER_WIDTH / 2, POINTER_WIDTH],
    });
    const lat = location.x;
    const lng = location.y;
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
      lat: START_LATITUDE,
      lng: START_LONGITUDE,
    },
    ZOOM
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  renderCards(advertisements);
};

mainMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  setAddress(lat, lng);
});
