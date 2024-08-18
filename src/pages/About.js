import React from 'react';
import Box from "@mui/material/Box";
import {Accordion, AccordionDetails, AccordionSummary, ImageList, ImageListItem, Typography} from "@mui/material";
import PageHeader from "../components/PageHeader";


const About = () => {


    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}}>
                <Box sx={{
                    padding: 2, border: '1px solid ',
                    borderColor: 'primary.darker', borderRadius: '5px',
                }}>
                    <PageHeader title={"About"}></PageHeader>
                    <br/>
                    <Typography>
                        Listig is a hobby project by Ellinor Ekmark started Spring 2024. <br/><br/>
                        Users can create different type of lists, and share lists amongst themselves.
                        Add a user to your list to both be able to edit and update it, or add a viewer to just let them
                        see but not touch anything.

                    </Typography>

                    <Accordion>
                        <AccordionSummary>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography fontSize={"large"} sx={{
                                    fontFamily: 'Garamond',
                                    color: 'primary.main'
                                }}><strong>Backend</strong></Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Backend is a <strong>Java Spring Boot</strong> application with
                                a <strong>MySQL</strong> Database, secured with <strong>Spring Security</strong>.
                                I manage the database with <strong>Spring
                                JPA</strong>, <strong>Hibernate</strong> and <strong>Flyway
                                Migrations</strong>.

                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography fontSize={"large"} sx={{
                                    fontFamily: 'Garamond',
                                    color: 'primary.main'
                                }}><strong>Frontend</strong></Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Frontend application is made
                                with <strong>Javascript</strong> with <strong>React</strong> and <strong>Material
                                UI</strong>.
                            </Typography>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography fontSize={"large"}
                                            sx={{fontFamily: 'Garamond', color: 'primary.main'}}><strong>Integration
                                    Layer</strong></Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            This application uses both a <strong>REST API</strong> and <strong>Websockets</strong>. REST
                            API for most data fetching, but websockets are used to view lists to send and receive
                            immediate updates, allowing users to edit lists simultaneously.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography fontSize={"large"} sx={{
                                    fontFamily: 'Garamond',
                                    color: 'primary.main'
                                }}><strong>Screenshots</strong></Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ImageList display={'flex'}>
                                <ImageListItem minWidth={"300px"} maxWidth={"500px"}>
                                    <img src="/screenshot1.jpg" alt="Lists overview page"/>
                                </ImageListItem>
                                <ImageListItem>
                                    <img src="/screenshot2.jpg" alt="New list page"/>
                                </ImageListItem>
                                <ImageListItem>
                                <img src="/screenshot3.jpg" alt="Manage users on list"/>
                            </ImageListItem>
                                <ImageListItem>
                                    <img src="/screenshot4.jpg" alt="Lessons learned"/>
                                </ImageListItem>
                            </ImageList>


                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography fontSize={"large"} sx={{
                                    fontFamily: 'Garamond',
                                    color: 'primary.main'
                                }}><strong>Video Demo</strong></Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <video width="200" controls>
                                    <source src="/demo.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>

        </>
    );
};

export default About;
