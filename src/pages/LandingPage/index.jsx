import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './landingPage.css';
import bhu from "../../images/bhu.png";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage(handleLogin) {
    const [activeTab, setActiveTab] = useState("hero");
    const navigate = useNavigate();

    const renderTabContent = () => {
        switch (activeTab) {
            case "history":
                return (
                    <section id="history" className="py-5 content-overlay">
                        <h2>History</h2>
                        <p>
                            Mahamana Malaviya Mission ( 1978–2014)

                            Mahamana Malviya Mission was born in the National Conference of Alumni of Banaras Hindu University on the 9th of April 1978, the first day of the year , in New Delhi, to re-establish the fading ideals and life values ​​of the great man and pioneer of the era, Pandit Madan Mohan Malviya .




                            The following resolutions were passed in this conference-




                            " Inspired by the sacred memory of Mahamana Pandit Madan Mohan Malaviya , the National Conference of the Alumni of Banaras Hindu University held on 9th April 1978 at Dharma Bhavan , New Delhi, decides that Mahamana Malaviya Mission should be established to keep the inspiring memory of Mahamana alive , to propagate and spread his ideas and to carry forward the educational and cultural campaign started by him in the national life .




                            " The conference resolves that this mission will be developed at the national level as a powerful medium to realize the life ideals and goals of Mahamana Malaviya and its units will be opened in all the states and major places. "




                            The conference gave its approval to the proposed constitution, objectives and programme, and rules and provisions of the Mission .




                            To take the work of the Mission forward, the conference unanimously elected Shri Baleshwar Agarwal as President and Shri Shanti Swaroop Chaddha as General Secretary . The President was given the authority to form the working committee of the Mission which would be universal in nature .
                        </p>
                    </section>
                );
            case "about":
                return (
                    <section id="about" className="py-5 content-overlay">
                        <h2>About Us</h2>
                        <p>
                            The BHU Alumni Portal is a platform dedicated to connecting and engaging alumni from Banaras Hindu University. Our mission is to foster a strong, global network of BHU graduates, facilitating collaboration, mentorship, and lifelong learning. Through this portal, we aim to keep our alumni informed about university developments, organize events, and provide opportunities for giving back to the institution.
                        </p>
                    </section>
                );
            case "contact":
                return (
                    <section id="contact" className="py-5 content-overlay">
                        <h2>Contact Us</h2>
                        <address>
                            <p>Email: alumni@bhu.ac.in</p>
                            <p>Phone: +91 542 2368888</p>
                            <p>Address: Banaras Hindu University, Varanasi, Uttar Pradesh 221005, India</p>
                        </address>
                    </section>
                );
            default:
                return (
                    <section id="hero" className="text-center py-5 content-overlay">
                        <img src={bhu} alt="" width="300px" height="100px" />
                        <h1 className="display-4 fw-bold mb-3">Welcome to BHU Alumni Portal</h1>
                        <p className="lead mb-4" style={{ fontWeight: '500' }}>
                            Connect, engage, and stay updated with your alma mater.
                        </p>
                        <Button size="lg" style={{ backgroundColor: '#301C58', color: 'white' }}>
                            Join Our Community
                        </Button>
                    </section>
                );
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 container-div-bg">
            {/* Navbar */}
            <Navbar expand="lg" className="py-3" style={{ backgroundColor: '#301C58', color: 'white' }}>
                <Container style={{paddingTop: '30px'}}>
                    <Navbar.Brand href="#" style={{ color: 'white' }}>
                        BHU Alumni Portal
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            className={`nav-tab ${activeTab === "hero" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("hero")}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "history" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("history")}
                        >
                            History
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "about" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("about")}
                        >
                            About Us
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-tab ${activeTab === "contact" ? "active-tab" : ""}`}
                            onClick={() => setActiveTab("contact")}
                        >
                            Contact Us
                        </Nav.Link>
                    </Nav>
                    <div>
                        <Button variant="outline-light" className="me-2" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button variant="light" onClick={() => navigate('/register')}>Sign Up</Button>
                    </div>
                </Container>
            </Navbar>

            {/* Main Content */}
            <main className="flex-grow-1">
                <Container>{renderTabContent()}</Container>
            </main>

            {/* Footer */}
            <footer className="bg-light py-4 mt-auto">
                <Container className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} BHU Alumni Portal. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
