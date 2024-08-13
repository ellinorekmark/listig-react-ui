import React from 'react';
import Box from "@mui/material/Box";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";

const About = () => {


    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}}>
                <Box sx={{
                    padding: 2, border: '1px solid #ccc', borderRadius: '5px',
                }}>
                    <Typography fontSize={"xx-large"} sx={{fontFamily: 'Garamond'}}>
                        About Listig
                    </Typography>
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
                </Box>
            </Box>

        </>
    );
};

export default About;
