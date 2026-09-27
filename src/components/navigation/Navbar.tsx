import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';

type DropdownItem = {
  label: string;
  path: string;
};

type NavItem = {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Create',
    dropdown: [
      { label: 'India', path: ROUTES.INDIA },
      { label: 'Kids', path: ROUTES.KIDS },
      { label: 'Microdrama', path: ROUTES.MICRODRAMA },
      { label: 'History', path: ROUTES.HISTORY },
    ],
  },
  {
    label: 'Community',
    path: ROUTES.COMMUNITY,
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Credit Calculator', path: ROUTES.CREDITS },
      { label: 'How to use Vivi', path: ROUTES.HOW_TO_USE },
      { label: 'Blog', path: ROUTES.BLOG },
      { label: 'FAQ', path: ROUTES.FAQ },
      { label: 'Contact', path: ROUTES.CONTACT },
    ],
  },
  {
    label: 'Pricing',
    path: ROUTES.PRICING,
  },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const closeMenu = () => {
    setOpenMenu(null);
  };

  return (
    <header id="main-nav" className="vivi-navbar">
      <div className="vivi-navbar-inner">

        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="vivi-navbar-logo"
          onClick={closeMenu}
        >
          Vivi
        </Link>

        {/* Desktop navigation */}
        <nav
          className="vivi-navbar-links"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.dropdown);

            return (
              <div
                key={item.label}
                className={`vivi-nav-item ${
                  openMenu === item.label ? 'is-open' : ''
                }`}
                onMouseEnter={() => {
                  if (hasDropdown) {
                    setOpenMenu(item.label);
                  }
                }}
                onMouseLeave={() => {
                  if (hasDropdown) {
                    setOpenMenu(null);
                  }
                }}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className="vivi-nav-link"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="vivi-nav-link vivi-nav-trigger"
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}

                    <span
                      className="vivi-nav-chevron"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </button>
                )}

                {item.dropdown && (
                  <div className="vivi-nav-dropdown">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.path}
                        to={dropdownItem.path}
                        className="vivi-nav-dropdown-link"
                        onClick={closeMenu}
                      >
                        <span>{dropdownItem.label}</span>

                        <span aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="vivi-navbar-actions">

          <Link
            to={ROUTES.LOGIN}
            className="vivi-navbar-login"
            onClick={closeMenu}
          >
            Log in
          </Link>

          <Link
            to={ROUTES.SIGNUP}
            className="vivi-navbar-signup"
            onClick={closeMenu}
          >
            Sign up
          </Link>

          {/* <Link
            to={ROUTES.LOGIN}
            className="vivi-navbar-create"
            onClick={closeMenu}
          >
            Start creating
            <span aria-hidden="true">→</span>
          </Link> */}

        </div>

      </div>
    </header>
  );
}