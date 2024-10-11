import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGroups, getIsLoading, getError } from '@/lib/features/group/group.slice';
import GroupCard from './GroupCard';
import LoadingSpinner from '../status/LoadingSpinner';
import ErrorMessage from '../status/ErrorMessage';
import { groupService } from '@/app/service/group/group.service';
import { useAppDispatch } from '@/lib/store';
import Pagination from './pagination/Pagination';

interface GroupRowProps {
  active: boolean;
  onSelect: () => void;
}

const GroupRow = ({ active, onSelect }: GroupRowProps) => {
  const dispatch = useAppDispatch();
  const groups = useSelector(getGroups);
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState();
  const totalItems = 10; 

  useEffect(() => {
    groupService.findList(page, pageSize, dispatch);
    
  }, [page, pageSize]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} active={active} onSelect={onSelect} />
      ))}
      <Pagination 
        currentPage={page} 
        pageSize={pageSize} 
        totalItems={totalItems} 
        onPageChange={setPage} 
        onPageSizeChange={setPageSize} 
      />
    </>
  );
};

export default GroupRow;