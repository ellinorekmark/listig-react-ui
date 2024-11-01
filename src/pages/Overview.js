import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListAltIcon from '@mui/icons-material/ListAltTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
    Typography,
    CircularProgress,
    ToggleButtonGroup,
    ToggleButton,
    Icon,
    Accordion,
    AccordionDetails, AccordionSummary, Button
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheckTwoTone';
import PageHeader from "../components/PageHeader";

const apiCaller = new ApiCaller();

export default function Overview() {
    const {loginDetails, user} = useContext(AuthContext);
    const [overviewData, setOverviewData] = useState([]);
    const [activeFiltered, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publicLists, setPublicLists] = useState([]);

    const navigate = useNavigate();
    const [alignment, setAlignment] = useState(localStorage.getItem("overviewAlignment"));

    const handleChange = (event, newAlignment) => {
        if(newAlignment!== null){
            localStorage.setItem("overviewAlignment", newAlignment)
            setAlignment(newAlignment);
            filterList(newAlignment);
        }

    };

    const sortListByLastEdit = (data) => {
        return data.sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiCaller.sendGet("list/all", loginDetails);
                const sortedData = sortListByLastEdit(data);
                setOverviewData(sortedData);
            } catch (error) {
                console.error("Error fetching data",error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [loginDetails]);

    useEffect(() => {
        const findPublicLists = () => {
            const owned = overviewData.filter(l => ownsList(l))
            const lists = (owned.filter(l => l.uuid !== null));
            setPublicLists(lists)
        }
        findPublicLists();
    }, [overviewData])
    useEffect(() => {
        if (overviewData.length > 0) {
            filterList(alignment);
        }
    }, [overviewData, alignment]);
    function goToList(id) {
        navigate(`/web/list/${id}`);
    }

    function goToPublicView(uuid) {
        window.open(`/web/public/${uuid}`, '_blank', 'noopener,noreferrer');
        //navigate(`/web/public/${uuid}`);
    }

    function filterList(option) {
        let filteredData = [];
        switch (option) {
            case "all":
                filteredData = overviewData;
                break;
            case "private":
                filteredData = overviewData.filter(privateList);
                break;
            case "shared":
                filteredData = overviewData.filter(sharedList);
                break;
            default:
                break;
        }
        setFilteredList(sortListByLastEdit(filteredData));
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
            case 'LINK':
                return <OpenInNewIcon sx={{color: "primary.darker"}}/>
            default:
                return <ListAltIcon sx={{color: "primary.darker"}}/>;
        }
    }

    function ownsList(l) {
        return l.owner === user.username;
    }

    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}}>
                <PageHeader title={"Lists"}></PageHeader>
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

                {loading && (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                        <CircularProgress/>
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
                                {!ownsList(list) ? (
                                    <Box sx={{
                                        color: 'primary.lighter',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                        <PersonIcon/>
                                        <Typography>{list.owner}</Typography>
                                    </Box>
                                ) : (
                                    <Box><Icon></Icon></Box>
                                )}

                            </ListItem>
                        ))}
                    </List>
                )}
                {publicLists.length > 0 && (
                    <>
                        <Accordion sx={{
                            border: '1px solid ',
                            borderColor: 'primary.darker',
                            marginTop: '5px',
                            borderRadius: '5px',
                        }}>
                            <AccordionSummary>
                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <Typography >My Public Lists</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List dense>
                                    {publicLists.map((list) => (
                                        <ListItem
                                            key={list.id}
                                            sx={{
                                                cursor: 'pointer',
                                                border: '1px solid ',
                                                borderColor: 'primary.darker',
                                                marginTop: '5px',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            <ListItemText
                                                primary={list.name}
                                            />
                                            <Button
                                                variant={"outlined"}
                                                onClick={() => goToList(list.id)}
                                                aria-label="Open list in Edit mode"
                                                size="small"
                                            >
                                                Edit</Button>
                                            <Button
                                                variant={"outlined"}
                                                onClick={() => goToPublicView(list.uuid)}
                                                aria-label="Open list in Public mode"
                                                size="small"
                                            >
                                                view
                                            </Button>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}
            </Box>
        </>
    );
}
