import L from 'leaflet';
import { getTokyoCenter, getDefaultZoom } from './util.js';
import { createCard } from './cards.js';
import { activateForm, setAddress } from './form.js';

const TOKYO_CENTER = getTokyoCenter();
const ZOOM = getDefaultZoom();

const POINTER_WIDTH = 40;
const MAIN_POINTER_WIDTH = 52;
const MAP_PARAMETERS = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const map = L.map('map-canvas');
const markers = [];

const mainPinIcon = L.icon({
  iconUrl: URL('https://mtrenkina.github.io/booking-adds/img/main-pin.svg'),
  iconSize: [MAIN_POINTER_WIDTH, MAIN_POINTER_WIDTH],
  iconAnchor: [MAIN_POINTER_WIDTH / 2, MAIN_POINTER_WIDTH],
});

const tileLayer = L.tileLayer(MAP_PARAMETERS.url, {
  attribution: MAP_PARAMETERS.attribution,
});
tileLayer.setZIndex(100);
tileLayer.addTo(map);

const mainMarker = L.marker(
  {
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
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
  mainMarker.setLatLng(L.latLng(TOKYO_CENTER.lat, TOKYO_CENTER.lng));
};

const onMapLoad = () => {
  activateForm();
  setAddress(TOKYO_CENTER.lat, TOKYO_CENTER.lng);
  addMainMarker();
};

export const renderCards = (advertisements) => {
  advertisements.forEach(({ author, location, offer }) => {
    const icon = L.icon({
      iconUrl: URL('https://mtrenkina.github.io/booking-adds/img/pin.svg'),
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
      lat: TOKYO_CENTER.lat,
      lng: TOKYO_CENTER.lng,
    },
    ZOOM
  );

  L.tileLayer(MAP_PARAMETERS.url, {
    attribution: MAP_PARAMETERS.attribution,
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
