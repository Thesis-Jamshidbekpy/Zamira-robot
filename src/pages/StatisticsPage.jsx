import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMails } from '../context/MailContext';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Activity, Package, CheckCircle, Scale } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']; // Delivered (Green), Delivering (Blue), Pending (Orange)

const StatisticsPage = () => {
  const { t } = useLanguage();
  const { mails } = useMails();

  const stats = useMemo(() => {
    let delivered = 0;
    let delivering = 0;
    let pending = 0;
    let totalWeight = 0;

    mails.forEach(mail => {
      if (mail.status === 'delivered') delivered++;
      else if (mail.status === 'delivering') delivering++;
      else if (mail.status === 'pending') pending++;
      
      totalWeight += parseFloat(mail.weight || 0);
    });

    return {
      total: mails.length,
      delivered,
      delivering,
      pending,
      totalWeight: totalWeight.toFixed(1)
    };
  }, [mails]);

  const pieData = [
    { name: t('statusDelivered'), value: stats.delivered },
    { name: t('statusDelivering'), value: stats.delivering },
    { name: t('statusPending'), value: stats.pending }
  ].filter(item => item.value > 0);

  // Mock timeline data based on current mails length
  const lineData = [
    { name: 'Dush', count: Math.floor(Math.random() * 5) + 1 },
    { name: 'Sesh', count: Math.floor(Math.random() * 8) + 2 },
    { name: 'Chor', count: Math.floor(Math.random() * 10) + 3 },
    { name: 'Pay', count: Math.floor(Math.random() * 6) + 1 },
    { name: 'Juma', count: Math.floor(Math.random() * 12) + 4 },
    { name: 'Shan', count: Math.floor(Math.random() * 4) + 1 },
    { name: 'Yak', count: stats.total } // Today's cumulative proxy
  ];

  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '32px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
        <Activity color="var(--primary-color)" size={28} />
        <div>
          <h2 className="heading-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>{t('statTitle')}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>{t('statDesc')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '32px' }}>
         <div className="glass-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <Package size={16} /> <span style={{ fontSize: '0.85rem' }}>{t('statTotal')}</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stats.total}</h3>
         </div>
         <div className="glass-card" style={{ borderLeft: '4px solid var(--success-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <CheckCircle size={16} /> <span style={{ fontSize: '0.85rem' }}>{t('statDelivered')}</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stats.delivered}</h3>
         </div>
         <div className="glass-card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <Activity size={16} /> <span style={{ fontSize: '0.85rem' }}>{t('statProgress')}</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stats.delivering + stats.pending}</h3>
         </div>
         <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
              <Scale size={16} /> <span style={{ fontSize: '0.85rem' }}>{t('statWeight')}</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stats.totalWeight}</h3>
         </div>
      </div>

      <div className="grid-layout" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Pie Chart */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-main)' }}>{t('chartDistribution')}</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '8px', color: 'var(--text-main)' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-muted)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="glass-card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-main)' }}>{t('chartTimeline')}</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                <RechartsTooltip 
                  contentStyle={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="count" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary-color)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatisticsPage;
