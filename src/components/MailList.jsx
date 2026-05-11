import React, { useState } from 'react';
import { List, CheckCircle, Clock, Truck, MoreVertical, MapPin, Box, Lock, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MailList = ({ mails, updateMailStatus, selectedMailId, onSelectMail }) => {
  const { t } = useLanguage();
  const [promptingMailId, setPromptingMailId] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerifyCode = (mail) => {
    if (inputCode === mail.securityCode) {
      updateMailStatus(mail.id, 'delivered');
      setPromptingMailId(null);
      setInputCode('');
      setErrorMsg('');
    } else {
      setErrorMsg(t('codeError'));
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="badge badge-warning"><Clock size={12} style={{marginRight: '4px'}}/> {t('statusPending')}</span>;
      case 'delivering': return <span className="badge badge-blue"><Truck size={12} style={{marginRight: '4px'}}/> {t('statusDelivering')}</span>;
      case 'delivered': return <span className="badge badge-success"><CheckCircle size={12} style={{marginRight: '4px'}}/> {t('statusDelivered')}</span>;
      default: return null;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <List color="var(--primary-color)" size={24} />
          <h2 className="heading-gradient">{t('listTitle')}</h2>
        </div>
        <div className="badge badge-blue">{t('listTotal')}: {mails.length} {t('countItems')}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
        {mails.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5, padding: '40px 0' }}>
            <Box size={48} />
            <p style={{ marginTop: '10px' }}>{t('noMails')}</p>
          </div>
        ) : (
          mails.map((mail, index) => {
            const isSelected = selectedMailId === mail.id;
            return (
            <div 
              key={mail.id} 
              className="glass-card animate-slide-up" 
              style={{ 
                animationDelay: `${index * 0.1}s`, 
                cursor: 'pointer',
                border: isSelected ? '1px solid var(--primary-color)' : '1px solid rgba(255,255,255,0.05)',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'none'
              }}
              onClick={() => onSelectMail && onSelectMail(mail.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{mail.recipient}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={14} /> {mail.phoneNumber || t('noPhone')}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={14} /> {t('addressText')} {mail.address}
                  </div>
                </div>
                <div>{getStatusBadge(mail.status)}</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mail.date}</span>
                
                {/* Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                  {mail.status === 'pending' && (
                    <button onClick={(e) => { e.stopPropagation(); updateMailStatus(mail.id, 'delivering'); }} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                      {t('actionSend')}
                    </button>
                  )}
                  {mail.status === 'delivering' && promptingMailId !== mail.id && (
                     <button onClick={(e) => { e.stopPropagation(); setPromptingMailId(mail.id); setInputCode(''); setErrorMsg(''); }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--success-color)' }}>
                       <Lock size={12} style={{marginRight: '4px'}}/> {t('actionReceive')}
                     </button>
                  )}
                 
                  {/* Inline Code Prompt for Delivering status */}
                  {mail.status === 'delivering' && promptingMailId === mail.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input 
                          type="text" 
                          maxLength="6"
                          placeholder={t('codePlaceholder')} 
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="input-field"
                          style={{ padding: '6px 10px', fontSize: '0.85rem', width: '120px' }}
                        />
                        <button onClick={() => handleVerifyCode(mail)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--success-color)' }}>
                           {t('confirmCode')}
                        </button>
                      </div>
                      
                      {/* For demo purposes, we usually SMS the code, but here we show it in UI briefly to test */}
                      <div style={{ fontSize: '0.75rem', color: 'var(--warning-color)' }}>
                        {t('demoCodePrompt')} <b>{mail.securityCode || '123456'}</b>
                      </div>
                      {errorMsg && <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errorMsg}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MailList;
