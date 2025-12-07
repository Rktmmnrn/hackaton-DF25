import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ apiHealth }) => {
    return (
        <header className="text-white py-1" style={{
            background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
            <Container>
                <Row className="align-items-center">
                    <Col md={8}>
                        <div className="d-flex align-items-center">
                            <span className="display-4 me-3">Logo</span>
                            <div>
                                <h1 className="display-5 fw-bold mb-1 fs-1">Job Analyzer</h1>
                                <p className="lead mb-0">Analysez les risques IA sur les métiers malgaches</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className="text-md-end">
                        {apiHealth && (
                            <div className="bg-white rounded-3 p-3 d-inline-block">
                                <div className="text-muted small">
                                    ✅ {apiHealth.offers_count} offres analysées
                                </div>
                                <Nav className="mt-2">
                                    <Nav.Link as={Link} to="/" className="text-primary p-0 small">Accueil</Nav.Link>
                                    <span className="mx-2 text-muted">•</span>
                                    <Nav.Link as={Link} to="/dashboard" className="text-primary p-0 small">Dashboard</Nav.Link>
                                </Nav>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;