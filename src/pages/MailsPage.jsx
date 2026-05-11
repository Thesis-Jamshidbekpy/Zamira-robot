import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Phone, MapPin, CheckCircle, Clock, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MailsPage = ({ mails }) => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const currentFilter = searchParams.get('filter') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="badge badge-warning"><Clock size={12} style={{marginRight: '4px'}}/> {t('statusPending')}</span>;
      case 'delivering': return <span className="badge badge-blue"><Truck size={12} style={{marginRight: '4px'}}/> {t('statusDelivering')}</span>;
      case 'delivered': return <span className="badge badge-success"><CheckCircle size={12} style={{marginRight: '4px'}}/> {t('statusDelivered')}</span>;
      default: return <span className="badge badge-blue">{status}</span>;
    }
  };

  const filteredMails = mails.filter(mail => {
    // Status Filter
    if (currentFilter !== 'all' && mail.status !== currentFilter) return false;
    
    // Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        mail.recipient.toLowerCase().includes(q) ||
        (mail.address && mail.address.toLowerCase().includes(q)) ||
        (mail.phoneNumber && mail.phoneNumber.includes(q))
      );
    }
    
    return true;
  });

  return (
    <div className="glass-panel" style={{ padding: '32px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ padding: '8px', borderRadius: '50%' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="heading-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>{t('historyTitle')}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{t('historyDesc')}</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--panel-border)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Qabul qiluvchi ismini, manzilini yoki raqamini yozib qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', padding: '12px', width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--text-muted)" />
          <span style={{ fontSize: '0.9rem' }}>Holat:</span>
          <select 
            value={currentFilter}
            onChange={(e) => setSearchParams({ filter: e.target.value })}
            className="input-field"
            style={{ width: '150px' }}
          >
            <option value="all">{t('filterAll')}</option>
            <option value="pending">{t('filterPending')}</option>
            <option value="delivering">{t('filterDelivering')}</option>
            <option value="delivered">{t('filterDelivered')}</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--panel-border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID / Sana</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Mijoz</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Manzil</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Vazni</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Holati</th>
            </tr>
          </thead>
          <tbody>
            {filteredMails.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Muvofiq ma'lumot topilmadi</td>
              </tr>
            ) : (
              filteredMails.map(mail => (
                <tr key={mail.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{mail.id.slice(-6)}</div>
                    <div>{mail.date.split(',')[0]}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600 }}>{mail.recipient}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <Phone size={12}/> {mail.phoneNumber || "Kiritilmagan"}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} color="var(--primary-color)" />
                      {mail.address}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{mail.weight} kg</td>
                  <td style={{ padding: '12px 16px' }}>{getStatusBadge(mail.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default MailsPage;
