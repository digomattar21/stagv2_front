import {
  DocumentDuplicateIcon,
  HomeIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';

export let sideNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  {
    name: 'Articles',
    href: '/articles',
    children: [
      { name: 'Popular', href: '/articles' },
      { name: 'Finances', href: '' },
      // { name: 'Submit an article', href: '/article-submission' },
    ],
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: 'News',
    href: '/news',
    children: [
      { name: 'Breaking', href: '/news' },
      { name: 'Technology', href: '/news' },
      { name: 'Politics', href: '/news' },
    ],
    icon: NewspaperIcon,
    current: false,
  },
  // { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];

export let sideNavigationLogged = [
  { name: 'Home', href: '/user/main', icon: HomeIcon, current: true },
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  {
    name: 'Articles',
    href: '/articles',
    children: [
      { name: 'Popular', href: '/articles' },
      { name: 'Finances', href: '' },
      { name: 'Submit an article', href: '/user/article-submission' },
    ],
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: 'News',
    href: '/news',
    children: [
      { name: 'Breaking', href: '/news' },
      { name: 'Technology', href: '/news' },
      { name: 'Politics', href: '/news' },
    ],
    icon: NewspaperIcon,
    current: false,
  },
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
