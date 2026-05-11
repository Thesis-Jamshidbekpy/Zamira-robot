import React, { useState } from 'react';
import { Bot, User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'zamira' && password === '2207') {
      onLogin('admin');
    } else if (username === 'xodim' && password === '1234') {
      onLogin('employee');
    } else {
      setError(t('loginError'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="login-logo">
            <Bot color="white" size={40} />
          </div>
          <h2>{t('loginTitle')}</h2>
          <p>{t('loginSubtitle')}</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>{t('loginLabel')}</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder={t('loginPlaceholder')}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>{t('passwordLabel')}</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder={t('passwordPlaceholder')}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">
            <LogIn size={20} />
            {t('loginBtn')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>{t('loginDemo')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
