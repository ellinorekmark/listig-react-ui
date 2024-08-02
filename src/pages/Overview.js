import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import {Typography, CircularProgress, ToggleButtonGroup, ToggleButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";


const apiCaller = new ApiCaller();

export default function InteractiveList() {
    const {loginDetails, user} = useContext(AuthContext);
    const [overviewData, setOverviewData] = useState([]);
    const [activeFiltered, setFilteredList] = useState([])
    const [loading, setLoading] = useState(true);
    const [noDataFetch, setData] = useState(true);

    const navigate = useNavigate();

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        filterList(newAlignment); // Pass the new alignment to filterList
    };
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await apiCaller.sendGet("list/all", loginDetails);
                setOverviewData(data);
                setFilteredList(data);
                setData(false);
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

    function filterList(option) {
        switch (option) {
            case "all":
                console.log("all")
                setFilteredList(overviewData);
                break;

            case "private":
                console.log("private")
                setFilteredList(overviewData.filter(privateList));
                break;

            case "shared":
                console.log("shared")
                setFilteredList(overviewData.filter(sharedList));
                break;
        }
    }

    function privateList(l) {
        return l.users === 1;
    }

    function sharedList(l) {
        return l.users !== 1;
    }

    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}}>
                <Box sx={{
                    paddingTop: 2
                }}>
                    <Typography fontSize={"xx-large"} sx={{
                        fontFamily: 'Garamond',
                    }}>
                        Lists
                    </Typography><br/>
                </Box>
                <Box sx={{paddingBottom: 2}}>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Filter"
                    >
                        <ToggleButton value="private">Private</ToggleButton>
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="shared">Shared</ToggleButton>
                    </ToggleButtonGroup>

                </Box>

                {loading ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                        <CircularProgress/>
                    </Box>
                ) : (


                    <List dense>
                        {activeFiltered.map((list) => (
                            <ListItem
                                key={list.id}
                                onClick={() => goToList(list.id)}
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid ',
                                    marginTop: '5px',
                                    borderRadius: '5px',
                                    borderColor: 'gray'
                                }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ListAltIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={list.name}
                                    secondary={list.desc}
                                />
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <PersonIcon/>
                                    <Typography sx={{ml: 1}}>{list.owner}</Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )
                }

            </Box>
        </>
    );
}
