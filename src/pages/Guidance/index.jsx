// src/GuidancePage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Guidance.css'; // Import the CSS file for custom styles

const alumniData = [
    {
        name: "Arjun Kumar Sharma",
        title: "Software Engineer",
        description: "Arjun graduated in 2015 and has been working in the tech industry for over 6 years. He specializes in web development and is passionate about mentoring students.",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Rohan Rajesh Reddy",
        title: "Data Scientist",
        description: "Rohan graduated in 2018 and has experience in data analysis and machine learning. He loves helping students navigate their career paths.",
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Vikram Anand Joshi",
        title: "Product Manager",
        description: "Vikram graduated in 2016 and has worked in various startups. He is eager to share his insights on product development and management.",
        image: "https://via.placeholder.com/150",
    },
];

const GuidancePage = () => {
    return (
        <Container fluid className="p-4 bg-light">
            <h1 className="guidance-h text-center mb-4">Guidance from Alumni</h1>
            <p className="guidance-p text-center mb-5">
                Welcome to the Guidance Page! Here, current students can connect with alumni for advice and mentorship.
            </p>
            <Row>
                {alumniData.map((alumni, index) => (
                    <Col md={4} className="mb-4" key={index}>
                        <Card className="alumni-card">
                            <Card.Img variant="top" src={alumni.image} />
                            <Card.Body>
                                <Card.Title>{alumni.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{alumni.title}</Card.Subtitle>
                                <Card.Text>{alumni.description}</Card.Text>
                                <Button variant="primary">Get Guidance</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default GuidancePage;