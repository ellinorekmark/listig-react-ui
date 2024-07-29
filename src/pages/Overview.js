import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiCaller } from "../ApiCaller";
import { AuthContext } from "../AuthContext";


const apiCaller = new ApiCaller();

export default function InteractiveList() {
  const { loginDetails } = useContext(AuthContext);
  const [overviewData, setOverviewData] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {


    const fetchData = async () => {
      try {
        const data = await apiCaller.sendGet("list/all", loginDetails);
        setOverviewData(data);


      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);

      }
    };

  fetchData();

  }, [loginDetails]);

  function goToList(id) {
    navigate(`/list/${id}`);
  }

  return (
      <>
        <h1>Lists Overview</h1>
        <Box maxWidth={750} sx={{ mx: 'auto' }}>
          {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
          ) : (
              <List dense>
                {overviewData.map((list) => (
                    <ListItem
                        key={list.id}
                        onClick={() => goToList(list.id)}
                        sx={{ cursor: 'pointer',
                          border: '1px solid ',
                          marginTop: '5px',
                          borderRadius: '5px' ,
                        }} >
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
          )}
        </Box>
      </>
  );
}
