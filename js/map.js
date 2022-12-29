import { createCard } from './cards.js';
import { advertisements } from './data.js';

const START_LATITUDE = 35.6804;
const START_LONGITUDE = 139.769;
const ZOOM = 9;
const POINTER_WIDTH = 40;
const LOCATION_PRECISION = 5;

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');

const map = L.map('map-canvas');
const markers = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const onMapLoad = () => {
  setAddress(START_LATITUDE, START_LONGITUDE);
};

export function renderCards(advertisements) {
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
}

export function setUpMap(advertisements) {
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
}

function setAddress(lat, long) {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
}
