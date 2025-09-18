import { useTranslation as useI18nTranslation } from 'react-i18next';
import { getCurrentLanguageInfo, isRTL, type LanguageCode } from '../i18n/config';

// Enhanced translation hook with additional utilities
export function useTranslation(namespace?: string) {
  const { t, i18n } = useI18nTranslation(namespace);
  
  const currentLanguage = getCurrentLanguageInfo();
  const isCurrentRTL = isRTL();

  // Format numbers according to current locale
  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(i18n.language, options).format(value);
  };

  // Format dates according to current locale
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(i18n.language, options).format(dateObj);
  };

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });
    
    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (Math.abs(diffInSeconds) < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (Math.abs(diffInSeconds) < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (Math.abs(diffInSeconds) < 604800) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (Math.abs(diffInSeconds) < 2419200) {
      return rtf.format(-Math.floor(diffInSeconds / 604800), 'week');
    } else if (Math.abs(diffInSeconds) < 29030400) {
      return rtf.format(-Math.floor(diffInSeconds / 2419200), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 29030400), 'year');
    }
  };

  // Get direction classes for RTL support
  const getDirectionClasses = (additionalClasses = '') => {
    const baseClasses = isCurrentRTL ? 'rtl' : 'ltr';
    return `${baseClasses} ${additionalClasses}`.trim();
  };

  // Get text alignment classes based on language direction
  const getTextAlignClasses = () => {
    return isCurrentRTL ? 'text-right' : 'text-left';
  };

  // Get margin/padding classes that respect RTL
  const getSpacingClasses = (side: 'left' | 'right', size: string) => {
    if (isCurrentRTL) {
      return side === 'left' ? `mr-${size}` : `ml-${size}`;
    }
    return side === 'left' ? `ml-${size}` : `mr-${size}`;
  };

  // Pluralization helper
  const plural = (count: number, key: string, options?: any) => {
    return t(key, { count, ...options });
  };

  // Translation with fallback
  const tWithFallback = (key: string, fallback: string, options?: any) => {
    const translation = t(key, options);
    return translation === key ? fallback : translation;
  };

  // Check if a translation key exists
  const exists = (key: string) => {
    return i18n.exists(key);
  };

  return {
    t,
    i18n,
    currentLanguage,
    isRTL: isCurrentRTL,
    formatNumber,
    formatDate,
    formatRelativeTime,
    getDirectionClasses,
    getTextAlignClasses,
    getSpacingClasses,
    plural,
    tWithFallback,
    exists,
  };
}

// Specialized hooks for common use cases
export function useDateTranslation() {
  const { formatDate, formatRelativeTime, t } = useTranslation();

  const formatSessionDate = (date: Date | string) => {
    return formatDate(date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatSessionTime = (date: Date | string) => {
    return formatDate(date, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return t('time.minutes', { count: minutes });
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return t('time.hours', { count: hours });
      }
      return `${t('time.hours', { count: hours })} ${t('time.minutes', { count: remainingMinutes })}`;
    }
  };

  return {
    formatDate,
    formatRelativeTime,
    formatSessionDate,
    formatSessionTime,
    formatDuration,
  };
}

export function useNumberTranslation() {
  const { formatNumber } = useTranslation();

  const formatCurrency = (amount: number, currency = 'USD') => {
    return formatNumber(amount, {
      style: 'currency',
      currency,
    });
  };

  const formatPercentage = (value: number, decimals = 0) => {
    return formatNumber(value / 100, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatCount = (count: number) => {
    return formatNumber(count, {
      notation: count > 9999 ? 'compact' : 'standard',
    });
  };

  return {
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatCount,
  };
}

