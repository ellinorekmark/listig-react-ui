import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListAlt from '@mui/icons-material/ListAlt';
import Add from '@mui/icons-material/Add';
import Person from '@mui/icons-material/Person';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const goToOverviewPage = () => {
    navigate('/overview');
  };
  const goToNewListPage = () => {
    navigate('/newlist');
  };
  const goToProfilePage = () => {
    navigate('/profile');
  };

  return (
<Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        
        >
          <BottomNavigationAction label="Lists" icon={<ListAlt />} onClick={goToOverviewPage}/>
          <BottomNavigationAction label="New List" icon={<Add />} onClick={goToNewListPage}/>
          <BottomNavigationAction label="Profile" icon={<Person />} onClick={goToProfilePage}/>
        </BottomNavigation>
      </Box>
    
  );
}