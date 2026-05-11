import React from 'react';
import { Settings, Globe, Palette, Save, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    // Show a small visual feedback if needed, but Context saves to localStorage automatically
    alert(t('settingsSave') + " ✓");
  };

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
        <Settings color="var(--primary-color)" size={28} />
        <h2 className="heading-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>{t('settingsTitle')}</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Language Selection */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe color="var(--accent-color)" size={20} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{t('settingsLanguage')}</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setLanguage('uz')}
              className={`btn ${language === 'uz' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 20px', minWidth: '120px' }}
            >
              {t('languageUz')}
            </button>
            <button 
              onClick={() => setLanguage('ru')}
              className={`btn ${language === 'ru' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 20px', minWidth: '120px' }}
            >
              {t('languageRu')}
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`btn ${language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 20px', minWidth: '120px' }}
            >
              {t('languageEn')}
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette color="var(--primary-color)" size={20} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{t('settingsTheme')}</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setTheme('dark')}
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 20px', minWidth: '120px', display: 'flex', gap: '8px' }}
            >
              <Moon size={16} /> Dark
            </button>
            <button 
              onClick={() => setTheme('light')}
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 20px', minWidth: '120px', display: 'flex', gap: '8px' }}
            >
              <Sun size={16} /> Light
            </button>
          </div>
        </div>

        {/* Save/Action Button */}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={18} />
            {t('settingsSave')}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
