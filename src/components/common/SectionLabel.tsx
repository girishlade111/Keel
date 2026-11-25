import React from 'react';

interface SectionLabelProps {
  label: string;
  index?: string;
  variant?: 'default' | 'light' | 'pill';
  showDot?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  index,
  variant = 'default',
  showDot = true,
  className = '',
}) => {
  const iconSrc =
    variant === 'light'
      ? '/assets/images/mockups/6ab37e6405f027a4fb36a254_Group_20239710.svg'
      : '/assets/images/mockups/6ab213f89f608d8185cc1b43_Group_20239710.svg';

  const classes = [
    'keel-section-label',
    variant === 'light' ? 'keel-section-label--light' : '',
    variant === 'pill' ? 'keel-section-label--pill' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {showDot && (
        <span className="keel-section-label__dot" aria-hidden="true">
          <img src={iconSrc} alt="" width={22} height={22} />
        </span>
      )}
      <span>{label}</span>
      {index && (
        <>
          <span aria-hidden="true">/</span>
          <span>{index}</span>
        </>
      )}
    </div>
  );
};
