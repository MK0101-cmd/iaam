import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSwitcherCompact } from './LanguageSwitcher';
import { Settings, User, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLanguageSwitcher?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  className?: string;
}

export function Header({ 
  title,
  subtitle,
  showLanguageSwitcher = true,
  showNotifications = true,
  showProfile = true,
  className = ''
}: HeaderProps) {
  const { t, isRTL, getDirectionClasses } = useTranslation();

  return (
    <header className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className={getDirectionClasses()}>
          {title && (
            <h1 className="text-2xl font-bold text-neutral-900 font-display">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions Section */}
        <div className={`flex items-center gap-4 ${getDirectionClasses()}`}>
          {/* Language Switcher */}
          {showLanguageSwitcher && (
            <div className="flex items-center">
              <LanguageSwitcherCompact />
            </div>
          )}

          {/* Notifications */}
          {showNotifications && (
            <button
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative"
              aria-label={t('navigation.notifications')}
            >
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          )}

          {/* Settings */}
          <button
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label={t('common.settings')}
          >
            <Settings className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Profile */}
          {showProfile && (
            <button
              className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label={t('navigation.profile')}
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {t('navigation.profile')}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// Specialized header variants
export function FacilitatorHeader() {
  const { t } = useTranslation();
  
  return (
    <Header 
      title={t('facilitator.console.title')}
      subtitle={t('facilitator.console.subtitle')}
    />
  );
}

export function ParticipantHeader() {
  const { t } = useTranslation();
  
  return (
    <Header 
      title={t('participant.dashboard.title')}
      subtitle={t('participant.dashboard.subtitle')}
    />
  );
}

export function SessionHeader({ sessionTitle }: { sessionTitle?: string }) {
  const { t } = useTranslation();
  
  return (
    <Header 
      title={sessionTitle || t('facilitator.session.title')}
      subtitle={t('facilitator.session.subtitle')}
      showNotifications={false}
    />
  );
}

