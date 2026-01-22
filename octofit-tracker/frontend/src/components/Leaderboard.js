import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner, Alert, Card, Badge } from 'react-bootstrap';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching leaderboard from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Leaderboard data received:', data);

      // Handle both paginated and plain array responses
      const leaderboardList = data.results || data;
      console.log('Processed leaderboard list:', leaderboardList);

      setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { emoji: '🥇', variant: 'warning', text: 'Champion' };
    if (rank === 2) return { emoji: '🥈', variant: 'secondary', text: 'Runner-up' };
    if (rank === 3) return { emoji: '🥉', variant: 'warning', text: 'Third Place' };
    return { emoji: '🏅', variant: 'info', text: 'Competitor' };
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="mb-4">
        <Col>
          <h2>🏆 Leaderboard</h2>
          <p className="text-muted">Top performers across all activities and teams</p>
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
              <span className="visually-hidden">Loading leaderboard...</span>
            </Spinner>
            <p className="mt-3">Loading leaderboard...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {leaderboard.length > 0 && (
            <Col md={4} lg={3} className="mb-4">
              <Card className="text-center shadow-sm h-100 top-player">
                <Card.Body className="pt-4">
                  <div className="mb-3">
                    <span style={{ fontSize: '3rem' }}>🥇</span>
                  </div>
                  <h5 className="card-title">{leaderboard[0]?.username || leaderboard[0]?.user_name}</h5>
                  <Row className="g-2">
                    <Col xs={6}>
                      <div className="p-2 bg-light rounded">
                        <p className="mb-0 fw-bold text-primary">
                          {leaderboard[0]?.score || leaderboard[0]?.total_score || 0}
                        </p>
                        <small className="text-muted">Points</small>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-2 bg-light rounded">
                        <p className="mb-0 fw-bold text-success">
                          {leaderboard[0]?.workouts_completed || leaderboard[0]?.total_workouts || 0}
                        </p>
                        <small className="text-muted">Workouts</small>
                      </div>
                    </Col>
                  </Row>
                  <Badge bg="warning" className="mt-3">
                    1st Place
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          )}

          <Col className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Table striped bordered hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">Rank</th>
                      <th>Username</th>
                      <th className="text-center">Points</th>
                      <th className="text-center">Workouts</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length > 0 ? (
                      leaderboard.map((entry, index) => {
                        const rankBadge = getRankBadge(index + 1);
                        return (
                          <tr key={entry.id || index}>
                            <td className="text-center">
                              <div>
                                <span style={{ fontSize: '1.3rem', marginRight: '0.5rem' }}>
                                  {rankBadge.emoji}
                                </span>
                              </div>
                              <strong>#{index + 1}</strong>
                            </td>
                            <td>
                              <strong>{entry.username || entry.user_name}</strong>
                            </td>
                            <td className="text-center">
                              <Badge bg="primary">{entry.score || entry.total_score || 0}</Badge>
                            </td>
                            <td className="text-center">
                              <Badge bg="success">{entry.workouts_completed || entry.total_workouts || 0}</Badge>
                            </td>
                            <td className="text-center">
                              {index < 3 ? (
                                <Badge bg={rankBadge.variant}>{rankBadge.text}</Badge>
                              ) : (
                                <Badge bg="secondary">Competitor</Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <h5 className="mb-3">No leaderboard data available</h5>
                          <p className="text-muted">Complete some workouts to appear on the leaderboard!</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Leaderboard;
