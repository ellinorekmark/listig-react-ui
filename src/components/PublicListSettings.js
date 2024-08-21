import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import {BASE_URL_PUBLIC} from "../constants";
import {useNavigate} from "react-router-dom";

const api = new ApiCaller()
const PublicListSettings = ({uList, updateList}) => {
    const {loginDetails} = useContext(AuthContext);
    const [isPublic, setPublic] = useState(false);
    const [address, setAddress] = useState("");
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    function createURL() {
        if (uList.listInfo.uuid !== null) {
            setAddress(BASE_URL_PUBLIC + uList.listInfo.uuid)
        }
        else{
            return ""
        }
    }

    useEffect(() => {
        setPublic(uList.listInfo.uuid !== null)
        createURL();
    }, [uList]);

    const makePublic = async () => {
        const updated = await api.sendPost("list/makePublic", uList, loginDetails)
        updateList(updated)
    }
    const makePrivate = async () => {
        const updated = await api.sendPost("list/makePrivate", uList, loginDetails)
        updateList(updated)
    }
    const goToPublic = () => {
        navigate(`/web/public/${uList.listInfo.uuid}`)
    }
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
            {isPublic ? (
                <>
                    <Typography>List is <strong>Public</strong></Typography>
                    <br />
                    <Typography>Share the link with anyone to let them view your list.</Typography>
                    <br />
                    <Button sx={{m:1}} variant="outlined" fullWidth onClick={copyToClipboard}>
                        {copied ? "Link Copied!" : "Copy Link"}
                    </Button>
                    <Button sx={{m:1}} variant="outlined" fullWidth onClick={goToPublic}>
                        Go to Public List
                    </Button>


                    <Button sx={{m:1}} variant="outlined" fullWidth onClick={makePrivate}>
                        Make private
                    </Button>
                </>
            ) : (
                <>
                    <Typography>List is <strong>Private</strong>
                    <br /> Only you and those you invite are able to access the list.</Typography><br />
                    <Button sx={{m:1}} variant="outlined" fullWidth onClick={makePublic}>
                    Make public
                </Button><br />
                    <Typography>Make the list public to be able to share your list with anyone who has the link to
                        it.</Typography>


                </>
            )}
            </Box>
        </>
    );
};

export default PublicListSettings;




