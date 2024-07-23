import React from 'react';
import { useParams } from 'react-router-dom';

const List = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>List Page for ID: {id}</h1>
    </div>
  );
};

export default List;
