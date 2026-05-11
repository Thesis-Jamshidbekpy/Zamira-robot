import React, { useState } from 'react';
import { Send, Package, MapPin, X, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';

const createFormIcon = () => L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      background-color: var(--warning-color); 
      width: 30px; 
      height: 30px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 0 15px rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    ">
      <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30] // pin drops on the bottom tip
});

const LocationPicker = ({ position, setPosition, setAddressName }) => {
  const { t } = useLanguage();
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition([lat, lng]);
      
      // Auto-fetch address (Reverse Geocoding Yandex-style)
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
        const data = await response.json();
        const address = data.address;
        
        // Try to build a clean short address: road + house number or village
        let shortAddr = '';
        if (address.road) shortAddr += address.road;
        if (address.house_number) shortAddr += ', ' + address.house_number;
        if (!shortAddr && address.suburb) shortAddr = address.suburb;
        if (!shortAddr && address.village) shortAddr = address.village;
        
        setAddressName(shortAddr || data.display_name.split(',')[0]);
      } catch (error) {
        setAddressName(`${t('detectedAddress')} ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
  });
  return position ? <Marker position={position} icon={createFormIcon()} /> : null;
};

const AssignMail = ({ onAssign }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    recipient: '',
    phoneNumber: '',
    addressName: '',
    weight: '1.0'
  });
  
  const [position, setPosition] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleAddressSet = (name) => {
    setFormData(prev => ({ ...prev, addressName: name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.recipient || !position) {
      alert(t('assignError'));
      return;
    }
    
    const securityCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newMail = {
      id: Date.now().toString(),
      recipient: formData.recipient,
      phoneNumber: formData.phoneNumber || '+998',
      address: formData.addressName || t('addressLabel'),
      coords: position,
      weight: formData.weight,
      securityCode: securityCode,
      status: 'pending', 
      date: new Date().toLocaleString()
    };
    
    onAssign(newMail);
    setFormData({ recipient: '', phoneNumber: '', addressName: '', weight: '1.0' });
    setPosition(null);
  };

  return (
    <>
      <div className="glass-panel" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Package color="var(--primary-color)" size={24} />
          <h2 className="heading-gradient">{t('assignTitle')}</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>{t('recipientLabel')}</label>
            <input 
              type="text" 
              name="recipient"
              className="input-field" 
              placeholder={t('recipientPlaceholder')} 
              value={formData.recipient}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>{t('phoneLabel')}</label>
            <input 
              type="text" 
              name="phoneNumber"
              className="input-field" 
              placeholder={t('phonePlaceholder')} 
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={{ padding: '10px 12px' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>{t('addressLabel')}</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                name="addressName"
                className="input-field" 
                placeholder={t('addressPlaceholder')} 
                value={formData.addressName}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: '10px 12px' }}
              />
              <button 
                type="button" 
                onClick={() => setIsMapOpen(true)}
                className="btn btn-primary"
                style={{ padding: '0 16px', background: 'var(--accent-color)' }}
              >
                <MapPin size={20} />
              </button>
            </div>
            {!position && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('assignError')}</span>}
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
             <label>{t('weightLabel')}</label>
             <input 
              type="number" 
              step="0.1"
              name="weight"
              className="input-field" 
              value={formData.weight}
              onChange={handleChange}
              style={{ padding: '10px 12px' }}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
              <Send size={18} />
              {t('assignBtn')}
            </button>
          </div>
        </form>
      </div>

      {/* FULL SCREEN MAP MODAL (YANDEX STYLE) */}
      {isMapOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--bg-color)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'var(--panel-bg)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--panel-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 1
          }}>
            <button onClick={() => setIsMapOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
              <X size={28} />
            </button>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{t('mapPromptTitle')}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{t('mapPromptDesc')}</p>
            </div>
            {position && (
              <button 
                onClick={() => setIsMapOpen(false)}
                className="btn btn-primary"
                style={{ padding: '8px 16px', background: 'var(--success-color)' }}
              >
                {t('selectBtn')}
              </button>
            )}
          </div>

          {/* Map Area */}
          <div style={{ flex: 1, position: 'relative' }}>
             <MapContainer center={position || [41.311081, 69.240562]} zoom={position ? 16 : 13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; OSM'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker position={position} setPosition={setPosition} setAddressName={handleAddressSet} />
             </MapContainer>

             {/* Search input overlay emulation */}
             <div style={{
               position: 'absolute',
               bottom: '30px',
               left: '50%',
               transform: 'translateX(-50%)',
               width: '90%',
               maxWidth: '400px',
               background: 'var(--panel-bg)',
               backdropFilter: 'blur(12px)',
               border: '1px solid var(--panel-border)',
               borderRadius: 'var(--radius-lg)',
               padding: '16px',
               zIndex: 9999,
               boxShadow: 'var(--shadow-md)',
               display: 'flex',
               flexDirection: 'column',
               gap: '8px'
             }}>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><Navigation size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> {t('detectedAddress')}</div>
               <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                 {formData.addressName || t('detectingAddress')}
               </div>

               {position && (
                 <button 
                  onClick={() => setIsMapOpen(false)}
                  className="btn btn-primary"
                  style={{ marginTop: '10px', background: 'var(--primary-color)' }}
                >
                  {t('confirmBtn')}
                </button>
               )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignMail;
