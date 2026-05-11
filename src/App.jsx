import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bot, Map, Package, Activity, List as ListIcon, LogOut, Settings, PieChart } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import MailsPage from './pages/MailsPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import StatisticsPage from './pages/StatisticsPage';
import { useLanguage } from './context/LanguageContext';
import { useMails } from './context/MailContext';
import { toast } from 'sonner';

function App() {
  const { t } = useLanguage();
  const { mails, updateMailStatus, selectedMailId, setSelectedMailId, addMail } = useMails();
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('robotIsLoggedIn') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('robotUserRole') || 'admin';
  });

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('robotIsLoggedIn', 'true');
    localStorage.setItem('robotUserRole', role);
    toast.success(`Xush kelibsiz, ${role === 'admin' ? 'Admin' : 'Xodim'}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('robotIsLoggedIn');
    localStorage.removeItem('robotUserRole');
    toast.info("Tizimdan chiqildi.");
  };

  const location = useLocation();

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      {/* Universal Navigation Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'var(--primary-color)', padding: '12px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-glow)' }}>
            <Bot color="white" size={32} />
          </div>
          <div>
            <h1 className="heading-gradient" style={{ fontSize: '2rem', margin: 0 }}>{t('appTitle')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{t('appSubtitle')}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: '16px', marginRight: '24px' }}>
            <Link to="/" style={{ color: location.pathname === '/' ? 'var(--primary-color)' : 'var(--text-main)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={18} /> {t('navHome')}
            </Link>
            <Link to="/history" style={{ color: location.pathname === '/history' ? 'var(--primary-color)' : 'var(--text-main)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ListIcon size={18} /> {t('navHistory')}
            </Link>
            {userRole === 'admin' && (
              <Link to="/statistics" style={{ color: location.pathname === '/statistics' ? 'var(--primary-color)' : 'var(--text-main)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PieChart size={18} /> Statistika
              </Link>
            )}
            <Link to="/settings" style={{ color: location.pathname === '/settings' ? 'var(--primary-color)' : 'var(--text-main)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Settings size={18} /> {t('navSettings')}
            </Link>
          </nav>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Activity size={18} color="var(--success-color)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('systemOnline')} ({userRole === 'admin' ? 'Admin' : 'Xodim'})</span>
          </div>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <LogOut size={18} />
            {t('logout')}
          </button>
        </div>
      </header>

      {/* Pages Container */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              mails={mails}
              handleAssignMail={addMail}
              updateMailStatus={updateMailStatus}
              selectedMailId={selectedMailId}
              setSelectedMailId={setSelectedMailId}
              userRole={userRole}
            />
          } 
        />
        <Route path="/history" element={<MailsPage mails={mails} />} />
        {userRole === 'admin' && <Route path="/statistics" element={<StatisticsPage mails={mails} />} />}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
