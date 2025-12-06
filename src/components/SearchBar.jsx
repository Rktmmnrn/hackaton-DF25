import React from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  loading,
  setShowDemo,
  reloadPage 
}) => {
  return (
    <div className="bg-light py-4 border-bottom">
      <Container>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-end-0">
                🔍
              </span>
              <Form.Control
                type="text"
                placeholder="Recherchez un métier (ex: chauffeur, mécanicien, coordinateur...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="border-start-0"
              />
              <Button
                variant="primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : 'Rechercher'}
              </Button>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <Button
              variant="warning"
              className="me-2"
              onClick={() => setShowDemo(true)}
            >
              🎬 Voir la démo
            </Button>
            <Button
              variant="outline-primary"
              onClick={reloadPage}
            >
              🔄 Recharger
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;