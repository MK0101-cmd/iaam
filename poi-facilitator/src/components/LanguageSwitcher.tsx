import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { languages, changeLanguage, getCurrentLanguage, type LanguageCode } from '../i18n/config';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'modal';
  size?: 'sm' | 'md' | 'lg';
  showFlag?: boolean;
  showNativeName?: boolean;
  className?: string;
}

export function LanguageSwitcher({ 
  variant = 'dropdown', 
  size = 'md',
  showFlag = true,
  showNativeName = true,
  className = ''
}: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = getCurrentLanguage();
  const currentLanguageInfo = languages[currentLang];

  const handleLanguageChange = (langCode: LanguageCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`
            inline-flex items-center gap-2 rounded-lg border border-neutral-200 
            bg-white hover:bg-neutral-50 transition-colors
            ${sizeClasses[size]} ${className}
          `}
          aria-label={t('language.change')}
        >
          <Globe className="w-4 h-4" />
          {showFlag && <span>{currentLanguageInfo.flag}</span>}
          <span>{showNativeName ? currentLanguageInfo.nativeName : currentLanguageInfo.name}</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900">
                  {t('language.title')}
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  {t('language.subtitle')}
                </p>
              </div>
              
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as LanguageCode)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                      transition-colors hover:bg-neutral-50
                      ${currentLang === code ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}
                    `}
                    dir={lang.dir}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{lang.nativeName}</div>
                      {lang.nativeName !== lang.name && (
                        <div className="text-sm text-neutral-500">{lang.name}</div>
                      )}
                    </div>
                    {currentLang === code && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="p-4 border-t border-neutral-200">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center gap-2 rounded-lg border border-neutral-200 
          bg-white hover:bg-neutral-50 transition-colors
          ${sizeClasses[size]} ${className}
        `}
        aria-label={t('language.change')}
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        {showFlag && <span>{currentLanguageInfo.flag}</span>}
        <span>{showNativeName ? currentLanguageInfo.nativeName : currentLanguageInfo.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg z-20">
            <div className="p-2 space-y-1">
              {Object.entries(languages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as LanguageCode)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                    transition-colors hover:bg-neutral-50
                    ${currentLang === code ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}
                  `}
                  dir={lang.dir}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{lang.nativeName}</div>
                    {lang.nativeName !== lang.name && (
                      <div className="text-xs text-neutral-500">{lang.name}</div>
                    )}
                  </div>
                  {currentLang === code && (
                    <Check className="w-4 h-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for headers/toolbars
export function LanguageSwitcherCompact({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher 
      size="sm" 
      showNativeName={false}
      className={className}
    />
  );
}

// Settings page version with modal
export function LanguageSwitcherModal({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher 
      variant="modal"
      size="lg"
      showFlag={true}
      showNativeName={true}
      className={className}
    />
  );
}

