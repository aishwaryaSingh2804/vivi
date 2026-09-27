import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { chromeContent } from '../content';
import { Navbar } from './navigation/Navbar';

export function SiteChrome() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  /*
   * Hide the main navbar on Studio.
   *
   * The new React Navbar uses id="main-nav",
   * so we can preserve the existing Studio behavior.
   */
  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return;
    }

    const nav = root.querySelector(
      '#main-nav'
    ) as HTMLElement | null;

    if (nav) {
      nav.style.display =
        location.pathname === '/studio'
          ? 'none'
          : '';
    }
  }, [location.pathname]);

  /*
   * Cookie banner
   *
   * We are keeping this legacy functionality
   * because it is unrelated to the navbar.
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
          localStorage.setItem(
            'vivi_cookies',
            '1'
          );
        } catch {
          // Ignore localStorage errors.
        }

        root
          .querySelector('#cookie-banner')
          ?.remove();
      }

      if (target.closest('.cookie-reject')) {
        try {
          localStorage.setItem(
            'vivi_cookies',
            '0'
          );
        } catch {
          // Ignore localStorage errors.
        }

        root
          .querySelector('#cookie-banner')
          ?.remove();
      }
    };

    root.addEventListener(
      'click',
      handleCookieClick
    );

    return () => {
      root.removeEventListener(
        'click',
        handleCookieClick
      );
    };
  }, []);

  /*
   * Existing account toggle event.
   *
   * This keeps the old account panel working
   * without bringing back the old navbar logic.
   */
  useEffect(() => {
    const handleAccountToggle = () => {
      const root = ref.current;

      if (!root) {
        return;
      }

      const panel =
        root.querySelector(
          '#account-panel'
        );

      if (!panel) {
        return;
      }

      root
        .querySelectorAll('.flyout.open')
        .forEach((element) => {
          if (element !== panel) {
            element.classList.remove('open');
          }
        });

      panel.classList.toggle('open');
    };

    window.addEventListener(
      'vivi:toggle-account',
      handleAccountToggle
    );

    return () => {
      window.removeEventListener(
        'vivi:toggle-account',
        handleAccountToggle
      );
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
      const cookieChoice =
        localStorage.getItem(
          'vivi_cookies'
        );

      if (cookieChoice) {
        root
          .querySelector('#cookie-banner')
          ?.remove();
      } else {
        const banner =
          root.querySelector(
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
    <div
      ref={ref}
      className="site-chrome"
    >
      {/* New React navbar */}
      <Navbar />

      {/* Existing notification system */}
      <div
        dangerouslySetInnerHTML={{
          __html: chromeContent.notifications,
        }}
      />

      {/* Existing account system */}
      <div
        dangerouslySetInnerHTML={{
          __html: chromeContent.account,
        }}
      />

      {/* Existing cookie banner */}
      <div
        dangerouslySetInnerHTML={{
          __html: chromeContent.cookie,
        }}
      />
    </div>
  );
}