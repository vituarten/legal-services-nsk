const METRIKA_ID = 106063131;

declare global {
  interface Window {
    ym: any;
  }
}

export const initMetrikaTracking = () => {
  if (typeof window === 'undefined' || !window.ym) return;

  trackScrollDepth();
  trackTimeOnPage();
  trackOutboundLinks();
  trackFileDownloads();
  trackFormInteractions();
  trackUserEngagement();
};

const scrollDepthTracked = {
  '25': false,
  '50': false,
  '75': false,
  '100': false
};

const trackScrollDepth = () => {
  let ticking = false;

  const checkScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollPercent >= 25 && !scrollDepthTracked['25']) {
      window.ym(METRIKA_ID, 'reachGoal', 'scroll_25');
      scrollDepthTracked['25'] = true;
    }
    if (scrollPercent >= 50 && !scrollDepthTracked['50']) {
      window.ym(METRIKA_ID, 'reachGoal', 'scroll_50');
      scrollDepthTracked['50'] = true;
    }
    if (scrollPercent >= 75 && !scrollDepthTracked['75']) {
      window.ym(METRIKA_ID, 'reachGoal', 'scroll_75');
      scrollDepthTracked['75'] = true;
    }
    if (scrollPercent >= 100 && !scrollDepthTracked['100']) {
      window.ym(METRIKA_ID, 'reachGoal', 'scroll_100');
      scrollDepthTracked['100'] = true;
    }
    
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

const trackTimeOnPage = () => {
  const timeCheckpoints = [
    { seconds: 30, goal: 'time_30sec', tracked: false },
    { seconds: 60, goal: 'time_1min', tracked: false },
    { seconds: 180, goal: 'time_3min', tracked: false },
    { seconds: 300, goal: 'time_5min', tracked: false }
  ];

  const startTime = Date.now();

  const checkInterval = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    timeCheckpoints.forEach(checkpoint => {
      if (timeSpent >= checkpoint.seconds && !checkpoint.tracked) {
        window.ym(METRIKA_ID, 'reachGoal', checkpoint.goal);
        checkpoint.tracked = true;
      }
    });

    if (timeCheckpoints.every(cp => cp.tracked)) {
      clearInterval(checkInterval);
    }
  }, 5000);

  window.addEventListener('beforeunload', () => {
    clearInterval(checkInterval);
  });
};

const trackOutboundLinks = () => {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      window.ym(METRIKA_ID, 'reachGoal', 'outbound_link', {
        url: href
      });
    }

    if (href.startsWith('tel:')) {
      window.ym(METRIKA_ID, 'reachGoal', 'phone_click', {
        phone: href.replace('tel:', '')
      });
    }

    if (href.includes('t.me') || href.includes('telegram')) {
      window.ym(METRIKA_ID, 'reachGoal', 'telegram_click');
    }

    if (href.includes('wa.me') || href.includes('whatsapp')) {
      window.ym(METRIKA_ID, 'reachGoal', 'whatsapp_click');
    }

    if (href.includes('vk.com')) {
      window.ym(METRIKA_ID, 'reachGoal', 'vk_click');
    }
  }, true);
};

const trackFileDownloads = () => {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar', '.jpg', '.png'];
    const isFileDownload = fileExtensions.some(ext => href.toLowerCase().endsWith(ext));

    if (isFileDownload) {
      const fileName = href.split('/').pop() || 'unknown';
      window.ym(METRIKA_ID, 'reachGoal', 'file_download', {
        file: fileName
      });
    }
  }, true);
};

const trackFormInteractions = () => {
  const formStartTracked = new Set<HTMLFormElement>();
  let inputInteractionTracked = false;

  document.addEventListener('focus', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (!inputInteractionTracked) {
        window.ym(METRIKA_ID, 'reachGoal', 'form_interaction_start');
        inputInteractionTracked = true;
      }

      const form = target.closest('form');
      if (form && !formStartTracked.has(form)) {
        const formId = form.id || form.className || 'unnamed_form';
        window.ym(METRIKA_ID, 'reachGoal', 'form_start', {
          form: formId
        });
        formStartTracked.add(form);
      }
    }
  }, true);
};

const trackUserEngagement = () => {
  let engagementTracked = false;
  let mouseMovements = 0;
  let clicks = 0;

  const trackEngagement = () => {
    if (engagementTracked) return;
    
    if (mouseMovements > 10 || clicks > 2) {
      window.ym(METRIKA_ID, 'reachGoal', 'user_engaged');
      engagementTracked = true;
    }
  };

  document.addEventListener('mousemove', () => {
    mouseMovements++;
    if (mouseMovements === 11) trackEngagement();
  }, { passive: true });

  document.addEventListener('click', () => {
    clicks++;
    if (clicks === 3) trackEngagement();
  });

  document.addEventListener('touchstart', () => {
    if (!engagementTracked) {
      window.ym(METRIKA_ID, 'reachGoal', 'user_engaged');
      engagementTracked = true;
    }
  }, { once: true, passive: true });
};

export const trackCustomGoal = (goalName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(METRIKA_ID, 'reachGoal', goalName, params);
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(METRIKA_ID, 'hit', url, {
      title: title || document.title
    });
  }
};

export const trackEcommerce = (action: 'detail' | 'add' | 'remove' | 'purchase', product: any) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(METRIKA_ID, 'ecommerce', action, product);
  }
};
