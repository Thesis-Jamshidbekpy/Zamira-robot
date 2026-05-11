import React from 'react';
import { MapPin, Navigation, Map as MapIcon, Battery, Wifi } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';

// Fix generic leaflet icons by using custom div icons
const createMarkerIcon = (color, pulsating = false) => L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      background-color: ${color}; 
      width: 24px; 
      height: 24px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 0 15px ${color};
      display: flex;
      justify-content: center;
      align-items: center;
      ${pulsating ? 'animation: pulse 2s infinite;' : ''}
    ">
      <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

// A component to recenter the map when destination changes
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 16, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
};

const MapTracker = ({ currentLocation, nextDestination, destinationCoords }) => {
  const { t } = useLanguage();
  // Default base station coordinate (Tashkent State University of Economics campus maybe, or general Tashkent center)
  const basePosition = [41.311081, 69.240562];
  
  const targetPos = destinationCoords || basePosition;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="heading-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapIcon size={24} color="var(--primary-color)" />
          {t('mapTitle')}
        </h2>
        <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="live-indicator"></div>
          {t('mapOnline')}
        </div>
      </div>

      <div style={{ 
        position: 'relative', 
        height: '350px', 
        borderRadius: 'var(--radius-md)', 
        overflow: 'hidden',
        border: '1px solid var(--panel-border)',
        zIndex: 0
      }}>
        <MapContainer center={basePosition} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <RecenterMap lat={targetPos[0]} lng={targetPos[1]} />

          {/* Base Station Marker */}
          <Marker position={basePosition} icon={createMarkerIcon('var(--primary-color)', false)}>
            <Popup>
              <b>{t('basePoint')}</b>
            </Popup>
          </Marker>

          {/* Current Destination Marker */}
          {destinationCoords && (
            <Marker position={destinationCoords} icon={createMarkerIcon('var(--warning-color)', true)}>
              <Popup>
                <b>{t('addressText')}</b> {nextDestination}
              </Popup>
            </Marker>
          )}

        </MapContainer>
      </div>

      <div className="grid-layout" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '10px', borderRadius: '50%' }}>
            <MapPin size={20} color="var(--primary-color)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('regionLabel')}</div>
            <div style={{ fontWeight: 600 }}>{t('regionValue')}</div>
          </div>
        </div>
        
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '50%' }}>
            <Battery size={20} color="var(--success-color)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('batteryLabel')}</div>
            <div style={{ fontWeight: 600 }}>{t('batteryValue')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTracker;
