import React, { useState, useMemo } from "react";
import {
  BookOpen, Calendar, Users, Settings, Home, Plus, Search, Filter, 
  ChevronDown, Star, Clock, CheckCircle, Circle, Heart, MessageSquare,
  Camera, Mic, Video, Phone, Edit3, Save, Trash2, ArrowLeft, 
  TrendingUp, Target, Lightbulb, Award, Share2
} from "lucide-react";
import { Button } from "./design-system/components";
import { CardDisplay, CardStack } from "./components/CardDisplay";
import { VoiceInterface } from "./components/VoiceInterface";
import { allCards, getRandomCards, getCardsByCategory, getCardById, type Card } from "./data/cards";

/*
  Participant Experience UI - Comprehensive mockup for POY participants
  Includes: Dashboard, Journal, Session participation, Progress tracking
  Features: Reflection prompts, card interactions, goal setting, insights
*/

type ParticipantView = "dashboard" | "journal" | "sessions" | "progress" | "settings";
type SessionState = "upcoming" | "live" | "completed";

export default function ParticipantExperience() {
  // Book-like interface styles
  const bookStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
    
    .book-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      perspective: 1000px;
    }
    
    .book-spine {
      position: absolute;
      left: -8px;
      top: 0;
      bottom: 0;
      width: 16px;
      background: linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
      border-radius: 8px 0 0 8px;
      box-shadow: -2px 0 8px rgba(0,0,0,0.3);
      z-index: 1;
      position: relative;
    }
    
    .book-spine::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 20%, rgba(0,0,0,0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(0,0,0,0.1) 0%, transparent 50%);
      border-radius: 8px 0 0 8px;
    }
    
    .book-spine::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255,255,255,0.1) 20%, 
        rgba(255,255,255,0.2) 50%, 
        rgba(255,255,255,0.1) 80%, 
        transparent 100%);
      border-radius: 8px 0 0 8px;
    }
    
    .book-pages {
      position: relative;
      background: #f8f6f0;
      border-radius: 0 12px 12px 0;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      overflow: hidden;
      border: 1px solid #e5e0d6;
      background-image: 
        linear-gradient(90deg, transparent 0%, transparent 98%, rgba(0,0,0,0.02) 100%),
        linear-gradient(0deg, transparent 0%, transparent 98%, rgba(0,0,0,0.01) 100%);
      background-size: 100% 100%, 100% 100%;
    }
    
    .book-pages::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(0,0,0,0.02) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(0,0,0,0.01) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .book-page {
      background: #fefefe;
      margin: 2px;
      border-radius: 0 8px 8px 0;
      padding: 24px 32px;
      border-left: 1px solid #e5e0d6;
      border-right: 1px solid #d4c4a8;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      animation: pageAppear 0.6s ease-out var(--page-delay, 0s) both;
      min-height: 200px;
      background-image: 
        linear-gradient(90deg, transparent 0%, transparent 98%, rgba(0,0,0,0.03) 100%),
        linear-gradient(0deg, transparent 0%, transparent 98%, rgba(0,0,0,0.02) 100%);
      background-size: 100% 100%, 100% 100%;
    }
    
    .book-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(0,0,0,0.005) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .book-page:hover {
      transform: translateX(4px) rotate(0.5deg);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      z-index: 2;
    }
    
    .book-page.active {
      transform: translateX(8px) rotate(0.3deg);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: 3;
      border-left: 2px solid #3b82f6;
    }
    
    .book-page:nth-child(odd) {
      transform: rotate(-0.2deg);
    }
    
    .book-page:nth-child(even) {
      transform: rotate(0.1deg);
    }
    
    .book-page:nth-child(3n) {
      transform: rotate(0.3deg);
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e0d6;
      position: relative;
    }
    
    .page-header::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(139, 115, 85, 0.3) 20%, 
        rgba(139, 115, 85, 0.5) 50%, 
        rgba(139, 115, 85, 0.3) 80%, 
        transparent 100%);
    }
    
    .page-number {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 16px;
      color: #8B7355;
      font-weight: 600;
      transform: rotate(-1deg);
      letter-spacing: 1px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .page-number::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: radial-gradient(circle, rgba(139, 115, 85, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    
    .page-date {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 13px;
      color: #8B7355;
      font-style: italic;
      transform: rotate(0.5deg);
      letter-spacing: 0.5px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    
    .page-title {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 20px;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 20px;
      line-height: 1.4;
      letter-spacing: 0.5px;
      transform: rotate(-0.5deg);
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .page-title::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(26, 32, 44, 0.2) 20%, 
        rgba(26, 32, 44, 0.4) 50%, 
        rgba(26, 32, 44, 0.2) 80%, 
        transparent 100%);
      transform: rotate(-0.5deg);
    }
    
    .page-content {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 15px;
      line-height: 1.8;
      color: #2d3748;
      margin-bottom: 24px;
      text-align: left;
      letter-spacing: 0.3px;
      word-spacing: 1px;
      position: relative;
      text-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    
    .page-content p {
      margin: 0 0 12px 0;
      position: relative;
    }
    
    .page-content p:nth-child(odd) {
      transform: translateX(2px) rotate(0.1deg);
    }
    
    .page-content p:nth-child(even) {
      transform: translateX(-1px) rotate(-0.1deg);
    }
    
    .page-content p:nth-child(3n) {
      transform: translateX(1px) rotate(0.2deg);
    }
    
    .page-content p:nth-child(4n) {
      transform: translateX(-2px) rotate(-0.2deg);
    }
    
    .page-content::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        rgba(139, 115, 85, 0.1) 20%, 
        rgba(139, 115, 85, 0.2) 50%, 
        rgba(139, 115, 85, 0.1) 80%, 
        transparent 100%);
      transform: rotate(0.5deg);
    }
    
    .page-content::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        rgba(139, 115, 85, 0.05) 20%, 
        rgba(139, 115, 85, 0.1) 50%, 
        rgba(139, 115, 85, 0.05) 80%, 
        transparent 100%);
      transform: rotate(-0.3deg);
    }
    
    .page-content p::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        rgba(139, 115, 85, 0.03) 20%, 
        rgba(139, 115, 85, 0.06) 50%, 
        rgba(139, 115, 85, 0.03) 80%, 
        transparent 100%);
      transform: rotate(0.2deg);
    }
    
    .page-content p::after {
      content: '';
      position: absolute;
      right: -12px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        rgba(139, 115, 85, 0.02) 20%, 
        rgba(139, 115, 85, 0.04) 50%, 
        rgba(139, 115, 85, 0.02) 80%, 
        transparent 100%);
      transform: rotate(-0.1deg);
    }
    
    .page-content p:nth-child(odd)::before {
      transform: rotate(0.3deg);
    }
    
    .page-content p:nth-child(even)::before {
      transform: rotate(-0.1deg);
    }
    
    .page-content p:nth-child(3n)::before {
      transform: rotate(0.1deg);
    }
    
    .page-content p:nth-child(4n)::before {
      transform: rotate(-0.2deg);
    }
    
    .page-content p:nth-child(odd)::after {
      transform: rotate(-0.2deg);
    }
    
    .page-content p:nth-child(even)::after {
      transform: rotate(0.1deg);
    }
    
    .page-content p:nth-child(3n)::after {
      transform: rotate(-0.1deg);
    }
    
    .page-content p:nth-child(4n)::after {
      transform: rotate(0.2deg);
    }
    
    .page-content p:nth-child(odd)::before {
      transform: rotate(0.3deg);
    }
    
    .page-content p:nth-child(even)::before {
      transform: rotate(-0.1deg);
    }
    
    .page-content p:nth-child(3n)::before {
      transform: rotate(0.1deg);
    }
    
    .page-content p:nth-child(4n)::before {
      transform: rotate(-0.2deg);
    }
    
    .page-content p:nth-child(odd)::after {
      transform: rotate(-0.2deg);
    }
    
    .page-content p:nth-child(even)::after {
      transform: rotate(0.1deg);
    }
    
    .page-content p:nth-child(3n)::after {
      transform: rotate(-0.1deg);
    }
    
    .page-content p:nth-child(4n)::after {
      transform: rotate(0.2deg);
    }
    
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 12px;
      border-top: 2px solid #e5e0d6;
      position: relative;
    }
    
    .page-footer::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(139, 115, 85, 0.3) 20%, 
        rgba(139, 115, 85, 0.5) 50%, 
        rgba(139, 115, 85, 0.3) 80%, 
        transparent 100%);
    }
    
    .mood-badge {
      padding: 6px 10px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      transform: rotate(-0.5deg);
      letter-spacing: 0.5px;
      border: 2px solid;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .mood-badge::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 16px;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
      pointer-events: none;
    }
    
    .mood-inspired { 
      background: #fef3c7; 
      color: #92400e; 
      border-color: #f59e0b;
    }
    .mood-grateful { 
      background: #d1fae5; 
      color: #065f46; 
      border-color: #10b981;
    }
    .mood-proud { 
      background: #dbeafe; 
      color: #1e40af; 
      border-color: #3b82f6;
    }
    .mood-hopeful { 
      background: #f3e8ff; 
      color: #7c3aed; 
      border-color: #8b5cf6;
    }
    
    .page-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .tag {
      font-size: 11px;
      color: #6b7280;
      background: #f8fafc;
      padding: 4px 8px;
      border-radius: 12px;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      transform: rotate(0.5deg);
      letter-spacing: 0.3px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      position: relative;
    }
    
    .tag:nth-child(odd) {
      transform: rotate(-0.3deg);
    }
    
    .tag:nth-child(even) {
      transform: rotate(0.7deg);
    }
    
    .tag:nth-child(3n) {
      transform: rotate(0.2deg);
    }
    
    @keyframes pageAppear {
      from {
        opacity: 0;
        transform: translateX(-20px) rotateY(-5deg);
      }
      to {
        opacity: 1;
        transform: translateX(0) rotateY(0deg);
      }
    }
    
    /* AI Journal Interface - Handwritten Style */
    .ai-journal-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      perspective: 1000px;
    }
    
    .ai-journal-spine {
      position: absolute;
      left: -8px;
      top: 0;
      bottom: 0;
      width: 16px;
      background: linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
      border-radius: 8px 0 0 8px;
      box-shadow: -2px 0 8px rgba(0,0,0,0.3);
      z-index: 1;
    }
    
    .ai-journal-pages {
      position: relative;
      background: #f8f6f0;
      border-radius: 0 12px 12px 0;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      overflow: hidden;
      border: 1px solid #e5e0d6;
    }
    
    .ai-journal-page {
      background: #fefefe;
      margin: 2px;
      border-radius: 0 8px 8px 0;
      padding: 24px 32px;
      border-left: 1px solid #e5e0d6;
      border-right: 1px solid #d4c4a8;
      position: relative;
      min-height: 400px;
      background-image: 
        linear-gradient(90deg, transparent 0%, transparent 98%, rgba(0,0,0,0.03) 100%),
        linear-gradient(0deg, transparent 0%, transparent 98%, rgba(0,0,0,0.02) 100%);
      background-size: 100% 100%, 100% 100%;
    }
    
    .ai-journal-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0,0,0,0.01) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(0,0,0,0.005) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .ai-journal-header {
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e5e0d6;
      position: relative;
    }
    
    .ai-journal-header::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(139, 115, 85, 0.3) 20%, 
        rgba(139, 115, 85, 0.5) 50%, 
        rgba(139, 115, 85, 0.3) 80%, 
        transparent 100%);
    }
    
    .ai-journal-title {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 22px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 8px;
      transform: rotate(-0.5deg);
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .ai-journal-subtitle {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 14px;
      color: #8B7355;
      font-style: italic;
      transform: rotate(0.3deg);
      letter-spacing: 0.3px;
    }
    
    .ai-journal-content {
      margin-bottom: 24px;
    }
    
    .ai-journal-prompt {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 14px;
      color: #2d3748;
      margin-bottom: 16px;
      transform: rotate(0.2deg);
      letter-spacing: 0.3px;
    }
    
    .ai-journal-textarea {
      width: 100%;
      height: 80px;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 14px;
      line-height: 1.6;
      color: #2d3748;
      background: transparent;
      border: none;
      outline: none;
      resize: none;
      letter-spacing: 0.3px;
      word-spacing: 1px;
    }
    
    .ai-journal-textarea::placeholder {
      color: #9ca3af;
      font-style: italic;
    }
    
    .ai-journal-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #e5e0d6;
    }
    
    .ai-journal-help {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 11px;
      color: #6b7280;
      transform: rotate(-0.2deg);
    }
    
    .ai-journal-buttons {
      display: flex;
      gap: 8px;
    }
    
    .ai-journal-save-btn, .ai-journal-expand-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 11px;
      padding: 6px 12px;
      border-radius: 12px;
      border: 1px solid;
      cursor: pointer;
      transform: rotate(-0.3deg);
      letter-spacing: 0.3px;
      transition: all 0.2s ease;
    }
    
    .ai-journal-save-btn {
      background: #10b981;
      color: white;
      border-color: #059669;
    }
    
    .ai-journal-expand-btn {
      background: #f8fafc;
      color: #374151;
      border-color: #d1d5db;
    }
    
    .ai-journal-suggestions {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 2px solid #e5e0d6;
      position: relative;
    }
    
    .ai-journal-suggestions::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(139, 115, 85, 0.3) 20%, 
        rgba(139, 115, 85, 0.5) 50%, 
        rgba(139, 115, 85, 0.3) 80%, 
        transparent 100%);
    }
    
    .ai-suggestion-title {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 16px;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 16px;
      transform: rotate(-0.3deg);
      letter-spacing: 0.4px;
    }
    
    .suggested-cards {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .suggested-card {
      padding: 20px;
      border-radius: 12px;
      border: 2px solid;
      cursor: pointer;
      transition: all 0.2s ease;
      transform: rotate(0.5deg);
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      min-width: 200px;
      max-width: 300px;
      text-align: center;
    }
    
    .suggested-card:hover {
      transform: rotate(0deg) scale(1.02);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .suggested-card.selected {
      transform: rotate(0deg) scale(1.05);
      box-shadow: 0 6px 12px rgba(0,0,0,0.2);
      border-width: 2px;
    }
    
    .card-selected {
      font-size: 10px;
      font-weight: 600;
      margin-top: 4px;
      opacity: 0.9;
    }
    
    .suggested-card.visual {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-color: #1e40af;
    }
    
    .suggested-card.question {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      border-color: #6d28d9;
    }
    
    .suggested-card.quote {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      border-color: #b45309;
    }
    
    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }
    
    .card-desc {
      font-size: 12px;
      opacity: 0.9;
      line-height: 1.4;
    }
    
    .ai-reflection-prompt {
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      transform: rotate(-0.2deg);
    }
    
    .reflection-question {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 13px;
      color: #374151;
      margin-bottom: 12px;
      letter-spacing: 0.3px;
    }
    
    .reflection-text {
      margin-bottom: 12px;
    }
    
    .reflection-textarea {
      width: 100%;
      height: 60px;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 12px;
      line-height: 1.5;
      color: #374151;
      background: transparent;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 8px;
      outline: none;
      resize: none;
      letter-spacing: 0.3px;
    }
    
    .reflection-textarea::placeholder {
      color: #9ca3af;
      font-style: italic;
    }
    
    .reflection-actions {
      display: flex;
      gap: 8px;
    }
    
    .reflection-btn, .suggest-more-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 11px;
      padding: 6px 12px;
      border-radius: 12px;
      border: 1px solid;
      cursor: pointer;
      transform: rotate(0.2deg);
      letter-spacing: 0.3px;
      transition: all 0.2s ease;
    }
    
    .reflection-btn {
      background: #3b82f6;
      color: white;
      border-color: #2563eb;
    }
    
    .suggest-more-btn {
      background: #f8fafc;
      color: #374151;
      border-color: #d1d5db;
    }
    
    .suggest-more-btn:hover {
      background: #e5e7eb;
      transform: rotate(0deg) scale(1.05);
    }
    
    .reflection-btn:hover {
      background: #2563eb;
      transform: rotate(0deg) scale(1.05);
    }
    
    .ai-journal-save-btn:hover {
      background: #059669;
      transform: rotate(0deg) scale(1.05);
    }
    
    .ai-journal-expand-btn:hover {
      background: #e5e7eb;
      transform: rotate(0deg) scale(1.05);
    }
    
    .page-card {
      margin: 16px 0;
      display: flex;
      justify-content: center;
    }
    
    .card-display {
      padding: 12px 16px;
      border-radius: 8px;
      border: 2px solid;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      text-align: center;
      transform: rotate(-0.5deg);
      max-width: 200px;
    }
    
    .card-display.visual {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-color: #1e40af;
    }
    
    .card-display.question {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      border-color: #6d28d9;
    }
    
    .card-display.quote {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      border-color: #b45309;
    }
    
    .card-display-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
      letter-spacing: 0.3px;
    }
    
    .card-display-desc {
      font-size: 11px;
      opacity: 0.9;
      line-height: 1.3;
    }
    
    .random-card-display {
      margin: 16px 0;
      display: flex;
      justify-content: center;
    }
    
    .random-card {
      padding: 16px 20px;
      border-radius: 12px;
      border: 2px solid;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      text-align: center;
      transform: rotate(-1deg);
      max-width: 250px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    
    .random-card:hover {
      transform: rotate(0deg) scale(1.05);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    .random-card.visual {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-color: #1e40af;
    }
    
    .random-card.question {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      border-color: #6d28d9;
    }
    
    .random-card.quote {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      border-color: #b45309;
    }
    
    .random-card-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .random-card-desc {
      font-size: 13px;
      opacity: 0.95;
      line-height: 1.4;
      font-style: italic;
    }
    
    .card-visual {
      margin-bottom: 12px;
      display: flex;
      justify-content: center;
    }
    
    .visual-icon, .question-icon, .quote-icon {
      font-size: 32px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    
    .visual-icon {
      animation: float 3s ease-in-out infinite;
    }
    
    .question-icon {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .quote-icon {
      animation: bounce 2s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    
    /* Goals Styles */
    .goals-container {
      position: relative;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      box-shadow: 
        0 8px 32px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.8);
      overflow: hidden;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
    }
    
    .goals-spine {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 8px;
      background: linear-gradient(180deg, #8b4513 0%, #654321 50%, #8b4513 100%);
      box-shadow: inset -2px 0 4px rgba(0,0,0,0.3);
    }
    
    .goals-pages {
      margin-left: 12px;
      padding: 20px;
      min-height: 400px;
    }
    
    .goals-page {
      background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
      border-radius: 8px;
      padding: 24px;
      box-shadow: 
        0 4px 16px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.9);
      position: relative;
    }
    
    .goals-header {
      text-align: center;
      margin-bottom: 24px;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 16px;
    }
    
    .goals-title {
      font-size: 20px;
      font-weight: 700;
      color: #2c3e50;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 4px;
    }
    
    .goals-subtitle {
      font-size: 12px;
      color: #6c757d;
      font-style: italic;
      letter-spacing: 0.3px;
    }
    
    .goals-content {
      font-size: 14px;
      line-height: 1.6;
      color: #495057;
    }
    
    /* Goals Display Mode */
    .goals-list {
      margin-bottom: 24px;
    }
    
    .goal-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
      padding: 12px;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 8px;
      border: 1px solid #e9ecef;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }
    
    .goal-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    
    .goal-icon {
      font-size: 20px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .goal-icon-1 {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    }
    
    .goal-icon-2 {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    }
    
    .goal-icon-3 {
      background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
    }
    
    .goal-text {
      flex: 1;
      font-size: 13px;
      line-height: 1.5;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .goals-progress {
      margin-bottom: 24px;
    }
    
    .progress-title {
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .progress-bars {
      space-y: 8px;
    }
    
    .progress-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .progress-label {
      font-size: 11px;
      color: #6c757d;
      font-weight: 500;
      min-width: 80px;
    }
    
    .progress-dots {
      display: flex;
      gap: 4px;
    }
    
    .progress-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #e9ecef;
      transition: all 0.3s ease;
    }
    
    .progress-dot.completed {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      box-shadow: 0 0 8px rgba(40, 167, 69, 0.3);
    }
    
    .goals-actions {
      text-align: center;
    }
    
    .goals-edit-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 12px;
      padding: 8px 16px;
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,123,255,0.3);
    }
    
    .goals-edit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,123,255,0.4);
    }
    
    /* Goals Edit Mode */
    .goals-edit-header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 12px;
    }
    
    .goals-edit-title {
      font-size: 16px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 4px;
    }
    
    .goals-edit-subtitle {
      font-size: 11px;
      color: #6c757d;
      font-style: italic;
    }
    
    .goal-input-group {
      margin-bottom: 16px;
    }
    
    .goal-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #495057;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .goal-input {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 12px;
      color: #495057;
      background: #ffffff;
      transition: all 0.3s ease;
    }
    
    .goal-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }
    
    .ai-suggestions {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      border: 1px solid #dee2e6;
    }
    
    .ai-suggestions-title {
      font-size: 12px;
      font-weight: 600;
      color: #495057;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .ai-suggestions-content {
      space-y: 8px;
    }
    
    .suggestion-card {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: white;
      border-radius: 6px;
      border: 1px solid #e9ecef;
      margin-bottom: 8px;
    }
    
    .suggestion-icon {
      font-size: 14px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .suggestion-text {
      font-size: 11px;
      color: #6c757d;
      font-style: italic;
    }
    
    .goals-edit-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }
    
    .goals-cancel-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 11px;
      padding: 8px 16px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .goals-cancel-btn:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }
    
    .goals-save-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 11px;
      padding: 8px 16px;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    }
    
    .goals-save-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(40, 167, 69, 0.4);
    }
    
    /* Achieved Goals Styles */
    .achieved-goals {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 2px solid #e5e0d6;
    }
    
    .achieved-goals-title {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
      text-align: center;
      letter-spacing: 0.3px;
    }
    
    .achieved-goals-list {
      space-y: 8px;
    }
    
    .achieved-goal-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 12px;
      padding: 8px 12px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 6px;
      border: 1px solid #bae6fd;
      transition: all 0.3s ease;
    }
    
    .achieved-goal-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
    }
    
    .achieved-goal-icon {
      font-size: 16px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 50%;
      flex-shrink: 0;
      color: white;
      font-size: 12px;
    }
    
    .achieved-goal-text {
      flex: 1;
      font-size: 11px;
      line-height: 1.4;
      color: #1e40af;
      font-weight: 500;
    }
    
    .achieved-goal-date {
      font-size: 9px;
      color: #6b7280;
      font-style: italic;
      text-align: right;
      min-width: 80px;
    }
    
    .new-card-btn {
      font-family: 'Kalam', 'Bradley Hand', 'Brush Script MT', cursive;
      font-size: 12px;
      padding: 8px 16px;
      border-radius: 20px;
      border: 2px solid #e5e7eb;
      background: #f8fafc;
      color: #374151;
      cursor: pointer;
      transform: rotate(1deg);
      letter-spacing: 0.3px;
      transition: all 0.2s ease;
      margin-top: 12px;
    }
    
    .new-card-btn:hover {
      background: #e5e7eb;
      transform: rotate(0deg) scale(1.05);
      border-color: #d1d5db;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .book-container, .ai-journal-container {
        max-width: 100%;
        margin: 0;
      }
      
      .book-page, .ai-journal-page {
        padding: 16px 20px;
        margin: 1px;
      }
      
      .page-title, .ai-journal-title {
        font-size: 16px;
      }
      
      .page-content, .ai-journal-textarea {
        font-size: 13px;
      }
      
      .suggested-cards {
        justify-content: center;
      }
      
      .suggested-card {
        min-width: 180px;
        max-width: 250px;
        padding: 16px;
      }
    }
  `;

  // Add styles to document head
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = bookStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const getInitialView = (): ParticipantView => {
    const hash = location.hash.replace(/^#participant\//, "");
    if (["dashboard", "journal", "sessions", "progress", "settings"].includes(hash)) {
      return hash as ParticipantView;
    }
    return "dashboard";
  };

  const [view, setView] = useState<ParticipantView>(getInitialView());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [aiCoachExpanded, setAiCoachExpanded] = useState(false);

  // Zoom integration functions
  const handleCopyZoomLink = () => {
    const zoomLink = "https://zoom.us/j/123456789";
    navigator.clipboard.writeText(zoomLink).then(() => {
      // Could show a toast notification here
      console.log("Zoom link copied to clipboard");
    });
  };

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = location.hash.replace(/^#participant\//, "");
      if (["dashboard", "journal", "sessions", "progress", "settings"].includes(hash)) {
        setView(hash as ParticipantView);
      }
    };
    
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigation = (newView: ParticipantView) => {
    setView(newView);
    location.hash = `#participant/${newView}`;
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-900 grid grid-cols-12 overflow-hidden">
      {/* Left Navigation */}
      <aside className="col-span-2 min-w-[220px] bg-white/80 backdrop-blur-md border-r border-black/5 flex flex-col">
        <div className="px-4 py-4 flex items-center gap-2 text-slate-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            SC
          </div>
          <div>
            <div className="font-semibold text-sm">Sarah Chen</div>
            <div className="text-xs text-slate-500">Participant</div>
          </div>
        </div>
        
        <nav className="px-2 py-2 space-y-1 text-sm">
          <ParticipantNavItem 
            icon={<Home className="h-4 w-4" />} 
            label="Dashboard" 
            active={view === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          >
            Your journey overview
          </ParticipantNavItem>
          <ParticipantNavItem 
            icon={<BookOpen className="h-4 w-4" />} 
            label="Journal" 
            active={view === "journal"}
            onClick={() => handleNavigation("journal")}
          >
            Reflections & insights
          </ParticipantNavItem>
          <ParticipantNavItem 
            icon={<Users className="h-4 w-4" />} 
            label="On-Air" 
            active={view === "sessions"}
            onClick={() => handleNavigation("sessions")}
          >
            Coaching & workshops
          </ParticipantNavItem>
          <ParticipantNavItem 
            icon={<TrendingUp className="h-4 w-4" />} 
            label="Progress" 
            active={view === "progress"}
            onClick={() => handleNavigation("progress")}
          >
            Goals & achievements
          </ParticipantNavItem>
          <ParticipantNavItem 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            active={view === "settings"}
            onClick={() => handleNavigation("settings")}
          >
            Preferences & privacy
          </ParticipantNavItem>
        </nav>

        <div className="mt-auto p-3 border-t border-black/5 text-xs space-y-2">
          <button 
            onClick={() => { location.hash = "#studio"; }}
            className="w-full px-3 py-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2"
          >
            🎯 Switch to Studio
          </button>
          <div className="rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 p-3 text-center">
            <div className="font-medium text-blue-800">💡 Daily Reflection</div>
            <div className="text-blue-700 mt-1">What's one thing you learned today?</div>
            <button 
              onClick={() => {
                handleNavigation("journal");
                setIsWriting(true);
              }}
              className="mt-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs"
            >
              Write
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="col-span-10 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-black/5 bg-white/70 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">
                {view === "dashboard" && "Your Journey"}
                {view === "journal" && "Personal Journal"}
                {view === "sessions" && "On-Air & Workshops"}
                {view === "progress" && "Progress & Goals"}
                {view === "settings" && "Settings"}
              </h1>
              <p className="text-sm text-slate-600">
                {view === "dashboard" && "Welcome back! Here's what's happening in your growth journey."}
                {view === "journal" && "Capture your thoughts, reflections, and insights."}
                {view === "sessions" && "Join live sessions and review past workshops."}
                {view === "progress" && "Track your goals and celebrate achievements."}
                {view === "settings" && "Manage your preferences and privacy settings."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs">
                <Star className="h-3.5 w-3.5 inline mr-1" />
                Level 3 Explorer
              </div>
            </div>
          </div>
        </header>

        {/* Body Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {view === "dashboard" && <DashboardBody />}
          {view === "journal" && (
            <JournalBody 
              selectedEntry={selectedEntry}
              setSelectedEntry={setSelectedEntry}
              isWriting={isWriting}
              setIsWriting={setIsWriting}
            />
          )}
          {view === "sessions" && <SessionsBody onCopyZoomLink={handleCopyZoomLink} />}
          {view === "progress" && <ProgressBody />}
          {view === "settings" && <ParticipantSettingsBody />}
        </div>
      </main>
    </div>
  );
}

/* ——— Dashboard Body ——— */
function DashboardBody() {
  return (
    <div className="p-4 overflow-auto h-full">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<Calendar className="h-5 w-5" />} label="Next Session" value="Tomorrow 2PM" />
          <StatCard icon={<BookOpen className="h-5 w-5" />} label="Journal Entries" value="23" />
          <StatCard icon={<Target className="h-5 w-5" />} label="Goals Achieved" value="5/8" />
          <StatCard icon={<Award className="h-5 w-5" />} label="Insights Gained" value="12" />
        </div>

        {/* My Goals and Achieved Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* My Goals */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Goals</h2>
              <button className="text-sm text-blue-600 hover:underline">Edit Goals</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">🎯</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Improve team communication and collaboration</div>
                  <div className="text-xs text-slate-500 mt-1">In Progress • 4/5 days this week</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">🚀</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Develop leadership skills through coaching</div>
                  <div className="text-xs text-slate-500 mt-1">In Progress • 3/5 days this week</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm">💡</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Build deeper connections with team members</div>
                  <div className="text-xs text-slate-500 mt-1">In Progress • 2/5 days this week</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achieved Goals */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">🏆 Achieved Goals</h2>
              <span className="text-sm text-slate-500">3 completed</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✅</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Complete leadership training program</div>
                  <div className="text-xs text-slate-500 mt-1">Completed Jan 15, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✅</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Improve team meeting efficiency</div>
                  <div className="text-xs text-slate-500 mt-1">Completed Dec 20, 2023</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✅</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">Launch new project management system</div>
                  <div className="text-xs text-slate-500 mt-1">Completed Nov 10, 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
              <button className="text-sm text-blue-600 hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.slice(0, 3).map(session => (
                <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{session.title}</div>
                    <div className="text-xs text-slate-600">{session.date} • {session.facilitator}</div>
                  </div>
                  <button 
                    onClick={() => { location.hash = "#participant/session/live"; }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reflections */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Reflections</h2>
              <button className="text-sm text-blue-600 hover:underline">Write new</button>
            </div>
            <div className="space-y-3">
              {recentJournalEntries.slice(0, 3).map(entry => (
                <div key={entry.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-sm font-medium mb-1">{entry.title}</div>
                  <div className="text-xs text-slate-600 line-clamp-2">{entry.content}</div>
                  <div className="text-xs text-slate-500 mt-2">{entry.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Sessions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Past Sessions</h2>
          <div className="space-y-3">
            {pastSessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Your Growth Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                5
              </div>
              <div className="text-sm font-medium">Goals Completed</div>
              <div className="text-xs text-slate-600">This quarter</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                23
              </div>
              <div className="text-sm font-medium">Journal Entries</div>
              <div className="text-xs text-slate-600">All time</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                12
              </div>
              <div className="text-sm font-medium">Sessions Attended</div>
              <div className="text-xs text-slate-600">This year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Journal Body ——— */
function JournalBody({ 
  selectedEntry, 
  setSelectedEntry, 
  isWriting, 
  setIsWriting 
}: {
  selectedEntry: JournalEntry | null;
  setSelectedEntry: (entry: JournalEntry | null) => void;
  isWriting: boolean;
  setIsWriting: (writing: boolean) => void;
}) {
  const [newEntry, setNewEntry] = useState({ title: "", content: "", prompt: "" });
  const [aiJournalText, setAiJournalText] = useState("");
  const [suggestedCards, setSuggestedCards] = useState([
    { id: 1, type: "visual", title: "Choice", description: "The power of decision and taking responsibility", card: getCardById("choice") },
    { id: 2, type: "question", title: "What if?", description: "What if you tried a different approach?" },
    { id: 3, type: "quote", title: "Courage", description: "The only way to do great work is to love what you do" }
  ]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [reflectionText, setReflectionText] = useState("");
  
  // Voice interface state
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  
  // Goals state
  const [goals, setGoals] = useState([
    "Improve team communication and collaboration",
    "Develop leadership skills through coaching", 
    "Build deeper connections with team members"
  ]);
  const [editingGoals, setEditingGoals] = useState(["", "", ""]);
  const [isEditingGoals, setIsEditingGoals] = useState(false);

  // AI Journal functions
  const handleCardSelect = (cardId: number) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSuggestMore = () => {
    const newCards = [
      { id: 4, type: "visual", title: "Mountain", description: "What challenges are you climbing?" },
      { id: 5, type: "question", title: "Why now?", description: "Why is this important to you right now?" },
      { id: 6, type: "quote", title: "Growth", description: "The only impossible journey is the one you never begin" }
    ];
    setSuggestedCards(prev => [...prev, ...newCards]);
  };

  const handleReflectOnCards = () => {
    const selectedCardTitles = suggestedCards
      .filter(card => selectedCards.includes(card.id))
      .map(card => card.title);
    
    if (selectedCardTitles.length > 0) {
      setReflectionText(`Reflecting on: ${selectedCardTitles.join(", ")}. How do these resonate with my current situation?`);
    }
  };

  const handleSaveEntry = () => {
    if (aiJournalText.trim()) {
      const currentCard = suggestedCards[0]; // Get the current random card
      const entryData = {
        text: aiJournalText,
        selectedCard: currentCard ? {
          type: currentCard.type,
          title: currentCard.title,
          description: currentCard.description,
          icon: currentCard.icon
        } : null,
        reflection: reflectionText,
        timestamp: new Date().toISOString()
      };
      
      // Here you would typically save to a backend
      console.log("Saving journal entry with random card:", entryData);
      setAiJournalText("");
      setSelectedCards([]);
      setReflectionText("");
    }
  };

  const handleAIExpand = () => {
    // Here you would typically call an AI service to expand the text
    const expandedText = aiJournalText + "\n\nAI Expansion: This is a deeper exploration of your thoughts...";
    setAiJournalText(expandedText);
  };

  const handleNewRandomCard = () => {
    const allCards = [
      { id: 1, type: "visual", title: "Bridge", description: "How are you building connections?", icon: "🌉" },
      { id: 2, type: "question", title: "What if?", description: "What if you tried a different approach?", icon: "❓" },
      { id: 3, type: "quote", title: "Courage", description: "The only way to do great work is to love what you do", icon: "💬" },
      { id: 4, type: "visual", title: "Mountain", description: "What challenges are you climbing?", icon: "🏔️" },
      { id: 5, type: "question", title: "Why now?", description: "Why is this important to you right now?", icon: "❓" },
      { id: 6, type: "quote", title: "Growth", description: "The only impossible journey is the one you never begin", icon: "💬" },
      { id: 7, type: "visual", title: "River", description: "How are you flowing with change?", icon: "🌊" },
      { id: 8, type: "question", title: "What matters?", description: "What truly matters to you right now?", icon: "❓" },
      { id: 9, type: "quote", title: "Wisdom", description: "The only source of knowledge is experience", icon: "💬" }
    ];
    
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    setSuggestedCards([randomCard]);
  };

  // Goals functions
  const handleSaveGoals = () => {
    setGoals(editingGoals);
    setIsEditingGoals(false);
    console.log("Goals saved:", editingGoals);
  };

  const handleEditGoals = () => {
    setEditingGoals([...goals]);
    setIsEditingGoals(true);
  };

  // Voice interface handlers
  const handleVoiceTranscript = (transcript: string, isFinal: boolean) => {
    if (isFinal) {
      setAiJournalText(prev => prev + (prev ? ' ' : '') + transcript);
      setVoiceTranscript('');
    } else {
      setVoiceTranscript(transcript);
    }
  };

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case 'new_entry':
        setIsWriting(true);
        setAiJournalText('');
        break;
      case 'save_entry':
        if (aiJournalText.trim()) {
          // Create new journal entry
          const newEntry = {
            id: `voice-${Date.now()}`,
            title: aiJournalText.split('.')[0].slice(0, 50) + '...',
            content: aiJournalText,
            date: new Date().toLocaleDateString(),
            mood: 'Reflective',
            tags: ['voice', 'journal'],
            favorite: false,
            card: suggestedCards[0]?.card || null
          };
          console.log('Voice entry saved:', newEntry);
          setAiJournalText('');
        }
        break;
      case 'clear_text':
        setAiJournalText('');
        setVoiceTranscript('');
        break;
      case 'random_card':
        handleNewRandomCard();
        break;
      case 'read_back':
        // This will be handled by the VoiceInterface component
        break;
    }
  };

  if (isWriting) {
    return (
      <div className="p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setIsWriting(false)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to journal
              </button>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-slate-200 text-sm flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Publish
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Entry title..."
                className="w-full text-lg font-medium border-none outline-none bg-transparent"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
              />
              
              {newEntry.prompt && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-sm font-medium text-blue-800 mb-1">Reflection Prompt</div>
                  <div className="text-sm text-blue-700">{newEntry.prompt}</div>
                </div>
              )}

              <textarea 
                placeholder="What's on your mind? Share your thoughts, insights, or reflections..."
                className="w-full min-h-[400px] border-none outline-none bg-transparent resize-none text-slate-700"
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 h-full overflow-hidden">
      {/* Journal Content */}
      <main className="col-span-12 lg:col-span-9 p-4 space-y-3 overflow-auto min-h-0">
        {/* All Entries - Always Visible */}
            {/* AI-Powered Journal Interface - Handwritten Style */}
            <div className="mb-6">
              <div className="ai-journal-container">
                <div className="ai-journal-spine"></div>
                <div className="ai-journal-pages">
                  <div className="ai-journal-page">
                    <div className="ai-journal-header">
                      <div className="ai-journal-title">AI-Powered Journal</div>
                      <div className="ai-journal-subtitle">Your personal reflection companion</div>
                    </div>
                    
                    <div className="ai-journal-content">
                    <div className="ai-journal-prompt">
                      💭 What's on your mind today? Share your thoughts, insights, or reflections... Try picking a random card to inspire your reflection! Here is a random card, how does it feel to you?
                    </div>
                    
                    <div className="random-card-display">
                      {suggestedCards[0]?.type === 'visual' && suggestedCards[0]?.card ? (
                        <div className="w-48">
                          <CardDisplay
                            card={suggestedCards[0].card}
                            size="md"
                            variant="detailed"
                            showTitle={true}
                            showDescription={true}
                            showThemes={false}
                            className="w-full"
                          />
                        </div>
                      ) : (
                        <div className={`random-card ${suggestedCards[0]?.type || 'visual'}`}>
                          <div className="card-visual">
                            <div className={`${suggestedCards[0]?.type || 'visual'}-icon`}>
                              {suggestedCards[0]?.icon || '🌉'}
                            </div>
                          </div>
                          <div className="random-card-title">{suggestedCards[0]?.title || 'Bridge'}</div>
                          <div className="random-card-desc">{suggestedCards[0]?.description || 'How are you building connections?'}</div>
                        </div>
                      )}
                      <button 
                        className="new-card-btn"
                        onClick={handleNewRandomCard}
                      >
                        🎲 New Random Card
                      </button>
                    </div>
                    
                    {/* Voice Interface Toggle */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsVoiceMode(!isVoiceMode)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isVoiceMode 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          🎤 Voice Input
                        </button>
                        <span className="text-xs text-gray-600">
                          {isVoiceMode ? 'Speak your thoughts' : 'Click to enable voice input'}
                        </span>
                      </div>
                    </div>

                    {/* Voice Interface */}
                    {isVoiceMode && (
                      <div className="mb-4">
                        <VoiceInterface
                          onTranscript={handleVoiceTranscript}
                          onVoiceCommand={handleVoiceCommand}
                          placeholder="Click the microphone and speak your journal entry..."
                          showPlayback={true}
                          continuous={false}
                          className="voice-journal-interface"
                        />
                      </div>
                    )}
                    
                      <textarea 
                        placeholder="Write about your experiences, challenges, breakthroughs, or anything you'd like to explore..."
                        className="ai-journal-textarea"
                        value={aiJournalText + (voiceTranscript ? ' ' + voiceTranscript : '')}
                        onChange={(e) => setAiJournalText(e.target.value)}
                      />
                      <div className="ai-journal-actions">
                        <div className="ai-journal-help">AI will help organize and expand your thoughts</div>
                        <div className="ai-journal-buttons">
                          <button 
                            className="ai-journal-save-btn"
                            onClick={handleSaveEntry}
                          >
                            Save Entry
                          </button>
                          <button 
                            className="ai-journal-expand-btn"
                            onClick={handleAIExpand}
                          >
                            AI Expand
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input placeholder="Search entries..." className="pl-8 pr-3 py-2 text-sm rounded-xl border border-black/10 bg-white/90 w-[280px]" />
              </div>
              <button className="px-3 py-2 text-xs rounded-xl border border-black/10 bg-white flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <div className="ml-auto text-xs inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-black/10 bg-white">
                Sort by date <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Book-like Interface */}
            <div className="book-container">
              <div className="book-spine"></div>
              <div className="book-pages">
                {journalEntries.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`book-page ${selectedEntry?.id === entry.id ? 'active' : ''}`}
                    onClick={() => setSelectedEntry(entry)}
                    style={{ '--page-delay': `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="page-header">
                      <div className="page-number">{index + 1}</div>
                      <div className="page-date">{entry.date}</div>
                      {entry.favorite && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                    </div>
                    
                    <div className="page-title">{entry.title}</div>
                    
                    <div className="page-content">
                      {entry.content}
                    </div>
                    
                    {entry.card && (
                      <div className="page-card">
                        {'image' in entry.card ? (
                          // New Card type with image
                          <div className="w-full">
                            <CardDisplay
                              card={entry.card}
                              size="sm"
                              variant="detailed"
                              showTitle={true}
                              showDescription={true}
                              showThemes={false}
                              className="w-full"
                            />
                          </div>
                        ) : (
                          // Legacy card format
                          <div className={`card-display ${entry.card.type}`}>
                            <div className="card-visual">
                              <div className={`${entry.card.type || 'visual'}-icon`}>
                                🎯
                              </div>
                            </div>
                            <div className="card-display-title">{entry.card.title}</div>
                            <div className="card-display-desc">{entry.card.description}</div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="page-footer">
                      <div className="mood-indicator">
                        {entry.mood && (
                          <span className={`mood-badge mood-${entry.mood.toLowerCase()}`}>
                            {entry.mood}
                          </span>
                        )}
                      </div>
                      <div className="page-tags">
                        {entry.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

      </main>

      {/* Goals */}
      <aside className="hidden lg:block col-span-3 border-l border-black/5 bg-white/60 p-4 overflow-auto">
        <div className="goals-container">
          <div className="goals-spine"></div>
          <div className="goals-pages">
            <div className="goals-page">
              <div className="goals-header">
                <div className="goals-title">My Goals</div>
                <div className="goals-subtitle">Personal development journey</div>
              </div>
              
              <div className="goals-content">
                {isEditingGoals ? (
                  <div className="goals-edit-mode">
                    <div className="goals-edit-header">
                      <div className="goals-edit-title">Edit Your Goals</div>
                      <div className="goals-edit-subtitle">AI will help you refine your goals</div>
                    </div>
                    
                    <div className="goals-edit-content">
                      <div className="goal-input-group">
                        <label className="goal-label">Goal 1</label>
                        <input 
                          type="text"
                          value={editingGoals[0]}
                          onChange={(e) => setEditingGoals([e.target.value, editingGoals[1], editingGoals[2]])}
                          className="goal-input"
                          placeholder="Enter your first goal..."
                        />
                      </div>
                      
                      <div className="goal-input-group">
                        <label className="goal-label">Goal 2</label>
                        <input 
                          type="text"
                          value={editingGoals[1]}
                          onChange={(e) => setEditingGoals([editingGoals[0], e.target.value, editingGoals[2]])}
                          className="goal-input"
                          placeholder="Enter your second goal..."
                        />
                      </div>
                      
                      <div className="goal-input-group">
                        <label className="goal-label">Goal 3</label>
                        <input 
                          type="text"
                          value={editingGoals[2]}
                          onChange={(e) => setEditingGoals([editingGoals[0], editingGoals[1], e.target.value])}
                          className="goal-input"
                          placeholder="Enter your third goal..."
                        />
                      </div>
                      
                      {/* AI Suggestions */}
                      <div className="ai-suggestions">
                        <div className="ai-suggestions-title">💡 AI Suggestions</div>
                        <div className="ai-suggestions-content">
                          <div className="suggestion-card">
                            <div className="suggestion-icon">🎯</div>
                            <div className="suggestion-text">"Focus on specific, measurable outcomes"</div>
                          </div>
                          <div className="suggestion-card">
                            <div className="suggestion-icon">⏰</div>
                            <div className="suggestion-text">"Set realistic timelines for each goal"</div>
                          </div>
                          <div className="suggestion-card">
                            <div className="suggestion-icon">🔄</div>
                            <div className="suggestion-text">"Consider how goals support each other"</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="goals-edit-actions">
                        <button 
                          className="goals-cancel-btn"
                          onClick={() => setIsEditingGoals(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="goals-save-btn"
                          onClick={handleSaveGoals}
                        >
                          Save Goals
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="goals-display-mode">
                    <div className="goals-list">
                      <div className="goal-item">
                        <div className="goal-icon goal-icon-1">🎯</div>
                        <div className="goal-text">{goals[0]}</div>
                      </div>
                      <div className="goal-item">
                        <div className="goal-icon goal-icon-2">🚀</div>
                        <div className="goal-text">{goals[1]}</div>
                      </div>
                      <div className="goal-item">
                        <div className="goal-icon goal-icon-3">💡</div>
                        <div className="goal-text">{goals[2]}</div>
                      </div>
                    </div>
                    
                    <div className="goals-progress">
                      <div className="progress-title">This Week's Progress</div>
                      <div className="progress-bars">
                        <div className="progress-bar">
                          <div className="progress-label">Communication</div>
                          <div className="progress-dots">
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot"></div>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-label">Leadership</div>
                          <div className="progress-dots">
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot"></div>
                            <div className="progress-dot"></div>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-label">Connections</div>
                          <div className="progress-dots">
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot completed"></div>
                            <div className="progress-dot"></div>
                            <div className="progress-dot"></div>
                            <div className="progress-dot"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="goals-actions">
                      <button 
                        className="goals-edit-btn"
                        onClick={() => setIsEditingGoals(true)}
                      >
                        ✏️ Edit Goals
                      </button>
                    </div>
                    
                    {/* Achieved Goals Section */}
                    <div className="achieved-goals">
                      <div className="achieved-goals-title">🏆 Achieved Goals</div>
                      <div className="achieved-goals-list">
                        <div className="achieved-goal-item">
                          <div className="achieved-goal-icon">✅</div>
                          <div className="achieved-goal-text">Complete leadership training program</div>
                          <div className="achieved-goal-date">Completed Jan 15, 2024</div>
                        </div>
                        <div className="achieved-goal-item">
                          <div className="achieved-goal-icon">✅</div>
                          <div className="achieved-goal-text">Improve team meeting efficiency</div>
                          <div className="achieved-goal-date">Completed Dec 20, 2023</div>
                        </div>
                        <div className="achieved-goal-item">
                          <div className="achieved-goal-icon">✅</div>
                          <div className="achieved-goal-text">Launch new project management system</div>
                          <div className="achieved-goal-date">Completed Nov 10, 2023</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ——— Helper Functions ——— */
function getAvatarUrl(name: string): string {
  // Age and gender-aware avatars for specific names
  if (name.toLowerCase().includes('sara')) {
    // Sara is 45 years old - use a different service with cache busting
    return `https://i.pravatar.cc/150?img=25&t=${Date.now()}`; // Mature woman with timestamp
  } else if (name.toLowerCase().includes('dana') || 
             name.toLowerCase().includes('leah') || 
             name.toLowerCase().includes('maria') || 
             name.toLowerCase().includes('lisa')) {
    // Other female participants - use randomuser for variety
    return `https://randomuser.me/api/portraits/women/${Math.abs(name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 100}.jpg`;
  } else if (name.toLowerCase().includes('ido') || 
             name.toLowerCase().includes('james')) {
    // Male participants
    return `https://randomuser.me/api/portraits/men/${Math.abs(name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 100}.jpg`;
  }
  
  // Fallback to pravatar for other names
  const seed = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return `https://i.pravatar.cc/150?img=${seed % 70}`;
}

/* ——— Drag & Drop Composer ——— */
function DragDropComposer() {
  const [tableCards, setTableCards] = useState<{
    visual: Card | null;
    question: Card | null;
    quote: Card | null;
  }[]>(Array(3).fill({ visual: null, question: null, quote: null }));

  const [draggedCard, setDraggedCard] = useState<{ card: Card; type: 'visual' | 'question' | 'quote' } | null>(null);
  const [draggedPosition, setDraggedPosition] = useState<{ x: number; y: number } | null>(null);

  const handleCardClick = (card: Card, type: 'visual' | 'question' | 'quote') => {
    setDraggedCard({ card, type });
    setDraggedPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent, card: Card, type: 'visual' | 'question' | 'quote') => {
    e.preventDefault();
    setDraggedCard({ card, type });
    setDraggedPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedCard && draggedPosition) {
      setDraggedPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (draggedCard) {
      // Find which table position the card was dropped on
      const tableElement = document.querySelector('.table-positions');
      if (tableElement) {
        const rect = tableElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if drop is within table bounds
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          // Simple grid detection (3 columns)
          const colWidth = rect.width / 3;
          const colIndex = Math.floor(x / colWidth);
          
          if (colIndex >= 0 && colIndex < 3) {
            setTableCards(prev => {
              const newCards = [...prev];
              newCards[colIndex] = {
                ...newCards[colIndex],
                [draggedCard.type]: draggedCard.card
              };
              return newCards;
            });
          }
        }
      }
      
      setDraggedCard(null);
      setDraggedPosition(null);
    }
  };

  const handleCardDragFromTable = (e: React.MouseEvent, positionIndex: number, cardType: 'visual' | 'question' | 'quote') => {
    e.preventDefault();
    const card = tableCards[positionIndex][cardType];
    if (card) {
      setDraggedCard({ card, type: cardType });
      setDraggedPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Add global mouse events for better drag handling
  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedCard && draggedPosition) {
        setDraggedPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (draggedCard) {
        // Find which table position the card was dropped on
        const tableElement = document.querySelector('.table-positions');
        if (tableElement) {
          const rect = tableElement.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Check if drop is within table bounds
          if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            // Simple grid detection (3 columns)
            const colWidth = rect.width / 3;
            const colIndex = Math.floor(x / colWidth);
            
            if (colIndex >= 0 && colIndex < 3) {
              setTableCards(prev => {
                const newCards = [...prev];
                newCards[colIndex] = {
                  ...newCards[colIndex],
                  [draggedCard.type]: draggedCard.card
                };
                return newCards;
              });
            }
          } else {
            // If dropped outside table, remove the card from its current position
            setTableCards(prev => {
              const newCards = [...prev];
              // Find and remove the card from any position
              for (let i = 0; i < newCards.length; i++) {
                if (newCards[i][draggedCard.type]?.id === draggedCard.card.id) {
                  newCards[i] = {
                    ...newCards[i],
                    [draggedCard.type]: null
                  };
                  break;
                }
              }
              return newCards;
            });
          }
        } else {
          // If no table found, remove the card
          setTableCards(prev => {
            const newCards = [...prev];
            for (let i = 0; i < newCards.length; i++) {
              if (newCards[i][draggedCard.type]?.id === draggedCard.card.id) {
                newCards[i] = {
                  ...newCards[i],
                  [draggedCard.type]: null
                };
                break;
              }
            }
            return newCards;
          });
        }
        
        setDraggedCard(null);
        setDraggedPosition(null);
      }
    };

    if (draggedCard) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedCard, draggedPosition]);

  return (
    <div className="mt-4 border-t border-black/10 pt-4">
      <div className="text-sm font-semibold mb-4">My Deck</div>
      
      {/* 3-Position Table */}
      <div className="mb-6">
        <div className="text-xs text-slate-600 mb-2">Drop cards here to compose your set</div>
        <div className="table-positions grid grid-cols-3 gap-4">
          {tableCards.map((position, index) => (
            <div 
              key={index}
              className="min-h-[200px] border-2 border-dashed border-slate-300 rounded-xl p-3 bg-slate-50 hover:border-blue-400 transition-colors"
            >
              <div className="text-xs text-slate-500 mb-2">Position {index + 1}</div>
              
              {/* Visual Card */}
              {position.visual ? (
                <div 
                  className="mb-2 cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => handleCardDragFromTable(e, index, 'visual')}
                >
                  <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${position.visual.gradient} flex items-center justify-center text-white font-medium text-xs mb-1 hover:shadow-md transition-shadow`}>
                    {position.visual.title}
                  </div>
                  <div className="text-[10px] text-slate-600">{position.visual.description}</div>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs mb-2">
                  Visual
                </div>
              )}
              
              {/* Question Card */}
              {position.question ? (
                <div 
                  className="mb-2 cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => handleCardDragFromTable(e, index, 'question')}
                >
                  <div className="rounded bg-purple-100 text-purple-800 px-2 py-3 text-center text-xs mb-1 hover:shadow-md transition-shadow">
                    {position.question.title}
                  </div>
                  <div className="text-[10px] text-slate-600">{position.question.description}</div>
                </div>
              ) : (
                <div className="rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs mb-2 py-3">
                  Question
                </div>
              )}
              
              {/* Quote Card */}
              {position.quote ? (
                <div 
                  className="cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => handleCardDragFromTable(e, index, 'quote')}
                >
                  <div className="rounded bg-amber-100 text-amber-800 px-2 py-3 text-center text-xs mb-1 hover:shadow-md transition-shadow">
                    {position.quote.title}
                  </div>
                  <div className="text-[10px] text-slate-600">{position.quote.description}</div>
                </div>
              ) : (
                <div className="rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs py-3">
                  Quote
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card Panes in Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" onMouseMove={handleMouseMove}>
        {/* Visual Cards Pane */}
        <CardPane 
          title="Visual Cards" 
          cards={visualDeck} 
          type="visual"
          onCardClick={handleCardClick}
          color="blue"
        />
        
        {/* Question Cards Pane */}
        <CardPane 
          title="Question Cards" 
          cards={questionDeck} 
          type="question"
          onCardClick={handleCardClick}
          color="purple"
        />
        
        {/* Quote Cards Pane */}
        <CardPane 
          title="Quote Cards" 
          cards={quoteDeck} 
          type="quote"
          onCardClick={handleCardClick}
          color="amber"
        />
      </div>

      {/* Dragged Card Overlay */}
      {draggedCard && draggedPosition && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{ 
            left: draggedPosition.x - 50, 
            top: draggedPosition.y - 30,
            transform: 'rotate(5deg)'
          }}
        >
          {draggedCard.type === 'visual' ? (
            <div className="w-24 h-16">
              <CardDisplay
                card={draggedCard.card}
                size="sm"
                variant="compact"
                showTitle={true}
                showDescription={false}
                className="w-full h-full border-2 border-white shadow-lg"
              />
            </div>
          ) : (
            <div className={`rounded-lg border-2 border-white shadow-lg px-3 py-2 ${
              draggedCard.type === 'question' ? 'bg-purple-100 text-purple-800' :
              'bg-amber-100 text-amber-800'
            }`}>
              <div className="text-sm font-medium">
                {draggedCard.card.title}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CardPane({ 
  title, 
  cards, 
  type, 
  onCardClick, 
  color 
}: { 
  title: string; 
  cards: Card[]; 
  type: 'visual' | 'question' | 'quote';
  onCardClick: (card: Card, type: 'visual' | 'question' | 'quote') => void;
  color: string;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<Card[]>(cards);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setExpandedIndex(null);
  };

  const handleCardInteraction = (card: Card, index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      onCardClick(card, type);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, card: Card, index: number) => {
    e.preventDefault();
    setExpandedIndex(index);
    onCardClick(card, type);
  };

  return (
    <div className="bg-white/80 rounded-xl border border-black/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold">{title}</div>
        <button 
          onClick={shuffleCards}
          className="px-3 py-1.5 rounded-lg text-xs bg-slate-200 hover:bg-slate-300 transition-colors"
        >
          Reshuffle
        </button>
      </div>
      <div className="relative">
        <div className="flex justify-center">
          <div className="relative" style={{ width: '200px', height: '120px' }}>
            {shuffledCards.slice(0, 6).map((card, index) => (
              <div
                key={card.id}
                className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 ${
                  expandedIndex === index 
                    ? 'z-20 scale-110 shadow-lg' 
                    : 'z-10 hover:z-20 hover:scale-105'
                }`}
                style={{
                  left: `${index * 8}px`,
                  top: `${index * 4}px`,
                  transform: expandedIndex === index 
                    ? 'translateY(-15px) rotate(0deg)' 
                    : `translateY(${index * 2}px) rotate(${index * 2}deg)`,
                  width: '180px',
                  height: '100px'
                }}
                onClick={() => handleCardInteraction(card, index)}
                onMouseDown={(e) => handleMouseDown(e, card, index)}
              >
{type === 'visual' ? (
                  <CardDisplay
                    card={card}
                    size="sm"
                    variant="compact"
                    showTitle={true}
                    showDescription={false}
                    className={`w-full h-full ${expandedIndex === index ? 'ring-2 ring-blue-400' : ''}`}
                    isExpanded={expandedIndex === index}
                  />
                ) : (
                  <div className={`w-full h-full rounded-lg border border-black/10 p-2 ${
                    type === 'question' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  } ${expandedIndex === index ? 'ring-2 ring-blue-400' : ''}`}>
                    <div className="text-xs font-medium mb-1">{card.title}</div>
                    <div className="text-[10px] opacity-80 line-clamp-2">{card.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Sessions Body ——— */
function SessionsBody({ onCopyZoomLink }: { onCopyZoomLink: () => void }) {
  // AI Journal state for sessions
  const [aiJournalText, setAiJournalText] = useState("");
  const [suggestedCards, setSuggestedCards] = useState([
    { id: 1, type: "visual", title: "Bridge", description: "How are you building connections?", icon: "🌉" },
    { id: 2, type: "question", title: "What if?", description: "What if you tried a different approach?", icon: "❓" },
    { id: 3, type: "quote", title: "Courage", description: "The only way to do great work is to love what you do", icon: "💬" }
  ]);

  // AI Journal functions for sessions
  const handleNewRandomCard = () => {
    const allCards = [
      { id: 1, type: "visual", title: "Bridge", description: "How are you building connections?", icon: "🌉" },
      { id: 2, type: "question", title: "What if?", description: "What if you tried a different approach?", icon: "❓" },
      { id: 3, type: "quote", title: "Courage", description: "The only way to do great work is to love what you do", icon: "💬" },
      { id: 4, type: "visual", title: "Mountain", description: "What challenges are you climbing?", icon: "🏔️" },
      { id: 5, type: "question", title: "Why now?", description: "Why is this important to you right now?", icon: "❓" },
      { id: 6, type: "quote", title: "Growth", description: "The only impossible journey is the one you never begin", icon: "💬" },
      { id: 7, type: "visual", title: "River", description: "How are you flowing with change?", icon: "🌊" },
      { id: 8, type: "question", title: "What matters?", description: "What truly matters to you right now?", icon: "❓" },
      { id: 9, type: "quote", title: "Wisdom", description: "The only source of knowledge is experience", icon: "💬" }
    ];
    
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    setSuggestedCards([randomCard]);
  };

  const handleSaveEntry = () => {
    if (aiJournalText.trim()) {
      const currentCard = suggestedCards[0];
      const entryData = {
        text: aiJournalText,
        selectedCard: currentCard ? {
          type: currentCard.type,
          title: currentCard.title,
          description: currentCard.description,
          icon: currentCard.icon
        } : null,
        timestamp: new Date().toISOString()
      };
      
      console.log("Saving session journal entry:", entryData);
      setAiJournalText("");
    }
  };

  const handleAIExpand = () => {
    const expandedText = aiJournalText + "\n\nAI Expansion: This is a deeper exploration of your session insights...";
    setAiJournalText(expandedText);
  };

  return (
    <div className="p-4 overflow-auto h-full">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Current Live Session Cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Live Session: Crossing Inner Bridges</h2>
              <p className="text-sm text-slate-600">Group B • Phase 2: Expand</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700">Live Now</span>
            </div>
          </div>
          
          {/* Group Cards in Session */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-3">Your Group Cards</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {groupParticipantCards.map(participant => (
                <SessionParticipantCard key={participant.id} participant={participant} />
              ))}
            </div>
          </div>

          {/* Zoom Integration */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">🟦</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-800">Group B Breakout Room</div>
                <div className="text-xs text-blue-600">Zoom Meeting • 4 participants • Meeting ID: 123-456-789</div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open('https://zoom.us/j/123456789', '_blank')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium"
                >
                  Join Zoom
                </button>
                <button 
                  onClick={onCopyZoomLink}
                  className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-600 text-xs"
                >
                  Copy Link
                </button>
              </div>
            </div>
            
            {/* Zoom Status & Controls */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-lg p-2 border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-700">Audio: Connected</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-700">Video: Ready</span>
                </div>
              </div>
            </div>
            
            {/* Zoom Live Grid */}
            <div className="mt-3">
              <div className="text-xs font-medium text-blue-800 mb-2">📹 Live Video Grid</div>
              <div className="grid grid-cols-2 gap-2">
                {groupParticipantCards.map(participant => (
                  <div key={participant.id} className="relative bg-slate-100 rounded-lg aspect-video overflow-hidden">
                    <img 
                      src={getAvatarUrl(participant.name)}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
                      {participant.name}
                    </div>
                    <div className="absolute top-1 right-1">
                      <div className={`w-2 h-2 rounded-full ${
                        participant.status === "completed" ? "bg-green-500" :
                        participant.status === "reflecting" ? "bg-yellow-500" :
                        "bg-slate-400"
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Activity Instructions */}
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-xs font-medium text-yellow-800 mb-1">💡 Group Activity</div>
              <div className="text-xs text-yellow-700">
                Share your card reflection with your group members. Take turns and listen actively to each other's insights.
              </div>
            </div>
          </div>

          {/* AI-Powered Journal Interface - Handwritten Style */}
          <div className="mb-6">
            <div className="ai-journal-container">
              <div className="ai-journal-spine"></div>
              <div className="ai-journal-pages">
                <div className="ai-journal-page">
                  <div className="ai-journal-header">
                    <div className="ai-journal-title">Session Journal</div>
                    <div className="ai-journal-subtitle">Reflect on your session experience</div>
                  </div>
                  
                  <div className="ai-journal-content">
                  <div className="ai-journal-prompt">
                    💭 How are the cards you've selected resonating with your current journey? What patterns do you notice?
                  </div>
                  
                  <div className="random-card-display">
                    <div className={`random-card ${suggestedCards[0]?.type || 'visual'}`}>
                      <div className="card-visual">
                        <div className={`${suggestedCards[0]?.type || 'visual'}-icon`}>
                          {suggestedCards[0]?.icon || '🌉'}
                        </div>
                      </div>
                      <div className="random-card-title">{suggestedCards[0]?.title || 'Bridge'}</div>
                      <div className="random-card-desc">{suggestedCards[0]?.description || 'How are you building connections?'}</div>
                    </div>
                    <button 
                      className="new-card-btn"
                      onClick={handleNewRandomCard}
                    >
                      🎲 New Random Card
                    </button>
                  </div>
                  
                    <textarea 
                      placeholder="Reflect on your card choices, group discussions, and personal insights from this session..."
                      className="ai-journal-textarea"
                      value={aiJournalText}
                      onChange={(e) => setAiJournalText(e.target.value)}
                    />
                    <div className="ai-journal-actions">
                      <div className="ai-journal-help">AI will help organize and expand your thoughts</div>
                      <div className="ai-journal-buttons">
                        <button 
                          className="ai-journal-save-btn"
                          onClick={handleSaveEntry}
                        >
                          Save Entry
                        </button>
                        <button 
                          className="ai-journal-expand-btn"
                          onClick={handleAIExpand}
                        >
                          AI Expand
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag & Drop Card Composer */}
          <DragDropComposer />

          {/* Session Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-black/10">
            <button 
              onClick={() => { location.hash = "#participant/session/live"; }}
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium"
            >
              Join Session
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm">
              View Details
            </button>
            <button className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm">
              Leave Group
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ——— Composer Section ——— */
type SimpleCard = { id: string; title: string; description?: string; gradient?: string };

function StepBlock({ step, title, subtitle, children, disabled = false, done = false }:{ step:number; title:string; subtitle?:string; children:React.ReactNode; disabled?:boolean; done?:boolean }){
  return (
    <section className={`mt-4 rounded-2xl border p-3 ${done ? "border-emerald-300 bg-emerald-50" : "border-black/10 bg-white/80"}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm font-semibold">Step {step}: {title}</div>
          {subtitle && <div className="text-xs text-slate-600">{subtitle}</div>}
        </div>
        <div className={`text-[10px] px-2 py-1 rounded-full ${done ? "bg-emerald-100 text-emerald-700" : disabled ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"}`}>
          {done ? "Done" : disabled ? "Locked" : "Active"}
        </div>
      </div>
      <div className={`${disabled ? "opacity-50 pointer-events-none" : ""}`}>
        {children}
      </div>
    </section>
  );
}



/* ——— Progress Body ——— */
function ProgressBody() {
  return (
    <div className="p-4 overflow-auto h-full">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Goals Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Your Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalGoals.map(goal => (
              <div key={goal.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    {goal.completed ? 
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> :
                      <Circle className="h-5 w-5 text-slate-400 mt-0.5" />
                    }
                    <div>
                      <div className={`font-medium text-sm ${goal.completed ? "line-through text-slate-500" : ""}`}>
                        {goal.title}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{goal.description}</div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    goal.priority === "high" ? "bg-red-100 text-red-700" :
                    goal.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {goal.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <Award className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-slate-600">{achievement.description}</div>
                  <div className="text-xs text-slate-500 mt-1">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Settings Body ——— */
function ParticipantSettingsBody() {
  return (
    <div className="p-4 overflow-auto h-full">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white" defaultValue="Sarah Chen" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white" defaultValue="sarah@example.com" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 p-6">
          <h2 className="text-lg font-semibold mb-4">Privacy & Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session reminders</div>
                <div className="text-sm text-slate-600">Get notified before sessions start</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Journal prompts</div>
                <div className="text-sm text-slate-600">Daily reflection prompts</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Progress updates</div>
                <div className="text-sm text-slate-600">Weekly progress summaries</div>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Helper Components ——— */
function ParticipantNavItem({ icon, label, active = false, children, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  children?: React.ReactNode; 
  onClick?: () => void; 
}) {
  return (
    <div 
      className={`group rounded-xl px-3 py-2 cursor-pointer ${active ? "bg-blue-600 text-white" : "hover:bg-white/50"}`} 
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className={`shrink-0 ${active ? "text-white" : "text-slate-600 group-hover:text-slate-700"}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
          <div className={`text-[11px] ${active ? "text-blue-200" : "text-slate-500"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <div>
          <div className="text-lg font-semibold">{value}</div>
          <div className="text-xs text-slate-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
      <div className={`w-3 h-3 rounded-full ${
        session.state === "live" ? "bg-green-500" :
        session.state === "upcoming" ? "bg-blue-500" :
        "bg-slate-400"
      }`} />
      <div className="flex-1">
        <div className="font-medium text-sm">{session.title}</div>
        <div className="text-xs text-slate-600">{session.date} • {session.facilitator}</div>
      </div>
      <div className="text-right">
        {session.state === "live" && (
          <button 
            onClick={() => { location.hash = "#participant/session/live"; }}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs"
          >
            Join Now
          </button>
        )}
        {session.state === "upcoming" && (
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs">Join</button>
        )}
        {session.state === "completed" && (
          <button className="px-3 py-1.5 rounded-lg bg-slate-200 text-xs">Review</button>
        )}
      </div>
    </div>
  );
}

function SessionParticipantCard({ participant }: { participant: SessionParticipantCardType }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-black/5 p-3 hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
          {participant.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{participant.name}</div>
          <div className={`text-[10px] ${
            participant.status === "completed" ? "text-green-600" :
            participant.status === "reflecting" ? "text-yellow-600" :
            "text-slate-500"
          }`}>
            {participant.status === "completed" ? "✓ Done" : 
             participant.status === "reflecting" ? "💭 Reflecting" : 
             "⏳ Selecting"}
          </div>
        </div>
      </div>
      
      {participant.selectedCard ? (
        <div className="space-y-1">
          <div className="aspect-[4/3]">
            <CardDisplay
              card={participant.selectedCard}
              size="sm"
              variant="compact"
              showTitle={true}
              showDescription={false}
              className="w-full h-full"
            />
          </div>
          <div className="text-[10px] text-slate-600 line-clamp-2">{participant.selectedCard.description}</div>
          {participant.reflection && (
            <div className="text-[10px] text-slate-700 bg-slate-50 rounded p-1 italic line-clamp-2">
              "{participant.reflection}"
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-500 text-[10px] text-center">
          {participant.status === "selecting" ? "Choosing..." : "No card"}
        </div>
      )}
    </div>
  );
}

/* ——— Demo Data ——— */
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags: string[];
  favorite: boolean;
  card?: Card | {
    type: 'visual' | 'question' | 'quote';
    title: string;
    description: string;
    icon: string;
  };
}

interface ReflectionPrompt {
  id: string;
  question: string;
  description: string;
  category: string;
}

interface PersonalInsight {
  id: string;
  title: string;
  description: string;
  entriesCount: number;
}

interface PersonalGoal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Session {
  id: string;
  title: string;
  date: string;
  facilitator: string;
  state: SessionState;
}

interface SessionParticipantCardType {
  id: string;
  name: string;
  status: "selecting" | "reflecting" | "completed";
  selectedCard: Card | null;
  reflection: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    title: "Breakthrough in Leadership Session",
    content: "Today's session with Marcus was incredible. The card I drew - 'Leadership' - really spoke to me about my transition into management. I realized I've been afraid of letting go of my technical work, but maybe that's exactly what I need to do to be effective as a leader. Leadership isn't about carrying everything - it's about guiding others to find their own path.",
    date: "Jan 8, 2024",
    mood: "Inspired",
    tags: ["leadership", "transition", "breakthrough"],
    favorite: true,
    card: getCardById("leadership")
  },
  {
    id: "j2", 
    title: "Reflecting on Team Dynamics",
    content: "Had a difficult conversation with my team today. Used the 'open question' technique from last week's session. Instead of telling them what to do, I asked 'What would success look like for you in this project?' The shift in energy was immediate. People started owning their ideas instead of just following orders.",
    date: "Jan 5, 2024",
    mood: "Grateful",
    tags: ["team", "communication", "success"],
    favorite: false,
    card: {
      type: "question",
      title: "What if?",
      description: "What if you tried a different approach?",
      icon: "❓"
    }
  },
  {
    id: "j3",
    title: "Daily Check-in: Courage",
    content: "One word that describes today: Courageous. I finally had that conversation with my manager about the promotion. Didn't go as planned, but I'm proud I spoke up. Sometimes courage isn't about the outcome - it's about showing up authentically.",
    date: "Jan 3, 2024",
    mood: "Proud",
    tags: ["courage", "career", "authenticity"],
    favorite: false,
    card: {
      type: "quote",
      title: "Courage",
      description: "The only way to do great work is to love what you do",
      icon: "💬"
    }
  },
  {
    id: "j4",
    title: "New Year Intentions",
    content: "Setting intentions for 2024. This year, I want to focus on being more present in my relationships, both at work and at home. The card that came up was 'Balance' - such a perfect reminder that success isn't just about achieving goals, it's about maintaining harmony in all areas of life.",
    date: "Jan 1, 2024",
    mood: "Hopeful",
    tags: ["intentions", "goals", "presence"],
    favorite: true,
    card: getCardById("balance")
  }
];

const recentJournalEntries = journalEntries.slice(0, 3);

const reflectionPrompts: ReflectionPrompt[] = [
  {
    id: "p1",
    question: "What's one thing you learned about yourself today?",
    description: "Daily self-awareness prompt to capture insights and growth moments.",
    category: "Self-Discovery"
  },
  {
    id: "p2",
    question: "How did you show courage in a small way this week?",
    description: "Recognize and celebrate moments of bravery, big or small.",
    category: "Courage"
  },
  {
    id: "p3",
    question: "What would you tell your younger self about this situation?",
    description: "Gain perspective by imagining advice you'd give to a younger version of yourself.",
    category: "Wisdom"
  },
  {
    id: "p4",
    question: "What are you most grateful for right now?",
    description: "Cultivate gratitude and appreciation for what's present in your life.",
    category: "Gratitude"
  }
];

const personalInsights: PersonalInsight[] = [
  {
    id: "i1",
    title: "You write most when facing transitions",
    description: "Your journal entries spike during career changes and major life decisions. This suggests writing helps you process uncertainty.",
    entriesCount: 8
  },
  {
    id: "i2",
    title: "Leadership themes are growing",
    description: "Over the past month, 60% of your entries mention leadership, team dynamics, or management challenges. This reflects your evolving role.",
    entriesCount: 12
  },
  {
    id: "i3",
    title: "Gratitude entries correlate with better mood",
    description: "Entries tagged with 'grateful' or 'thankful' consistently show more positive emotional language and optimistic outlook.",
    entriesCount: 6
  }
];

const personalGoals: PersonalGoal[] = [
  {
    id: "g1",
    title: "Practice active listening in all meetings",
    description: "Focus on truly hearing what others say before formulating responses.",
    dueDate: "Jan 31, 2024",
    priority: "high",
    completed: false
  },
  {
    id: "g2",
    title: "Complete leadership development program",
    description: "Finish all 8 modules of the POY leadership track.",
    dueDate: "Mar 15, 2024", 
    priority: "high",
    completed: false
  },
  {
    id: "g3",
    title: "Write 3 journal entries per week",
    description: "Maintain consistent reflection practice for personal growth.",
    dueDate: "Ongoing",
    priority: "medium",
    completed: true
  },
  {
    id: "g4",
    title: "Have monthly 1:1s with each team member",
    description: "Build stronger relationships and provide better support.",
    dueDate: "Ongoing",
    priority: "high",
    completed: false
  }
];

const achievements: Achievement[] = [
  {
    id: "a1",
    title: "30-Day Reflection Streak",
    description: "Completed 30 consecutive days of journal entries",
    date: "Dec 15, 2023"
  },
  {
    id: "a2",
    title: "Leadership Breakthrough",
    description: "Successfully navigated first major team conflict using POY techniques",
    date: "Jan 8, 2024"
  },
  {
    id: "a3",
    title: "Goal Achiever",
    description: "Completed 5 out of 8 quarterly goals",
    date: "Dec 31, 2023"
  }
];

const upcomingSessions: Session[] = [
  {
    id: "s1",
    title: "Leadership Transition Workshop",
    date: "Tomorrow, 2:00 PM",
    facilitator: "Marcus Johnson",
    state: "upcoming"
  },
  {
    id: "s2",
    title: "Team Dynamics Deep Dive",
    date: "Jan 15, 10:00 AM",
    facilitator: "Sarah Miller",
    state: "upcoming"
  },
  {
    id: "s3",
    title: "Monthly Check-in",
    date: "Jan 20, 3:00 PM", 
    facilitator: "Marcus Johnson",
    state: "upcoming"
  }
];

const pastSessions: Session[] = [
  {
    id: "s4",
    title: "Crossing Inner Bridges",
    date: "Jan 8, 2024",
    facilitator: "Marcus Johnson",
    state: "completed"
  },
  {
    id: "s5",
    title: "New Year Intentions Setting",
    date: "Jan 2, 2024",
    facilitator: "Sarah Miller", 
    state: "completed"
  },
  {
    id: "s6",
    title: "Year-End Reflection",
    date: "Dec 28, 2023",
    facilitator: "Marcus Johnson",
    state: "completed"
  }
];

// Group B participants only (smaller focused group)
const groupParticipantCards: SessionParticipantCardType[] = [
  {
    id: "gpc1",
    name: "You",
    status: "completed", 
    selectedCard: {
      id: "card1",
      title: "Ocean Wave",
      description: "Flow, adaptability, power",
      image: "/cards/ocean-wave.jpg",
      category: "nature",
      themes: ["flow", "adaptability", "power"],
      keywords: ["ocean", "wave", "flow"],
      gradient: "from-cyan-500 to-blue-600"
    },
    reflection: "Like waves, I need to learn to flow with change instead of fighting against it."
  },
  {
    id: "gpc2",
    name: "Maria Lopez",
    status: "reflecting", 
    selectedCard: {
      id: "card2",
      title: "Sunrise",
      description: "New beginnings, hope, fresh start",
      image: "/cards/sunrise.jpg",
      category: "nature",
      themes: ["new beginnings", "hope", "fresh start"],
      keywords: ["sunrise", "dawn", "beginning"],
      gradient: "from-yellow-500 to-orange-600"
    },
    reflection: ""
  },
  {
    id: "gpc3",
    name: "James Park",
    status: "completed",
    selectedCard: {
      id: "card3", 
      title: "Mountain Path",
      description: "Journey, direction, steady progress",
      image: "/cards/mountain-path.jpg",
      category: "nature",
      themes: ["journey", "direction", "steady progress"],
      keywords: ["mountain", "path", "journey"],
      gradient: "from-green-500 to-emerald-600"
    },
    reflection: "Every path has its challenges, but the journey teaches us who we're becoming."
  },
  {
    id: "gpc4",
    name: "Lisa Wang",
    status: "selecting",
    selectedCard: null,
    reflection: ""
  }
];

// All session participants (for reference)
// Temporarily commented out to fix build issues
/* const sessionParticipantCards: SessionParticipantCardType[] = [
  {
    id: "spc1",
    name: "Sarah Chen",
    status: "completed",
    selectedCard: {
      id: "card1",
      title: "Mountain Peak",
      description: "Reaching new heights, overcoming challenges",
      gradient: "from-purple-500 to-pink-600"
    },
    reflection: "This mountain represents the leadership challenge I'm facing. I need to take it one step at a time."
  },
  {
    id: "spc2", 
    name: "David Kim",
    status: "completed",
    selectedCard: {
      id: "card2",
      title: "Bridge",
      description: "Transition, connection, crossing boundaries", 
      gradient: "from-blue-500 to-indigo-600"
    },
    reflection: "The bridge symbolizes my career transition. I'm in between where I was and where I want to be."
  },
  {
    id: "spc3",
    name: "Maria Lopez",
    status: "reflecting", 
    selectedCard: {
      id: "card3",
      title: "Sunrise",
      description: "New beginnings, hope, fresh start",
      gradient: "from-yellow-500 to-orange-600"
    },
    reflection: ""
  },
  {
    id: "spc4",
    name: "Alex Johnson",
    status: "completed",
    selectedCard: {
      id: "card4", 
      title: "Tree Roots",
      description: "Foundation, grounding, stability",
      gradient: "from-green-500 to-emerald-600"
    },
    reflection: "Like roots, I need to stay grounded while reaching for growth."
  },
  {
    id: "spc5",
    name: "Emma Wilson",
    status: "selecting",
    selectedCard: null,
    reflection: ""
  },
  {
    id: "spc6",
    name: "You",
    status: "completed", 
    selectedCard: {
      id: "card5",
      title: "Ocean Wave",
      description: "Flow, adaptability, power",
      gradient: "from-cyan-500 to-blue-600"
    },
    reflection: "Like waves, I need to learn to flow with change instead of fighting against it."
  }
]; */

// Demo decks for composer using real card images
const visualDeck: Card[] = getCardsByCategory('visual').concat(getCardsByCategory('concept')).slice(0, 8);

const questionDeck: Card[] = [
  {
    id: 'q1',
    title: 'What stands out most?',
    description: 'Observation-based reflection',
    image: '/cards/Opints_of_view.png',
    category: 'reflection',
    themes: ['observation', 'awareness', 'perspective'],
    gradient: 'from-teal-500 to-cyan-600',
    keywords: ['observe', 'notice', 'perspective'],
  },
  {
    id: 'q2',
    title: 'What is changing for you?',
    description: 'Transition prompt',
    image: '/cards/Choice.png',
    category: 'reflection',
    themes: ['change', 'transition', 'growth'],
    gradient: 'from-orange-500 to-red-500',
    keywords: ['change', 'transition', 'growth'],
  },
  {
    id: 'q3',
    title: 'What would a first step look like?',
    description: 'Action-oriented',
    image: '/cards/Solutions.png',
    category: 'action',
    themes: ['action', 'steps', 'beginning'],
    gradient: 'from-emerald-500 to-green-600',
    keywords: ['action', 'step', 'beginning'],
  },
  {
    id: 'q4',
    title: 'What strength helps here?',
    description: 'Values & strengths',
    image: '/cards/Success.png',
    category: 'reflection',
    themes: ['strength', 'values', 'power'],
    gradient: 'from-yellow-500 to-orange-600',
    keywords: ['strength', 'values', 'power'],
  },
  {
    id: 'q5',
    title: 'What\'s another way to see this?',
    description: 'Reframing',
    image: '/cards/Opints_of_view.png',
    category: 'concept',
    themes: ['perspective', 'reframing', 'understanding'],
    gradient: 'from-teal-500 to-cyan-600',
    keywords: ['reframe', 'perspective', 'view'],
  },
  {
    id: 'q6',
    title: 'What are you learning?',
    description: 'Growth lens',
    image: '/cards/Learning.png',
    category: 'concept',
    themes: ['learning', 'growth', 'development'],
    gradient: 'from-blue-500 to-indigo-600',
    keywords: ['learning', 'growth', 'development'],
  },
];

const quoteDeck: Card[] = [
  {
    id: 't1',
    title: 'In the middle of difficulty lies opportunity.',
    description: 'Albert Einstein',
    image: '/cards/Solutions.png',
    category: 'concept',
    themes: ['opportunity', 'challenge', 'wisdom'],
    gradient: 'from-emerald-500 to-green-600',
    keywords: ['opportunity', 'difficulty', 'challenge'],
  },
  {
    id: 't2',
    title: 'The cave you fear to enter holds the treasure you seek.',
    description: 'Joseph Campbell',
    image: '/cards/Calling.png',
    category: 'reflection',
    themes: ['courage', 'fear', 'treasure'],
    gradient: 'from-purple-500 to-pink-500',
    keywords: ['courage', 'fear', 'treasure'],
  },
  {
    id: 't3',
    title: 'Be yourself; everyone else is already taken.',
    description: 'Oscar Wilde',
    image: '/cards/Just_be.png',
    category: 'reflection',
    themes: ['authenticity', 'individuality', 'being'],
    gradient: 'from-green-400 to-blue-500',
    keywords: ['authentic', 'yourself', 'unique'],
  },
  {
    id: 't4',
    title: 'What lies behind us and before us are tiny matters...',
    description: 'Ralph Waldo Emerson',
    image: '/cards/Everything_is_possible.png',
    category: 'concept',
    themes: ['potential', 'present', 'possibility'],
    gradient: 'from-yellow-400 to-orange-500',
    keywords: ['potential', 'present', 'within'],
  },
  {
    id: 't5',
    title: 'Only those who risk going too far can find how far they can go.',
    description: 'T.S. Eliot',
    image: '/cards/Leadership.png',
    category: 'action',
    themes: ['risk', 'courage', 'limits'],
    gradient: 'from-indigo-500 to-purple-600',
    keywords: ['risk', 'courage', 'limits'],
  },
  {
    id: 't6',
    title: 'Whether you think you can or think you can\'t, you\'re right.',
    description: 'Henry Ford',
    image: '/cards/Success.png',
    category: 'concept',
    themes: ['mindset', 'belief', 'success'],
    gradient: 'from-yellow-500 to-orange-600',
    keywords: ['belief', 'mindset', 'success'],
  },
];
