import { AnimatePresence } from 'framer-motion';
import React from 'react';

import CommonDivider from './CommonDivider';

export type PopUpList = {
  title: string;
  key: string;
  icon?: React.ReactElement;
  em?: boolean;
};

type Props = {
  list: PopUpList[];
  isMoreViewPopUp: boolean;
  onClick: (key?: string) => void;
  right?: number | string;
};

export default function CommonPopUp({ list, isMoreViewPopUp, right = 0, onClick }: Props) {
  return (
    <AnimatePresence>
      {isMoreViewPopUp && (
        <div style={{ right }} className="z-50 px-6">
          <ul className="shadow-elevation50 bg-white z-50 relative rounded-2xl min-w-[172px]">
            {list.map((item, index) => (
              <React.Fragment key={item.key}>
                <li>
                  <button
                    onClick={() => onClick(item.key)}
                    className="flex items-center space-x-2 w-full h-12 bg-white rounded-2xl justify-center"
                  >
                    {item?.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <span
                      className={`${
                        item.em ? 'text-system-r-R400' : 'text-secondary-N900'
                      } truncate font-bold text-label-md tracking-label-md`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
                {index !== list.length - 1 && (
                  <div className="mt-1">
                    <CommonDivider type="sm" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </AnimatePresence>
  );
}
