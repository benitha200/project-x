import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

const RWANDA_CENTER = [29.8739, -1.9403];
const RWANDA_ZOOM = 8;

// Sample districts in Rwanda (replace with actual data)
const RWANDA_DISTRICTS = {
  'Kigali': [30.0619, -1.9441],
  'Butare': [29.7392, -2.5969],
  'Gisenyi': [29.2569, -1.7020],
  'Kibuye': [29.3478, -2.0601],
  'Byumba': [30.0608, -1.5784],
};

export default function MapComponent({ districts }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(RWANDA_CENTER),
          zoom: RWANDA_ZOOM,
        }),
      });
    }

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    mapInstanceRef.current.addLayer(vectorLayer);

    districts.forEach(district => {
      if (RWANDA_DISTRICTS[district]) {
        const feature = new Feature({
          geometry: new Point(fromLonLat(RWANDA_DISTRICTS[district])),
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            }),
          })
        );

        vectorSource.addFeature(feature);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
    };
  }, [districts]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}