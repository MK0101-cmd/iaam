import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { useVoiceInterface } from '../hooks/useVoiceInterface';
import { useTranslation } from '../hooks/useTranslation';

interface VoiceInterfaceProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  onVoiceCommand?: (command: string) => void;
  placeholder?: string;
  language?: string;
  className?: string;
  disabled?: boolean;
  showPlayback?: boolean;
  continuous?: boolean;
}

export function VoiceInterface({
  onTranscript,
  onVoiceCommand,
  placeholder = "Click to start voice input...",
  language,
  className = '',
  disabled = false,
  showPlayback = false,
  continuous = false
}: VoiceInterfaceProps) {
  const { t, isRTL } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    confidence,
    startListening,
    stopListening,
    clearTranscript,
    toggleListening
  } = useVoiceInterface({
    language: language || (isRTL ? 'he-IL' : 'en-US'),
    continuous,
    interimResults: true,
    onResult: (text, isFinal) => {
      onTranscript(text, isFinal);
      
      // Check for voice commands
      if (isFinal && onVoiceCommand) {
        const commands = detectVoiceCommands(text.toLowerCase());
        commands.forEach(command => onVoiceCommand(command));
      }
    },
    onError: (errorMessage) => {
      console.error('Voice interface error:', errorMessage);
    }
  });

  // Text-to-speech functionality
  const speak = (text: string) => {
    if (!text || !('speechSynthesis' in window)) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language || (isRTL ? 'he-IL' : 'en-US');
    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled) return;

      // Spacebar to toggle listening (when focused)
      if (e.code === 'Space' && e.target === document.activeElement) {
        e.preventDefault();
        toggleListening();
      }
      
      // Escape to stop listening
      if (e.code === 'Escape' && isListening) {
        stopListening();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [disabled, isListening, toggleListening, stopListening]);

  if (!isSupported) {
    return (
      <div className={`voice-interface-unsupported ${className}`}>
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
          <MicOff className="h-4 w-4" />
          <span className="text-sm">Voice input not supported in this browser</span>
        </div>
      </div>
    );
  }

  const displayText = transcript + (interimTranscript ? ` ${interimTranscript}` : '');
  const hasContent = displayText.trim().length > 0;

  return (
    <div className={`voice-interface ${className}`}>
      {/* Voice Input Controls */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={toggleListening}
          disabled={disabled}
          className={`voice-button ${isListening ? 'listening' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          } transition-all duration-200 p-3 rounded-full border-2 ${
            isListening 
              ? 'bg-red-500 border-red-600 text-white animate-pulse' 
              : 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice input (Space)'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Voice Status */}
        <div className="flex-1">
          {isListening && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Listening...</span>
              {confidence > 0 && (
                <span className="text-xs text-gray-500">
                  ({Math.round(confidence * 100)}% confidence)
                </span>
              )}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <span>⚠️ {error}</span>
            </div>
          )}
        </div>

        {/* Clear Button */}
        {hasContent && (
          <button
            onClick={clearTranscript}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Clear transcript"
          >
            <RotateCcw className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Transcript Display */}
      <div className="voice-transcript-container">
        <div className={`voice-transcript ${hasContent ? 'has-content' : ''} p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px] ${
          isListening ? 'border-blue-400 bg-blue-50' : 'bg-gray-50'
        }`}>
          {hasContent ? (
            <div className="text-gray-800">
              <span className="final-transcript">{transcript}</span>
              {interimTranscript && (
                <span className="interim-transcript text-gray-500 italic">
                  {interimTranscript}
                </span>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-center flex items-center justify-center h-full">
              <div>
                <Mic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>{placeholder}</p>
                <p className="text-xs mt-1">Press Space to start, Escape to stop</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text-to-Speech Controls */}
      {showPlayback && hasContent && (
        <div className="voice-playback-controls mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => isPlaying ? stopSpeaking() : speak(displayText)}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm">{isPlaying ? 'Stop' : 'Play back'}</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20"
                disabled={isMuted}
              />
            </div>
          </div>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="voice-commands-help mt-2">
        <details className="text-xs text-gray-600">
          <summary className="cursor-pointer hover:text-gray-800">Voice Commands</summary>
          <div className="mt-2 pl-4 space-y-1">
            <div>• "New entry" - Start a new journal entry</div>
            <div>• "Save entry" - Save the current entry</div>
            <div>• "Clear text" - Clear the current text</div>
            <div>• "Random card" - Get a new random card</div>
            <div>• "Read back" - Read the current text aloud</div>
          </div>
        </details>
      </div>
    </div>
  );
}

// Voice command detection
function detectVoiceCommands(text: string): string[] {
  const commands: string[] = [];
  
  const commandPatterns = {
    'new_entry': /(?:new|create|start)\s+(?:entry|journal|note)/i,
    'save_entry': /(?:save|finish|complete)\s+(?:entry|journal|note)/i,
    'clear_text': /(?:clear|delete|remove)\s+(?:text|content|all)/i,
    'random_card': /(?:new|random|different|another)\s+card/i,
    'read_back': /(?:read|play)\s+(?:back|aloud|out\s+loud)/i,
    'stop_listening': /(?:stop|finish|done)\s+(?:listening|recording)/i
  };

  Object.entries(commandPatterns).forEach(([command, pattern]) => {
    if (pattern.test(text)) {
      commands.push(command);
    }
  });

  return commands;
}

export default VoiceInterface;
