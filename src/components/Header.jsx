import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ apiHealth }) => {
    // Pour suivre si le scroll est activé
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        // Fonction qui met à jour l'état basé sur la position de défilement
        const handleScroll = () => {
            // Mettre à jour isShrunk si le défilement vertical dépasse 80px (ou une autre valeur)
            if (window.scrollY > 80) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };

        // Ajouter l'écouteur d'événement au montage
        window.addEventListener('scroll', handleScroll);

        // Retirer l'écouteur au démontage pour éviter les fuites de mémoire
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois au montage

    // 3. Définir les classes dynamiques pour la transition
    const headerClass = `text-white py-1 transition-smooth ${isShrunk ? 'header-shrunk' : 'header-expanded'}`;
    const logoTextClass = `me-3 transition-smooth ${isShrunk ? 'fs-5' : 'display-4'}`;
    const titleClass = `fw-bold mb-1 transition-smooth ${isShrunk ? 'fs-3' : 'display-5 fs-1'}`;
    const taglineClass = `lead mb-0 transition-smooth ${isShrunk ? 'd-none' : 'd-block'}`; // Masquer la tagline
    const navLinkClass = `bg-white rounded-3 d-inline-block ${isShrunk ? 'p-1' : 'p-3'}`;

    return (
        <header className={headerClass} style={{
            background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Container>
                <Row className="align-items-center">
                    <Col md={8}>
                        <div className="d-flex align-items-center">
                            <span className={logoTextClass}>Logo</span>
                            <div>
                                <h1 className={titleClass}>Job Analyzer</h1>
                                <p className={taglineClass}>Analysez les risques IA sur les métiers malgaches</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className="text-md-end">
                        {apiHealth && (
                            <div className={navLinkClass}>
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