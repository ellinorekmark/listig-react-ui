import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function InteractiveList() {
  const dummyData = [
    { id: 1, name: "To Do", desc: "Things to do", owner: "elli", users: 1 },
    { id: 2, name: "To Dont", desc: "Things not to do", owner: "user", users: 2 }
  ];

  const navigate = useNavigate();

  function goToList(id) {
    navigate(`/list/${id}`);
  }

  return (
    <>
      <h1>Lists Overview</h1>
      <Box maxWidth={750} sx={{ mx: 'auto' }}>
        <List dense>
          {dummyData.map((list) => (
            <ListItem 
              key={list.id} 
              onClick={() => goToList(list.id)}
              sx={{ cursor: 'pointer',
                border: '1px solid ',
                margin: '5px',
                borderRadius: '5px' 
               }} 
              
            >
              <ListItemAvatar>
                <Avatar>
                  <ListAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={list.name}
                secondary={list.desc}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon />
                <Typography sx={{ ml: 1 }}>{list.owner}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
