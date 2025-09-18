import React, { useState } from 'react';
import { useTranslation, useDateTranslation, useNumberTranslation } from '../hooks/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Globe, Calendar, Hash, MessageSquare, Star } from 'lucide-react';

/**
 * Demo component showcasing multilingual features
 * This component demonstrates:
 * - Basic translations
 * - Interpolation
 * - Date/number formatting
 * - RTL support
 * - Language switching
 */
export function MultilingualDemo() {
  const { t, isRTL, getDirectionClasses, currentLanguage } = useTranslation();
  const { formatSessionDate, formatDuration, formatRelativeTime } = useDateTranslation();
  const { formatNumber, formatPercentage, formatCount } = useNumberTranslation();
  
  const [participantName] = useState('Sarah');
  const [sessionCount] = useState(42);
  const [completionRate] = useState(0.847);
  const [lastActivity] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
  const [sessionDate] = useState(new Date());

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-8 ${getDirectionClasses()}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Globe className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-neutral-900 font-display">
            {t('demo.title', { app: 'Points of You AI Studio' })}
          </h1>
        </div>
        <p className="text-lg text-neutral-600">
          {t('demo.subtitle')}
        </p>
        
        {/* Language Switcher */}
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Current Language Info */}
      <div className="bg-primary-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {t('demo.currentLanguage')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-primary-700">{t('language.current')}:</span>
            <p className="text-primary-900">{currentLanguage.nativeName} ({currentLanguage.name})</p>
          </div>
          <div>
            <span className="font-medium text-primary-700">{t('demo.direction')}:</span>
            <p className="text-primary-900">{isRTL ? t('demo.rtl') : t('demo.ltr')}</p>
          </div>
          <div>
            <span className="font-medium text-primary-700">{t('demo.flag')}:</span>
            <p className="text-2xl">{currentLanguage.flag}</p>
          </div>
        </div>
      </div>

      {/* Basic Translations */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {t('demo.basicTranslations')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'common.save',
            'common.cancel',
            'common.edit',
            'common.delete',
            'navigation.journeys',
            'navigation.library',
            'navigation.reports',
            'navigation.settings'
          ].map((key) => (
            <div key={key} className="p-3 bg-neutral-50 rounded">
              <code className="text-xs text-neutral-500 block mb-1">{key}</code>
              <p className="font-medium text-neutral-900">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interpolation Examples */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          {t('demo.interpolation')}
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              {t('demo.welcomeMessage', { name: participantName })}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-900">
              {t('demo.sessionCount', { count: sessionCount })}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-900">
              {t('demo.completionMessage', { 
                name: participantName, 
                percentage: Math.round(completionRate * 100) 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Date and Number Formatting */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {t('demo.formatting')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Formatting */}
          <div>
            <h3 className="font-medium text-neutral-700 mb-3">{t('demo.dateFormatting')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.sessionDate')}:</span>
                <span className="font-mono">{formatSessionDate(sessionDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.lastActivity')}:</span>
                <span className="font-mono">{formatRelativeTime(lastActivity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.duration')}:</span>
                <span className="font-mono">{formatDuration(90)}</span>
              </div>
            </div>
          </div>

          {/* Number Formatting */}
          <div>
            <h3 className="font-medium text-neutral-700 mb-3">{t('demo.numberFormatting')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.participants')}:</span>
                <span className="font-mono">{formatNumber(1234)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.completion')}:</span>
                <span className="font-mono">{formatPercentage(completionRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">{t('demo.totalSessions')}:</span>
                <span className="font-mono">{formatCount(15420)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RTL Demonstration */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          {t('demo.rtlDemo')}
        </h2>
        <div className="space-y-4">
          <p className="text-neutral-600">
            {t('demo.rtlDescription')}
          </p>
          
          {/* Layout Demo */}
          <div className={`flex items-center gap-4 p-4 bg-neutral-50 rounded-lg ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-neutral-900">{t('demo.layoutTest')}</h3>
              <p className="text-sm text-neutral-600">{t('demo.layoutDescription')}</p>
            </div>
            <div className={`px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
              {t('demo.badge')}
            </div>
          </div>

          {/* Text Direction Demo */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800" dir={isRTL ? 'rtl' : 'ltr'}>
              {t('demo.textDirectionExample')}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          {t('demo.features')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <Globe className="w-5 h-5" />,
              title: t('demo.feature.multiLanguage'),
              description: t('demo.feature.multiLanguageDesc')
            },
            {
              icon: <MessageSquare className="w-5 h-5" />,
              title: t('demo.feature.rtlSupport'),
              description: t('demo.feature.rtlSupportDesc')
            },
            {
              icon: <Calendar className="w-5 h-5" />,
              title: t('demo.feature.localeFormatting'),
              description: t('demo.feature.localeFormattingDesc')
            },
            {
              icon: <Hash className="w-5 h-5" />,
              title: t('demo.feature.interpolation'),
              description: t('demo.feature.interpolationDesc')
            },
            {
              icon: <Star className="w-5 h-5" />,
              title: t('demo.feature.accessibility'),
              description: t('demo.feature.accessibilityDesc')
            },
            {
              icon: <MessageSquare className="w-5 h-5" />,
              title: t('demo.feature.contextAware'),
              description: t('demo.feature.contextAwareDesc')
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-neutral-900">{feature.title}</h3>
              </div>
              <p className="text-sm text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">
          {t('demo.instructions')}
        </h2>
        <ul className="space-y-2 text-blue-700">
          <li>• {t('demo.instruction1')}</li>
          <li>• {t('demo.instruction2')}</li>
          <li>• {t('demo.instruction3')}</li>
          <li>• {t('demo.instruction4')}</li>
        </ul>
      </div>
    </div>
  );
}

