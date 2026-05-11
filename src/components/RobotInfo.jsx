import React from 'react';
import { Info, Award, Calendar, Activity, Zap, Box, Scale, FastForward } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RobotInfo = () => {
  const { t } = useLanguage();
  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Info color="var(--primary-color)" size={24} />
        <h2 className="heading-gradient">{t('robotInfoTitle')}</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-main)', lineHeight: '1.6' }}>
        <p>
          Ushbu haydovchisiz robot texnologiyasi boshqa yo'l foydalanuvchilari va sayyohlar orasida ko'plab ijobiy hayajonlarni yaratishda davom etmoqda. Bunday texnologiya hali ham butun dunyo bo'ylab jamoat yo'llarida kamdan-kam uchraydi. 
        </p>
        <p>
          Shuningdek, oxirgi mijozlar robot yetkazib berish xizmatidan juda mamnun va uni yuqori baholadilar (<strong>NPS* 81 %</strong>). Fikr-mulohazalarga asoslanib, odamlar robotni tez va ishlatish oson deb hisoblashadi va kelajakda o'z posilkalarini aynan u bilan birga olishga tayyor.
        </p>
      </div>

      <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '10px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Box size={20} color="var(--primary-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Robot O'lchamlari</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>697 x 569 x 571 mm</div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Scale size={20} color="var(--success-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Umumiy Og'irlik</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>35 kg</div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Box size={20} color="var(--warning-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Yuk Qutisi O'lchamlari</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>400 × 320 × 340 mm</div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Zap size={20} color="var(--primary-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Batareya Hajmi</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>1260 Wh</div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <FastForward size={20} color="var(--success-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Maksimal Tezlik</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>6 km/soat</div>
        </div>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Award size={20} color="var(--warning-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Jami Posilkalar (1 yilda)</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>1200+ ta</div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Activity size={20} color="var(--primary-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bosib o'tilgan masofa</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>4400 mil (7000 km)</div>
        </div>
        
         <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '8px' }}>
            <Box size={20} color="var(--success-color)" />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Maksimal Yuk</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>10 kg</div>
        </div>
      </div>
    </div>
  );
};

export default RobotInfo;
