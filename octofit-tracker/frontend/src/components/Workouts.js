import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner, Alert, Button, Card } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching workouts from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Workouts data received:', data);

      // Handle both paginated and plain array responses
      const workoutsList = data.results || data;
      console.log('Processed workouts list:', workoutsList);

      setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      Easy: 'success',
      Medium: 'warning',
      Hard: 'danger',
      'easy': 'success',
      'medium': 'warning',
      'hard': 'danger',
    };
    return variants[difficulty] || 'secondary';
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>💪 Workouts</h2>
            <Button variant="primary" className="btn-primary">
              + Create Workout
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
              <span className="visually-hidden">Loading workouts...</span>
            </Spinner>
            <p className="mt-3">Loading workouts...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                {workouts.length > 0 ? (
                  <Table striped bordered hover responsive className="mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Workout Title</th>
                        <th>Description</th>
                        <th className="text-center">Difficulty</th>
                        <th className="text-center">Duration (min)</th>
                        <th className="text-center">Calories</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workouts.map((workout, index) => (
                        <tr key={workout.id}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <strong>{workout.title}</strong>
                          </td>
                          <td>
                            <span className="text-muted">{workout.description || '-'}</span>
                          </td>
                          <td className="text-center">
                            <span className={`badge bg-${getDifficultyBadge(workout.difficulty)}`}>
                              {workout.difficulty ? workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1) : 'N/A'}
                            </span>
                          </td>
                          <td className="text-center">{workout.duration || '-'}</td>
                          <td className="text-center">
                            <span className="badge bg-warning text-dark">{workout.calories_burned || 0}</span>
                          </td>
                          <td className="text-center">
                            <Button variant="sm" size="sm" className="btn-primary me-2">
                              Start
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
                    <h5>No workouts found</h5>
                    <p className="text-muted">Create a new workout to get started!</p>
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

export default Workouts;
