import { useState, useEffect, useRef, useCallback } from 'react';

interface VoiceInterfaceOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface VoiceInterfaceState {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  confidence: number;
}

export const useVoiceInterface = (options: VoiceInterfaceOptions = {}) => {
  const {
    language = 'en-US',
    continuous = false,
    interimResults = true,
    onResult,
    onError,
    onStart,
    onEnd
  } = options;

  const [state, setState] = useState<VoiceInterfaceState>({
    isSupported: false,
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null,
    confidence: 0
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSupported = !!SpeechRecognition;
    
    setState(prev => ({ ...prev, isSupported }));

    if (isSupported) {
      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setState(prev => ({ ...prev, isListening: true, error: null }));
        onStart?.();
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          
          if (result.isFinal) {
            finalTranscript += transcript;
            setState(prev => ({ 
              ...prev, 
              transcript: prev.transcript + transcript,
              confidence: result[0].confidence || 0
            }));
            onResult?.(transcript, true);
          } else {
            interimTranscript += transcript;
            setState(prev => ({ ...prev, interimTranscript }));
            onResult?.(transcript, false);
          }
        }
      };

      recognition.onerror = (event) => {
        const errorMessage = getErrorMessage(event.error);
        setState(prev => ({ ...prev, error: errorMessage, isListening: false }));
        onError?.(errorMessage);
      };

      recognition.onend = () => {
        setState(prev => ({ ...prev, isListening: false, interimTranscript: '' }));
        onEnd?.();
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language, continuous, interimResults, onResult, onError, onStart, onEnd]);

  const startListening = useCallback(() => {
    if (!state.isSupported || !recognitionRef.current) {
      const error = 'Speech recognition not supported';
      setState(prev => ({ ...prev, error }));
      onError?.(error);
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      const errorMessage = 'Failed to start speech recognition';
      setState(prev => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [state.isSupported, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
    }
  }, [state.isListening]);

  const clearTranscript = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      transcript: '', 
      interimTranscript: '', 
      error: null,
      confidence: 0 
    }));
  }, []);

  // Auto-stop after silence (for non-continuous mode)
  useEffect(() => {
    if (state.isListening && !continuous) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        stopListening();
      }, 5000); // Stop after 5 seconds of silence
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.isListening, continuous, stopListening]);

  return {
    ...state,
    startListening,
    stopListening,
    clearTranscript,
    toggleListening: state.isListening ? stopListening : startListening
  };
};

// Helper function to get user-friendly error messages
function getErrorMessage(error: string): string {
  switch (error) {
    case 'no-speech':
      return 'No speech detected. Please try again.';
    case 'audio-capture':
      return 'Audio capture failed. Please check your microphone.';
    case 'not-allowed':
      return 'Microphone access denied. Please allow microphone permissions.';
    case 'network':
      return 'Network error. Please check your internet connection.';
    case 'language-not-supported':
      return 'Language not supported.';
    case 'service-not-allowed':
      return 'Speech recognition service not allowed.';
    default:
      return `Speech recognition error: ${error}`;
  }
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
