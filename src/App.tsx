import { useState, useEffect } from 'react';
import DamageClaim from './pages/DamageClaim';
import DamageClaimB from './pages/DamageClaimB';
import { ABTesting } from './utils/abTesting';

function App() {
  const [variant, setVariant] = useState<'a' | 'b'>('a');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testVariant = ABTesting.getVariant('damage_claim_design');
    setVariant(testVariant);
    setIsLoading(false);

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        variant: testVariant === 'a' ? 'light' : 'dark',
        page_title: 'Damage Claim Landing',
        page_location: window.location.href
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {variant === 'a' ? <DamageClaim /> : <DamageClaimB />}
      
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg border border-red-500">
          Версия: {variant === 'a' ? 'Светлая (A)' : 'Темная (B)'}
        </div>
      </div>
    </div>
  );
}

export default App;
