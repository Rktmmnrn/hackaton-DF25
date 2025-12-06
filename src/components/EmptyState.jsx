import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const EmptyState = ({ setSearchQuery, handleSearch }) => {
  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-5 text-center">
            <div className="display-1 mb-4">🔍</div>
            <h3 className="mb-3">Commencez votre recherche</h3>
            <p className="lead mb-4">
              Recherchez un métier pour voir les offres d'emploi réelles
              et leur niveau de risque face à l'IA.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setSearchQuery('chauffeur');
                handleSearch();
              }}
            >
              🚗 Essayez avec "chauffeur"
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EmptyState;