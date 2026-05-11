import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// A simple generic success sound base64
const successSoundUrl = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAD//wEA/v8=";

const MailContext = createContext();

export const useMails = () => useContext(MailContext);

export const MailProvider = ({ children }) => {
  const [mails, setMails] = useState(() => {
    const saved = localStorage.getItem('robotMails');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [selectedMailId, setSelectedMailId] = useState(null);

  useEffect(() => {
    localStorage.setItem('robotMails', JSON.stringify(mails));
  }, [mails]);

  const playSuccessSound = () => {
    try {
      const audio = new Audio(successSoundUrl);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play error:', e));
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Mock API: Add Mail
  const addMail = (newMail) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMails((prev) => [newMail, ...prev]);
        toast.success("Yangi xat muvaffaqiyatli biriktirildi!");
        playSuccessSound();
        resolve(newMail);
      }, 800); // Simulate network delay
    });
  };

  // Mock API: Update Status
  const updateMailStatus = (id, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMails((prev) => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
        
        if (newStatus === 'delivering') {
          toast.info("Robot manzil sari yo'lga chiqdi.");
        } else if (newStatus === 'delivered') {
          toast.success("Posilka muvaffaqiyatli yetkazildi!");
          playSuccessSound();
        }
        
        resolve();
      }, 600); // Simulate network delay
    });
  };

  return (
    <MailContext.Provider value={{ mails, setMails, selectedMailId, setSelectedMailId, addMail, updateMailStatus }}>
      {children}
    </MailContext.Provider>
  );
};
