import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = ({ apiHealth }) => {
  return (
    <header className="bg-primary text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center mb-2">
              <span className="display-4 me-3">🤖</span>
              <div>
                <h1 className="display-5 fw-bold mb-0">Safe AI Job Analyzer</h1>
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
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;