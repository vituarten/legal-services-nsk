export const ABTesting = {
  getVariant: (testName: string): 'a' | 'b' => {
    const storageKey = `ab_test_${testName}`;
    const savedVariant = localStorage.getItem(storageKey) as 'a' | 'b';
    
    if (savedVariant) {
      return savedVariant;
    }
    
    const variant = Math.random() > 0.5 ? 'b' : 'a';
    localStorage.setItem(storageKey, variant);
    
    if (window.gtag) {
      window.gtag('event', 'ab_test_assignment', {
        test_name: testName,
        variant: variant === 'a' ? 'light' : 'dark',
      });
    }
    
    return variant;
  },

  trackGoal: (goalName: string, variant: 'a' | 'b', value?: number) => {
    const eventData = {
      event_category: 'AB Testing',
      event_label: `damage_claim_${variant === 'a' ? 'light' : 'dark'}`,
      value: value || 1
    };

    if (window.gtag) {
      window.gtag('event', goalName, eventData);
    }

    console.log(`Goal tracked: ${goalName} for variant ${variant === 'a' ? 'light' : 'dark'}`, eventData);
  }
};
