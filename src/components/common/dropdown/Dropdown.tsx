import { useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import CSSTransition from 'react-transition-group/CSSTransition';

import {
  DropdownItemType,
  DropdownProps,
  DropdownSize,
  DropdownType,
} from './Dropdown.types';

import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const styles: {
  base: string;
  sizes: Record<DropdownSize, string>;
  types: Record<DropdownType, string>;
} = {
  base: 'w-full bg-wh cursor-pointer rounded-[5px] flex items-center justify-between',
  sizes: {
    sm: 'max-w-[60px] h-[26px] px-[6px]',
    lg: 'max-w-[280px] h-10 px-[15px]',
  },
  types: {
    sub: 'border !border-sub-400 text-bk-90 text-body3',
    primary: 'border !border-primary-500 text-primary-500 text-btn3',
  },
};

const DropDown = ({ dropdownItems, size, type, onSelect }: DropdownProps) => {
  const animationTiming = {
    enter: 100,
    exit: 300,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(dropdownItems[0].id);

  const handleSelect = (item: DropdownItemType) => {
    if (item.id !== 0) {
      // 0번째 항목은 선택하지 않음
      setSelectedItem(item.id);
      setIsOpen(false); // 항목 선택 시 드롭다운을 닫음
      onSelect && onSelect(item); // onSelect가 제공되었을 때만 호출
    }
  };

  return (
    <div className="w-full box-border">
      <button
        className={clsx(
          styles.base,
          styles.sizes[size],
          styles.types[type],
          type == 'primary' && '!border-none',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {dropdownItems[selectedItem].text}{' '}
        {isOpen ? (
          <HiOutlineChevronUp
            className={
              type == 'sub'
                ? 'w-6 h-6 text-sub-400'
                : 'w-3 h-3 text-primary-500'
            }
          />
        ) : (
          <HiOutlineChevronDown
            className={
              type == 'sub'
                ? 'w-6 h-6 text-sub-400'
                : 'w-3 h-3 text-primary-500'
            }
          />
        )}
      </button>
      <CSSTransition
        in={isOpen}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={clsx(
            'h-0 z-10 absolute pt-1',
            size === 'sm' ? 'w-full max-w-[60px]' : 'w-full max-w-[280px]',
          )}
        >
          {dropdownItems.slice(1).map((item) => {
            // 0번째 항목을 제외하고 렌더링
            const isFirst = item.id === 1; // 1번째 항목이 이제 첫 번째가 됨
            const isLast = item.id === dropdownItems.length - 1;

            return (
              <ul
                key={uuid()}
                className={clsx(
                  styles.base,
                  styles.sizes[size],
                  styles.types[type],
                  !isFirst &&
                    !isLast &&
                    'rounded-none !border-t-0 !border-b-[0.5px]',
                  isFirst && 'rounded-b-none !border-b-[0.5px]',
                  isLast && 'rounded-t-none !border-t-0',
                )}
                onClick={() => handleSelect(item)}
              >
                {item.text}
              </ul>
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDown;
