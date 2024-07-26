import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import EditableList from '../EditableList';
import ListDisplay from "../ListDisplay";
const ViewList = () => {
  const { id } = useParams();
  const [locked, setLocked] = useState(true);

  const toggleLocked = () => {
    setLocked(!locked);
  };

  return (
    <>
      <h1>List Page for ID: {id}</h1>
      <Box maxWidth={750} sx={{ mx: 'auto' }}>
        {locked ? <ListDisplay /> : <EditableList />}
        <Button variant="contained" color="primary" onClick={toggleLocked} sx={{ mt: 2 }}>
          {locked ? 'Unlock' : 'Lock'}
        </Button>
      </Box>
    </>
  );
};

export default ViewList;

