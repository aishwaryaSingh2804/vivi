import { useEffect, useRef } from 'react';

import { Navbar } from './navigation/Navbar';

export function SiteChrome() {
  const ref = useRef<HTMLDivElement>(null);

  /*
   * Cookie banner
   *
   * The navbar is rendered as a sibling of this container so that
   * position: sticky can remain active while the page content scrolls.
   */
  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return;
    }

    const handleCookieClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest('.cookie-accept')) {
        try {
          localStorage.setItem('vivi_cookies', '1');
        } catch {
          // Ignore localStorage errors.
        }

        root.querySelector('#cookie-banner')?.remove();
      }

      if (target.closest('.cookie-reject')) {
        try {
          localStorage.setItem('vivi_cookies', '0');
        } catch {
          // Ignore localStorage errors.
        }

        root.querySelector('#cookie-banner')?.remove();
      }
    };

    root.addEventListener('click', handleCookieClick);

    return () => {
      root.removeEventListener('click', handleCookieClick);
    };
  }, []);

  /*
   * Existing account toggle event.
   */
  useEffect(() => {
    const handleAccountToggle = () => {
      const root = ref.current;

      if (!root) {
        return;
      }

      const panel = root.querySelector('#account-panel');

      if (!panel) {
        return;
      }

      root.querySelectorAll('.flyout.open').forEach((element) => {
        if (element !== panel) {
          element.classList.remove('open');
        }
      });

      panel.classList.toggle('open');
    };

    window.addEventListener('vivi:toggle-account', handleAccountToggle);

    return () => {
      window.removeEventListener('vivi:toggle-account', handleAccountToggle);
    };
  }, []);

  /*
   * Cookie banner visibility on initial load.
   */
  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return;
    }

    try {
      const cookieChoice = localStorage.getItem('vivi_cookies');

      if (cookieChoice) {
        root.querySelector('#cookie-banner')?.remove();
      } else {
        const banner = root.querySelector(
          '#cookie-banner'
        ) as HTMLElement | null;

        if (banner) {
          banner.style.display = 'flex';
        }
      }
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  return (
    <>
      {/* Shared navbar — remains present across the site's routes. */}
      <Navbar />

      
    </>
  );
}
