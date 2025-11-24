import React from 'react';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SITES = 'SITES',
  HOSTING = 'HOSTING',
  CRM = 'CRM',
  PROJECTS = 'PROJECTS',
  EMAIL = 'EMAIL',
  ECOMMERCE = 'ECOMMERCE',
  AI_STUDIO = 'AI_STUDIO',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS'
}

export enum ServerStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  MAINTENANCE = 'MAINTENANCE',
  PROVISIONING = 'PROVISIONING'
}

export enum DealStage {
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  CLOSED_WON = 'CLOSED_WON'
}

export interface ServerNode {
  id: string;
  name: string;
  ip: string;
  region: string;
  status: ServerStatus;
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  sites: number;
}

export interface Deal {
  id: string;
  clientName: string;
  value: number;
  stage: DealStage;
  probability: number;
}

export interface AIContentRequest {
  topic: string;
  tone: string;
  type: 'BLOG' | 'SOCIAL' | 'EMAIL' | 'AD';
}

export interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<any>;
}