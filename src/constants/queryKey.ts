export const queryKeys = {
  AUTH: {
    SIGNUP: 'signup',
    LOGIN: 'login',
    SIGNOUT: 'signout',
  },
  USER: {
    INFO: 'userInfo',
  },
  COMMUNITY: {
    ALL: 'feedAll',
    DETAIL: 'feedDetail',
    DELETE: 'feedDelete',
    POST: 'feedPost',
    UPDATE: 'feedUpdate',
    LIKE: 'feedLike',
    UPLOAD: 'upload',
    SEARCH: {
      ALL: 'searchAll',
      POST: 'searchPost',
      DELETE: 'searchDelete',
      ALL_DELETE: 'searchAllDelete',
    },
  },
  COMMENT: {
    ALL: 'commentAll',
    DETAIL: 'commentDetail',
    POST: 'commentPost',
    DELETE: 'commentDelete',
    UPDATE: 'commentUpdate',
  },
  FILE: {
    UPLOAD: 'fileUpload',
    DELETE: 'fileDelete',
  },
  PUBLIC: {
    HOLIDAY: 'holiday',
  },
  MARATHON: {
    GET_MARATHON_LIST: 'GetMarathonList',
    GET_MARATHON_DETAIL: 'GetMarathonDetail',
  },
} as const;
