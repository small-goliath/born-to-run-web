type HeaderTab = {
  title: string;
  type: string;
};

const HOME_HEADER_TABS: readonly HeaderTab[] = [
  {
    title: '커뮤니티',
    type: 'COMMUNITY',
  },
  {
    title: '마켓',
    type: 'MARKET',
  },
] as const;

const HOME_SEARCH_HEADER_TABS: readonly HeaderTab[] = [
  {
    title: '전체',
    type: 'ALL',
  },
  {
    title: '커뮤니티',
    type: 'COMMUNITY',
  },
  {
    title: '마켓',
    type: 'MARKET',
  },
] as const;

const RUNNING_HEADER_TABS: readonly HeaderTab[] = [
  {
    title: '마라톤',
    type: 'marathon',
  },
  {
    title: '모임',
    type: 'class',
  },
] as const;

const MARATHON_BOTTOM_MODAL_TABS = [
  {
    title: '지역',
    type: 'location',
  },
  {
    title: '코스',
    type: 'course',
  },
] as const;

export { HOME_HEADER_TABS, RUNNING_HEADER_TABS, HOME_SEARCH_HEADER_TABS, MARATHON_BOTTOM_MODAL_TABS };
export type { HeaderTab };
