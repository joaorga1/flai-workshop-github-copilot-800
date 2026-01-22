import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching teams from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Teams data received:', data);

      // Handle both paginated and plain array responses
      const teamsList = data.results || data;
      console.log('Processed teams list:', teamsList);

      setTeams(Array.isArray(teamsList) ? teamsList : []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>🤝 Teams</h2>
            <Button variant="primary" className="btn-primary">
              + Create Team
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="mt-5">
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading teams...</span>
            </Spinner>
            <p className="mt-3">Loading teams...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {teams.length > 0 ? (
            teams.map((team) => (
              <Col md={6} lg={4} key={team.id} className="mb-4">
                <Card className="h-100 shadow-sm hover-card">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">{team.name}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p className="text-muted">{team.description || 'No description provided'}</p>
                      <Row className="my-3">
                        <Col xs={6}>
                          <div className="text-center">
                            <h5 className="mb-1">
                              <span className="badge bg-primary">{team.member_count || 0}</span>
                            </h5>
                            <small className="text-muted">Members</small>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="text-center">
                            <h5 className="mb-1">
                              <span className="badge bg-success">Active</span>
                            </h5>
                            <small className="text-muted">Status</small>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent d-flex gap-2">
                    <Button variant="primary" size="sm" className="flex-grow-1">
                      View Team
                    </Button>
                    <Button variant="warning" size="sm" className="flex-grow-1">
                      Settings
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5>No teams found</h5>
                  <p className="text-muted mb-3">Create a new team to start collaborating with others!</p>
                  <Button variant="primary" className="btn-primary">
                    Create Your First Team
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}

export default Teams;
