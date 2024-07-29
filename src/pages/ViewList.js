import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import EditableList from '../EditableList';
import ListDisplay from "../ListDisplay";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const ViewList = () => {
  const { id } = useParams();
  const [locked, setLocked] = useState(true);

  const toggleLocked = () => {
    setLocked(!locked);
  };

  return (
    <>
      <h1>List Page for ID: {id}</h1>
        <Box  onClick={toggleLocked} sx={{ mt: 2 }}>
        {locked ? <LockIcon color="primary"/> : <LockOpenIcon color="primary"/>}
    </Box>
      <Box maxWidth={750} sx={{ mx: 'auto' }}>
        {locked ? <ListDisplay /> : <EditableList />}

      </Box>
    </>
  );
};

export default ViewList;

