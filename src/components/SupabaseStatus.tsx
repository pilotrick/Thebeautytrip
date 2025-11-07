import { useState, useEffect } from 'react';
import { Database, Wifi, WifiOff } from 'lucide-react';

export function SupabaseStatus() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check connection to Supabase
    const checkConnection = async () => {
      try {
        const response = await fetch(
          `https://aaghurebrsqikulyfsbm.supabase.co/functions/v1/make-server-1f5586cd/health`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZ2h1cmVicnNxaWt1bHlmc2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NzYwNDEsImV4cCI6MjA3NjI1MjA0MX0.dgcTNXRRgOxttOu-JnS6rngzjgyPW6Ek2dlIBh8YTr4`,
            },
          }
        );

        if (response.ok) {
          setConnected(true);
          // Auto-hide after 5 seconds if connected
          setTimeout(() => setShow(false), 5000);
        } else {
          setConnected(false);
        }
      } catch (error) {
        console.error('Connection check failed:', error);
        setConnected(false);
      }
    };

    checkConnection();
  }, []);

  if (!show || connected === null) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: connected ? '#10b981' : '#ef4444',
        color: 'white',
      }}
      onClick={() => setShow(false)}
    >
      <div className="flex items-center gap-2">
        {connected ? (
          <>
            <Database className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <span className="text-sm" style={{ fontWeight: '600' }}>
              Connected to Supabase
            </span>
          </>
        ) : (
          <>
            <Database className="w-4 h-4" />
            <WifiOff className="w-4 h-4" />
            <span className="text-sm" style={{ fontWeight: '600' }}>
              Supabase Offline
            </span>
          </>
        )}
      </div>
    </div>
  );
}
