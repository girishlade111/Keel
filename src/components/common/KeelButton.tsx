import React from 'react';
import { Link } from 'react-router-dom';

interface KeelButtonProps {
  label: string;
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'dark' | 'light';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export const KeelButton: React.FC<KeelButtonProps> = ({
  label,
  to,
  href,
  type = 'button',
  variant = 'dark',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
}) => {
  const classes = [
    'keel-btn',
    variant === 'light' ? 'keel-btn--light' : '',
    fullWidth ? 'keel-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className="keel-btn__rim" aria-hidden="true" />
      <span className="keel-btn__inner">
        <span className="keel-btn__text-wrap">
          <span className="keel-btn__text-normal">{label}</span>
          <span className="keel-btn__text-hover" aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel || label}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel || label}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {inner}
    </button>
  );
};
