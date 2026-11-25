import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { KeelButton } from '@/components/common/KeelButton';
import './Header.css';

export const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="site-header__left">
          <Link to="/" className="site-header__logo" aria-label="Keel Home">
            <img
              src={siteConfig.headerLogo}
              alt="Keel"
              width={90}
              height={32}
            />
          </Link>

          <nav className="site-header__nav" aria-label="Primary Navigation">
            {siteConfig.headerNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `site-header__link ${isActive ? 'is-active' : ''}`
                }
              >
                <span className="site-header__link-inner">
                  <span>{item.label}</span>
                  <span aria-hidden="true">{item.label}</span>
                </span>
              </NavLink>
            ))}

            <div
              className={`site-header__dropdown ${dropdownOpen ? 'is-open' : ''}`}
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className="site-header__dropdown-trigger"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <span>All pages</span>
                <ChevronDown
                  size={15}
                  className={`site-header__chevron ${dropdownOpen ? 'is-rotated' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <div className="site-header__dropdown-menu" role="menu">
                  <div className="site-header__dropdown-col">
                    <div className="site-header__dropdown-title">Pages</div>
                    <div className="site-header__dropdown-list">
                      {siteConfig.allPagesDropdown.pages.map((p) => (
                        <NavLink
                          key={p.to + p.label}
                          to={p.to}
                          role="menuitem"
                          className={({ isActive }) =>
                            `site-header__dropdown-link ${isActive ? 'is-active' : ''}`
                          }
                        >
                          {p.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="site-header__dropdown-col">
                    <div className="site-header__dropdown-title">Utilities</div>
                    <div className="site-header__dropdown-list">
                      {siteConfig.allPagesDropdown.utilities.map((u) => (
                        <NavLink
                          key={u.to + u.label}
                          to={u.to}
                          role="menuitem"
                          className={({ isActive }) =>
                            `site-header__dropdown-link ${isActive ? 'is-active' : ''}`
                          }
                        >
                          {u.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="site-header__actions">
          <div className="site-header__cta-desktop">
            <KeelButton label={siteConfig.primaryCtaLabel} to={siteConfig.primaryCtaHref} />
          </div>
          <button
            type="button"
            className="site-header__mobile-toggle"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="site-header__mobile-drawer" role="dialog" aria-label="Mobile Navigation">
          <div className="container site-header__mobile-content">
            <div className="site-header__mobile-group">
              <div className="site-header__dropdown-title">Pages</div>
              {siteConfig.allPagesDropdown.pages.map((p) => (
                <NavLink
                  key={p.to + p.label}
                  to={p.to}
                  className="site-header__mobile-link"
                >
                  {p.label}
                </NavLink>
              ))}
            </div>
            <div className="site-header__mobile-group">
              <div className="site-header__dropdown-title">Utilities</div>
              {siteConfig.allPagesDropdown.utilities.map((u) => (
                <NavLink
                  key={u.to + u.label}
                  to={u.to}
                  className="site-header__mobile-link"
                >
                  {u.label}
                </NavLink>
              ))}
            </div>
            <div className="site-header__mobile-cta">
              <KeelButton
                label={siteConfig.primaryCtaLabel}
                to={siteConfig.primaryCtaHref}
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
