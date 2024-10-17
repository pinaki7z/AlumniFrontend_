import React from 'react';
import { Container, Navbar, Nav, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './landingPage.css';
import bhu from "../../images/bhu.png";

export default function LandingPage(handleLogin) {
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column min-vh-100 container-div-bg" >
            <Navbar expand="lg" className="py-3" style={{ backgroundColor: '#301C58', color: 'white' }}>
                <Container>
                    <Navbar.Brand href="#home" style={{ color: 'white' }}>BHU Alumni Portal</Navbar.Brand>
                    <Nav className="me-auto" style={{ color: 'white' }}>
                        <Nav.Link href="#history" style={{ backgroundColor: '#301C58', color: 'white' }}>History</Nav.Link>
                        <Nav.Link href="#about" style={{ color: 'white' }}>About Us</Nav.Link>
                        <Nav.Link href="#contact" style={{ color: 'white' }}>Contact Us</Nav.Link>
                    </Nav>
                    <div>
                        <Button
                            variant="outline-light"
                            className="me-2"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Container>
            </Navbar>

            <main className="flex-grow-1">
                <Container className="py-5">
                    <section id="hero" className="text-center mb-5">
                        <img src={bhu} alt="" srcset="" width='300px' height='100px' />
                        <h1 className="display-4 fw-bold mb-3">Welcome to BHU Alumni Portal</h1>
                        <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <span className="lead mb-4" style={{background: '#eeeeee', width: '50%', fontWeight: '500'}}>Connect, engage, and stay updated with your alma mater</span>
                        </div>                        
                        <Button size="lg" style={{ backgroundColor: '#301C58', color: 'white' }}>Join Our Community</Button>
                    </section>

                    <section id="history" className="mb-5">
                        <Card>
                            <Card.Header as="h2" style={{ backgroundColor: 'rgb(169, 141, 227)' }}>
                                <i className="bi bi-book me-2"></i>
                                History
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: '#eeeeee' }}>
                                <Card.Text>
                                    Banaras Hindu University (BHU) was founded in 1916 by Pandit Madan Mohan Malaviya. It is one of the largest residential universities in Asia, with over 30,000 students from across India and 50 other countries. The university has played a significant role in the Indian independence movement and has produced many notable alumni who have contributed to various fields globally.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </section>

                    <section id="about" className="mb-5">
                        <Card>
                            <Card.Header as="h2" style={{ backgroundColor: 'rgb(169, 141, 227)' }}>
                                <i className="bi bi-people me-2"></i>
                                About Us
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: '#eeeeee' }}>
                                <Card.Text>
                                    The BHU Alumni Portal is a platform dedicated to connecting and engaging alumni from Banaras Hindu University. Our mission is to foster a strong, global network of BHU graduates, facilitating collaboration, mentorship, and lifelong learning. Through this portal, we aim to keep our alumni informed about university developments, organize events, and provide opportunities for giving back to the institution.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </section>

                    <section id="contact" className="mb-5">
                        <Card>
                            <Card.Header as="h2" style={{ backgroundColor: 'rgb(169, 141, 227)' }}>
                                <i className="bi bi-telephone me-2"></i>
                                Contact Us
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: '#eeeeee' }}>
                                <p>We'd love to hear from you! Get in touch with us using the following contact information:</p>
                                <address>
                                    <p>Email: alumni@bhu.ac.in</p>
                                    <p>Phone: +91 542 2368888</p>
                                    <p>Address: Banaras Hindu University, Varanasi, Uttar Pradesh 221005, India</p>
                                </address>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formSubject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control type="text" placeholder="Enter subject" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Your message" />
                                    </Form.Group>
                                    <Button type="submit" style={{ backgroundColor: '#301C58', color: 'white' }}>
                                        Send Message
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </section>
                </Container>
            </main>

            <footer className="bg-light py-4 mt-auto">
                <Container className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} BHU Alumni Portal. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}