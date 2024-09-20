/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';

import Dropdown from '../../components/common/dropdown';
import Header from '../../components/common/header';
import CourseItem from '../../components/community/CourseItem';
import FloatingBtn from '../../components/community/FloatingBtn';
import { sortDropdownItems } from '../../constants/object';
import { useAllCourses } from '../../hooks/api/useCourse';
import { CourseListResponse, CourseItemType } from '../../types/community';

import { v4 as uuid } from 'uuid';

const index = () => {
  const [resData, setResData] = useState<CourseListResponse>();
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>('');

  const { data, isLoading, refetch } = useAllCourses(page, sort);

  useEffect(() => {
    if (data) {
      setResData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, sort]);

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
            onSelect={(selectedSort) =>
              setSort(selectedSort.value ? selectedSort.value : '')
            }
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
