import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export const sideNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Articles', href: '#', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];

export const sideNavigationLogged = [
  { name: 'Home', href: '/user/main', icon: HomeIcon, current: true },
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Articles', href: '#', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];

export const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];
export const userNavigation = [
  { name: 'Log In', href: '/login' },
  { name: 'Sign Up', href: '/signup' },
];

export const userLoggedNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '/logout' },
];
