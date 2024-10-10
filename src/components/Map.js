import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const RWANDA_CENTER = { lat: -1.9403, lng: 29.8739 };
const RWANDA_ZOOM = 8;

const RWANDA_DISTRICTS = {
  'Nyarugenge': { lat: -1.9543, lng: 30.0608 },
  'Gasabo': { lat: -1.9071, lng: 30.1201 },
  'Kicukiro': { lat: -1.9974, lng: 30.0782 },
  'Nyanza': { lat: -2.3507, lng: 29.7409 },
  'Gisagara': { lat: -2.5946, lng: 29.8245 },
  'Nyaruguru': { lat: -2.7439, lng: 29.5481 },
  'Huye': { lat: -2.5967, lng: 29.7392 },
  'Nyamagabe': { lat: -2.4804, lng: 29.4648 },
  'Ruhango': { lat: -2.2184, lng: 29.7784 },
  'Muhanga': { lat: -2.0799, lng: 29.7562 },
  'Kamonyi': { lat: -1.9985, lng: 29.8680 },
  'Karongi': { lat: -2.1579, lng: 29.3697 },
  'Rutsiro': { lat: -1.9470, lng: 29.3261 },
  'Rubavu': { lat: -1.6842, lng: 29.3386 },
  'Nyabihu': { lat: -1.6556, lng: 29.4981 },
  'Ngororero': { lat: -1.8546, lng: 29.5869 },
  'Rusizi': { lat: -2.4851, lng: 28.9063 },
  'Nyamasheke': { lat: -2.3284, lng: 29.1417 },
  'Rulindo': { lat: -1.7189, lng: 29.9834 },
  'Gakenke': { lat: -1.6958, lng: 29.7845 },
  'Musanze': { lat: -1.4976, lng: 29.6348 },
  'Burera': { lat: -1.4569, lng: 29.8253 },
  'Gicumbi': { lat: -1.7089, lng: 30.1017 },
  'Rwamagana': { lat: -1.9485, lng: 30.4345 },
  'Nyagatare': { lat: -1.2977, lng: 30.3278 },
  'Gatsibo': { lat: -1.5894, lng: 30.4577 },
  'Kayonza': { lat: -1.9409, lng: 30.6566 },
  'Kirehe': { lat: -2.2669, lng: 30.7324 },
  'Ngoma': { lat: -2.1479, lng: 30.4764 },
  'Bugesera': { lat: -2.1586, lng: 30.2506 },
};

export default function MapComponent({ districts }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current && !map) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: RWANDA_CENTER,
          zoom: RWANDA_ZOOM,
        });
        setMap(newMap);
      }
    }).catch((error) => {
      console.error("Error loading Google Maps:", error);
    });

    return () => {
      // Clean up is handled by Google Maps
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));

      // Add new markers
      const newMarkers = districts.map(district => {
        if (RWANDA_DISTRICTS[district]) {
          return new google.maps.Marker({
            position: RWANDA_DISTRICTS[district],
            map: map,
            title: district,
          });
        }
        return null;
      }).filter(Boolean);

      setMarkers(newMarkers);
    }
  }, [map, districts]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}