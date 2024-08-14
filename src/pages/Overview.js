import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListAltIcon from '@mui/icons-material/ListAltTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import {Typography, CircularProgress, ToggleButtonGroup, ToggleButton, Icon} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheckTwoTone';
import PageHeader from "../components/PageHeader";
const apiCaller = new ApiCaller();

export default function InteractiveList() {
    const {loginDetails, user} = useContext(AuthContext);
    const [overviewData, setOverviewData] = useState([]);
    const [activeFiltered, setFilteredList] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        filterList(newAlignment);
    };
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await apiCaller.sendGet("list/all", loginDetails);
                setOverviewData(data);
                setFilteredList(data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [loginDetails]);

    function goToList(id) {
        navigate(`/web/list/${id}`);
    }

    function filterList(option) {
        switch (option) {
            case "all":
                setFilteredList(overviewData);
                break;

            case "private":
                setFilteredList(overviewData.filter(privateList));
                break;

            case "shared":
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
    function getListIcon(type) {
        switch (type) {
            case 'CHECK':
                return <LibraryAddCheckIcon sx={{color: "primary.darker"}}/>;
            default:
                return <ListAltIcon sx={{color: "primary.darker"}}/>;
        }
    }


    function ownsList(l){
        return l.owner === user.username;
    }
    return (
        <>
            <Box maxWidth={750} sx={{ mx: 'auto' }}>
                <PageHeader title={"Lists"}></PageHeader>
                <Box sx={{ paddingBottom: 2 }}>
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

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && activeFiltered.length === 0 && (
                    <Typography variant="h7" color="textSecondary" align="center">
                        Empty
                    </Typography>
                )}

                {!loading && activeFiltered.length > 0 && (
                    <List dense>
                        {activeFiltered.map((list) => (
                            <ListItem
                                key={list.id}
                                onClick={() => goToList(list.id)}
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid ',
                                    borderColor: 'primary.darker',
                                    marginTop: '5px',
                                    borderRadius: '5px',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{backgroundColor: "primary.lighter"}}>
                                        {getListIcon(list.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={list.name}
                                    secondary={list.desc}
                                />
                                {!ownsList(list)? (
                                    <Box sx={{  color: 'primary.lighter', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                                    <PersonIcon />
                                    <Typography >{list.owner}</Typography>
                                </Box>
                                ): (
                                    <Box><Icon></Icon></Box>
                                )}

                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </>


);
}
