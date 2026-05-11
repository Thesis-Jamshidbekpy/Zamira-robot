import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapTracker from '../components/MapTracker';
import RobotInfo from '../components/RobotInfo';
import AssignMail from '../components/AssignMail';
import MailList from '../components/MailList';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = ({ 
  mails, 
  handleAssignMail, 
  updateMailStatus, 
  selectedMailId, 
  setSelectedMailId,
  userRole
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const pendingCount = mails.filter(m => m.status === 'pending').length;
  const deliveringCount = mails.filter(m => m.status === 'delivering').length;
  const deliveredCount = mails.filter(m => m.status === 'delivered').length;

  const currentDelivering = mails.find(m => m.status === 'delivering');
  const selectedMail = mails.find(m => m.id === selectedMailId);
  const targetMail = selectedMail || currentDelivering;
  
  const nextDestination = targetMail ? targetMail.address : (pendingCount > 0 ? t('locationWait') : t('locationReady'));
  const destinationCoords = targetMail ? targetMail.coords : null;
  const currentLocation = currentDelivering ? t('locationMoving') : t('locationBase');

  // Helper for clicking stats card to go to new page
  const handleStatClick = (status) => {
    navigate(`/history?filter=${status}`);
  };

  return (
    <>
      {/* Top Main Stats */}
      <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>
         <div 
            className="glass-card" 
            style={{ borderLeft: '4px solid var(--primary-color)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(59,130,246,0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => handleStatClick('all')}
         >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('totalMails')}</p>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{mails.length}</h3>
         </div>
         <div 
            className="glass-card" 
            style={{ borderLeft: '4px solid var(--warning-color)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(245,158,11,0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => handleStatClick('pending')}
         >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('queueMails')} ({pendingCount})</p>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{t('queueWaiting')}</h3>
         </div>
         <div 
            className="glass-card" 
            style={{ borderLeft: '4px solid var(--accent-color)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(14,165,233,0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => handleStatClick('delivering')}
         >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('onWayMails')} ({deliveringCount})</p>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{t('onWayActive')}</h3>
         </div>
         <div 
            className="glass-card" 
            style={{ borderLeft: '4px solid var(--success-color)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(16,185,129,0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => handleStatClick('delivered')}
         >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('deliveredMails')}</p>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{deliveredCount} {t('countItems')}</h3>
         </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid-layout" style={{ marginBottom: '24px' }}>
        {/* Left Column (Assign Mail) */}
        {userRole === 'admin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ flex: '1 1 auto' }}>
              <AssignMail onAssign={handleAssignMail} />
            </div>
          </div>
        )}

        {/* Center Column (Map and Tracking) - takes more space on wide screens */}
        <div style={{ gridColumn: userRole === 'admin' ? 'span 1' : 'span 2' }}>
          <MapTracker currentLocation={currentLocation} nextDestination={nextDestination} destinationCoords={destinationCoords} />
        </div>

        {/* Right Column (List) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ flex: '1 1 auto', height: '100%', maxHeight: '500px' }}>
            <MailList mails={mails.slice(0, 5)} updateMailStatus={updateMailStatus} selectedMailId={selectedMailId} onSelectMail={setSelectedMailId} />
          </div>
        </div>
      </div>

      {/* Robot Info Details section below the main dashboard */}
      <RobotInfo />
    </>
  );
};

export default Dashboard;
