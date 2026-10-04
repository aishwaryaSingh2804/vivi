import type { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { HASH_TO_ROUTE } from '../../lib/routes';

type PageNavigationProps = {
  children: ReactNode;
};

export function PageNavigation({ children }: PageNavigationProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    // Handle legacy elements with data-route attributes.
    const routeElement = target.closest<HTMLElement>('[data-route]');

    if (routeElement) {
      const routeName = routeElement.dataset.route ?? '';
      const route = HASH_TO_ROUTE[`#page-${routeName}`];

      if (route) {
        event.preventDefault();
        navigate(route);
        return;
      }
    }

    // Handle legacy links such as <a href="#page-privacy">.
    const anchor = target.closest<HTMLAnchorElement>('a[href]');

    if (!anchor) return;

    const href = anchor.getAttribute('href') ?? '';

    if (href === '#') {
      event.preventDefault();
      return;
    }

    if (href.startsWith('#page-')) {
      const route = HASH_TO_ROUTE[href];

      if (route) {
        event.preventDefault();
        navigate(route);
      }
    }
  };

  return (
    <div onClick={handleClick} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}