import { 
  LayoutDashboard, 
  Server, 
  Users, 
  Bot, 
  BarChart3, 
  Settings,
  Globe,
  FolderKanban,
  Mail,
  ShoppingBag
} from 'lucide-react';
import { AppView, NavItem, ServerNode, ServerStatus, Deal, DealStage } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: AppView.DASHBOARD, label: 'Command Center', icon: LayoutDashboard },
  { id: AppView.SITES, label: 'Sites & Builder', icon: Globe },
  { id: AppView.HOSTING, label: 'VPS & Hosting', icon: Server },
  { id: AppView.ECOMMERCE, label: 'Store & Products', icon: ShoppingBag },
  { id: AppView.CRM, label: 'CRM & Pipeline', icon: Users },
  { id: AppView.PROJECTS, label: 'Project Mgmt', icon: FolderKanban },
  { id: AppView.EMAIL, label: 'Email Marketing', icon: Mail },
  { id: AppView.AI_STUDIO, label: 'AI Content Studio', icon: Bot },
  { id: AppView.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { id: AppView.SETTINGS, label: 'Settings', icon: Settings },
];

export const MOCK_SERVERS: ServerNode[] = [
  { id: 'srv-001', name: 'Alpha Node (Production)', ip: '192.168.1.10', region: 'US-East', status: ServerStatus.RUNNING, cpuUsage: 45, ramUsage: 62, diskUsage: 30, sites: 12 },
  { id: 'srv-002', name: 'Beta Node (Staging)', ip: '192.168.1.11', region: 'US-West', status: ServerStatus.RUNNING, cpuUsage: 12, ramUsage: 24, diskUsage: 15, sites: 5 },
  { id: 'srv-003', name: 'Gamma Node (Backup)', ip: '192.168.1.12', region: 'EU-Central', status: ServerStatus.STOPPED, cpuUsage: 0, ramUsage: 0, diskUsage: 88, sites: 0 },
  { id: 'srv-004', name: 'Delta DB Cluster', ip: '10.0.0.50', region: 'US-East', status: ServerStatus.MAINTENANCE, cpuUsage: 5, ramUsage: 10, diskUsage: 45, sites: 0 },
];

export const MOCK_DEALS: Deal[] = [
  { id: 'd-1', clientName: 'Acme Corp', value: 15000, stage: DealStage.PROPOSAL, probability: 75 },
  { id: 'd-2', clientName: 'Stark Industries', value: 50000, stage: DealStage.QUALIFIED, probability: 40 },
  { id: 'd-3', clientName: 'Wayne Ent', value: 120000, stage: DealStage.LEAD, probability: 20 },
  { id: 'd-4', clientName: 'Cyberdyne', value: 8500, stage: DealStage.CLOSED_WON, probability: 100 },
  { id: 'd-5', clientName: 'Massive Dynamic', value: 22000, stage: DealStage.PROPOSAL, probability: 60 },
];