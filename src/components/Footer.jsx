import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ apiHealth }) => {
    return (
        <footer className="bg-dark text-white py-4 mt-4">
            <Container>
                <Row>
                    <Col md={8}>
                        <h5 className="mb-3">
                            <span className="me-2">🛡️</span>
                            Job Analyzer
                        </h5>
                        <p className="mb-0 small">
                            Plateforme d'analyse des risques d'automatisation par l'IA
                            sur les métiers malgaches. Données fournies par Asako.mg en temps réel.
                        </p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <div className="mt-3 mt-md-0">
                            {/* {apiHealth && ( */}
                            <div className="text-info small">
                                {apiHealth?.service || 'Backend FastAPI'}
                            </div>
                            {/* // )} */}
                            {apiHealth && (
                                <div className="small">
                                    {apiHealth.offers_count} offres analysées
                                </div>
                            )}
                            <div className="small mt-2 ">
                                Hackathon Safe AI - 2024
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;