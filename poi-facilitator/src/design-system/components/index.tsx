import React, { forwardRef } from 'react';
import { designSystem } from '../DesignSystem';

// ===== ENHANCED BUTTON COMPONENT =====
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    | 'outline' | 'outline-success' | 'outline-danger'
    | 'ghost' | 'ghost-primary' | 'ghost-success' | 'ghost-danger'
    | 'soft' | 'soft-success' | 'soft-warning' | 'soft-danger'
    | 'warm' | 'sage' | 'ocean';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  state?: 'active' | 'inactive' | 'loading' | 'pressed';
  isLoading?: boolean;
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    state,
    isLoading = false,
    isActive = false,
    leftIcon, 
    rightIcon, 
    children, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = designSystem.components.button.base;
    const variantClasses = designSystem.components.button.variants[variant];
    const sizeClasses = designSystem.components.button.sizes[size];
    
    // Determine state classes
    let stateClasses = '';
    if (isLoading || state === 'loading') {
      stateClasses = designSystem.components.button.states.loading;
    } else if (isActive || state === 'active') {
      stateClasses = designSystem.components.button.states.active;
    } else if (state === 'inactive') {
      stateClasses = designSystem.components.button.states.inactive;
    } else if (state === 'pressed') {
      stateClasses = designSystem.components.button.states.pressed;
    }
    
    const finalLoading = isLoading || state === 'loading';
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${className}`}
        disabled={disabled || finalLoading}
        {...props}
      >
        {finalLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!finalLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!finalLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ===== INPUT COMPONENT =====
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    className = '', 
    ...props 
  }, ref) => {
    const baseClasses = designSystem.components.input.base;
    const errorClasses = error ? designSystem.components.input.error : '';
    
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${errorClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{rightIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ===== CARD COMPONENT =====
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'interactive' | 'elevated' | 'book' | 'warm';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'base', 
    padding = 'md', 
    children, 
    className = '', 
    ...props 
  }, ref) => {
    const baseClasses = designSystem.components.card.base;
    const variantClasses = designSystem.components.card[variant] || '';
    
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };
    
    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${paddingClasses[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ===== BADGE COMPONENT =====
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    dot = false, 
    children, 
    className = '', 
    ...props 
  }, ref) => {
    const baseClasses = designSystem.components.badge.base;
    const variantClasses = designSystem.components.badge.variants[variant];
    
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    };
    
    return (
      <span
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ===== NAVIGATION ITEM COMPONENT =====
interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  active?: boolean;
  badge?: string | number;
  href?: string;
}

export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ 
    icon, 
    label, 
    description, 
    active = false, 
    badge, 
    href,
    className = '', 
    onClick,
    ...props 
  }, ref) => {
    const baseClasses = designSystem.components.nav.item;
    const stateClasses = active 
      ? designSystem.components.nav.active 
      : designSystem.components.nav.inactive;
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (href) {
        window.location.hash = href;
      }
      onClick?.(e);
    };
    
    return (
      <div
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className}`}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">{label}</span>
            {badge && (
              <Badge variant="primary" size="sm" className="ml-2">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-neutral-500 mt-0.5 truncate">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

NavItem.displayName = 'NavItem';

// ===== MODAL COMPONENT =====
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };
  
  return (
    <div className={designSystem.components.modal.overlay} onClick={onClose}>
      <div 
        className={`${designSystem.components.modal.content} ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// ===== LOADING SPINNER COMPONENT =====
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
  };
  
  return (
    <div className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
        />
      </svg>
    </div>
  );
};

// ===== AVATAR COMPONENT =====
interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'rounded' | 'square';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circle'
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  
  const variantClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none',
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className={`
      inline-flex items-center justify-center bg-primary-100 text-primary-800 font-medium
      ${sizeClasses[size]} ${variantClasses[variant]}
    `}>
      {src ? (
        <img 
          src={src} 
          alt={alt || name || 'Avatar'} 
          className={`w-full h-full object-cover ${variantClasses[variant]}`}
        />
      ) : (
        <span>{name ? getInitials(name) : '?'}</span>
      )}
    </div>
  );
};

// ===== TOAST/NOTIFICATION COMPONENT =====
interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);
  
  const typeStyles = {
    success: 'bg-semantic-success-50 border-semantic-success-200 text-semantic-success-800',
    error: 'bg-semantic-error-50 border-semantic-error-200 text-semantic-error-800',
    warning: 'bg-semantic-warning-50 border-semantic-warning-200 text-semantic-warning-800',
    info: 'bg-semantic-info-50 border-semantic-info-200 text-semantic-info-800',
  };
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  
  return (
    <div className={`
      fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg border shadow-lg p-4 z-50
      transform transition-all duration-300 ease-in-out
      ${typeStyles[type]}
    `}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-lg">{icons[type]}</span>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h4 className="text-sm font-medium mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-lg hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Export all components
export {
  designSystem
};
