import HomeIcon from '../components/icon/navIcon/homeIcon.svg';
import ActiveCrewIcon from '../components/icon/navIcon/activeCrewIcon.svg';
import CrewIcon from '../components/icon/navIcon/crewIcon.svg';
import ActiveHomeIcon from '../components/icon/navIcon/activeHomeIcon.svg';
import ProfileIcon from '../components/icon/navIcon/profileIcon.svg';
import ActiveProfileIcon from '../components/icon/navIcon/activeProfileIcon.svg';
import RunningIcon from '../components/icon/navIcon/runningIcon.svg';
import ActiveRunningIcon from '../components/icon/navIcon/activeRunningIcon.svg';

const NAVBAR_LIST = [
  {
    key: 'home',
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
    path: '/',
    title: '홈',
  },
  {
    key: 'running',
    icon: RunningIcon,
    activeIcon: ActiveRunningIcon,
    path: '/running',
    title: '러닝',
  },
  {
    key: 'crew',
    icon: CrewIcon,
    activeIcon: ActiveCrewIcon,
    path: '/crew',
    title: '크루',
  },
  {
    key: 'my',
    icon: ProfileIcon,
    activeIcon: ActiveProfileIcon,
    path: '/my',
    title: '마이',
  },
] as const;

export { NAVBAR_LIST };
