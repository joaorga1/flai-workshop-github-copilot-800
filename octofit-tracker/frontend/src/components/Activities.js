import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner, Alert, Button, Card } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
      console.log('Fetching activities from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Activities data received:', data);

      // Handle both paginated and plain array responses
      const activitiesList = data.results || data;
      console.log('Processed activities list:', activitiesList);

      setActivities(Array.isArray(activitiesList) ? activitiesList : []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '-';
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>🏃 Activities</h2>
            <Button variant="primary" className="btn-primary">
              + Add Activity
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
              <span className="visually-hidden">Loading activities...</span>
            </Spinner>
            <p className="mt-3">Loading activities...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                {activities.length > 0 ? (
                  <Table striped bordered hover responsive className="mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Activity Name</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Calories Burned</th>
                        <th className="text-center">Duration (min)</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity, index) => (
                        <tr key={activity.id}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <strong>{activity.user_name}</strong>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-info text-dark">{activity.activity_type}</span>
                          </td>
                          <td className="text-center">{formatDate(activity.timestamp)}</td>
                          <td className="text-center">
                            <span className="badge bg-warning text-dark">{activity.calories_burned}</span>
                          </td>
                          <td className="text-center">{activity.duration}</td>
                          <td className="text-center">
                            <Button variant="sm" size="sm" className="btn-primary me-2">
                              View
                            </Button>
                            <Button variant="sm" size="sm" className="btn-warning">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-center py-5">
                    <h5>No activities found</h5>
                    <p className="text-muted">Start by creating a new activity or checking back later.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Activities;
