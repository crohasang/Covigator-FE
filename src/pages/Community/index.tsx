/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';

import Dropdown from '../../components/common/dropdown';
import Header from '../../components/common/header';
import CourseItem from '../../components/community/CourseItem';
import FloatingBtn from '../../components/community/FloatingBtn';
import { sortDropdownItems } from '../../constants/object';
import { useAllCourses } from '../../hooks/api/useCourse';
import { AllCourseResponse, CourseItemType } from '../../types/community';

import { v4 as uuid } from 'uuid';

export const dummy: CourseItemType[] = [
  {
    id: 0,
    title: '0번',
    caption: '0번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 1,
    title: '1번',
    caption: '1번 설명',
    rate: 4.5,
    isLike: true,
  },
  {
    id: 2,
    title: '2번',
    caption: '2번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 3,
    title: '3번',
    caption: '3번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 4,
    title: '4번',
    caption: '4번 설명',
    rate: 0,
    isLike: false,
  },
  {
    id: 5,
    title: '5번',
    caption: '5번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 6,
    title: '6번',
    caption: '6번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 7,
    title: '7번',
    caption: '7번 설명',
    rate: 4.5,
    isLike: false,
  },
  {
    id: 8,
    title: '8번',
    caption: '8번 설명',
    rate: 4.5,
    isLike: false,
  },
];

const index = () => {
  const [resData, setResData] = useState<AllCourseResponse>();
  const { data, isLoading, refetch } = useAllCourses();

  useEffect(() => {
    if (data) {
      setResData(data);
    }
  }, [data]);

  return (
    <div className="w-full h-full pt-[67px] px-[30px] pb-5">
      <header className="relative mb-[19px]">
        <Header
          title={'커뮤니티'}
          subtitle={'다른 사용자들과 코스를 공유해보세요'}
        />
        <div className="absolute bottom-0 right-0">
          <Dropdown
            dropdownItems={sortDropdownItems}
            size={'sm'}
            type={'primary'}
          />
        </div>
      </header>
      <main className="h-full flex flex-col gap-6 ">
        {resData &&
          resData.courses.map((d) => {
            return (
              <CourseItem
                key={uuid()}
                id={0}
                title={d.name}
                caption={d.description}
                img={''}
                rate={d.score}
                isLike={true}
              />
            );
          })}
      </main>
      <FloatingBtn />
    </div>
  );
};

export default index;
