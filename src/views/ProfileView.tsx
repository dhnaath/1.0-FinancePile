import React, { useState } from 'react';
import { ArrowLeft, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export function ProfileView({ onBack, onUnavailable }: { onBack: () => void, onUnavailable?: () => void }) {
  const [userProfile, setUserProfile] = useState<{name: string, email: string, picture?: string} | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  
  const [localName, setLocalName] = useState(() => localStorage.getItem('localName') || '');
  const [dob, setDob] = useState(() => localStorage.getItem('localDob') || '');

  React.useEffect(() => {
    localStorage.setItem('localName', localName);
  }, [localName]);

  React.useEffect(() => {
    localStorage.setItem('localDob', dob);
  }, [dob]);

  const calculateAge = (dobString: string) => {
    if (!dobString) return null;
    const diff_ms = Date.now() - new Date(dobString).getTime();
    if (diff_ms < 0) return 0;
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  React.useEffect(() => {
    const token = localStorage.getItem('googleAccessToken');
    if (token) {
      setAccessToken(token);
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          setUserProfile({
            name: data.name,
            email: data.email,
            picture: data.picture,
          });
        }
      })
      .catch(console.error);
    }
  }, []);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.file',
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      // Fetch user info
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        setUserProfile({
          name: data.name,
          email: data.email,
          picture: data.picture,
        });
        // Store token in global or localStorage for backup use
        localStorage.setItem('googleAccessToken', tokenResponse.access_token);
      } catch (err) {
        console.error('Failed to fetch user info', err);
      }
    },
    onError: error => console.error('Login Failed', error)
  });

  const logout = () => {
    setUserProfile(null);
    setAccessToken('');
    localStorage.removeItem('googleAccessToken');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] sm:max-w-md w-full relative z-50">
      <div className="flex items-center gap-6 p-4 pt-5 mb-2">
        <button onClick={onBack}><ArrowLeft size={24} className="text-gray-100 hover:text-gray-100 transition-colors" /></button>
        <h1 className="text-lg font-normal text-gray-100">Profil Saya</h1>
      </div>
      <div className="flex-1 p-4">
        {userProfile ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#212121] rounded-2xl border border-[#2a2a2a] mb-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[#4caf50]"><CheckCircle2 size={24} /></div>
            {userProfile.picture ? (
              <img src={userProfile.picture} alt="Profile" className="w-20 h-20 rounded-full mb-4 border-2 border-[#2a2a2a]" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4 text-gray-400">
                <User size={40} />
              </div>
            )}
            <h2 className="text-lg font-medium text-gray-100 mb-1">{userProfile.name}</h2>
            <p className="text-sm text-gray-400 mb-6">{userProfile.email}</p>
            <div className="flex gap-3">
              <button onClick={logout} className="px-5 py-2 border border-red-900/50 text-red-400 rounded-full text-sm font-medium hover:bg-red-900/20 transition-colors flex items-center gap-2">
                 <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#212121] rounded-2xl border border-[#2a2a2a] mb-6">
            <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4 text-gray-400">
              <User size={40} />
            </div>
            <h2 className="text-lg font-medium text-gray-100 mb-2">Belum Masuk</h2>
            <p className="text-sm text-gray-400 mb-6">Masuk untuk mengaktifkan fitur pencadangan online.</p>
            <button onClick={() => login()} className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
        
        <div className="bg-[#212121] rounded-2xl border border-[#2a2a2a] p-4 flex flex-col gap-4">
          <div className="text-gray-100 font-medium mb-1">Pengaturan Profil Lokal</div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Nama Panggilan</label>
            <input 
              type="text" 
              value={localName} 
              onChange={(e) => setLocalName(e.target.value)}
              maxLength={19}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-gray-100 outline-none focus:border-[#555]"
              placeholder="Masukkan nama"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400 flex justify-between">
              <span>Tanggal Lahir</span>
              {calculateAge(dob) !== null && <span className="text-[#4caf50]">Usia: {calculateAge(dob)} tahun</span>}
            </label>
            <input 
              type="date" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-gray-100 outline-none focus:border-[#555] [color-scheme:dark]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center px-4 bg-[#212121] rounded-2xl border border-[#2a2a2a]">
      <div className="text-gray-400 mb-2 font-medium">{title}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </div>
  );
}
