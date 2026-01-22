import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner, Alert, Button, Card } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Fetching users from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Users data received:', data);

      // Handle both paginated and plain array responses
      const usersList = data.results || data;
      console.log('Processed users list:', usersList);

      setUsers(Array.isArray(usersList) ? usersList : []);
    } catch (error) {
      console.error('Error fetching users:', error);
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
            <h2>👥 Users</h2>
            <Button variant="primary" className="btn-primary">
              + Add User
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
              <span className="visually-hidden">Loading users...</span>
            </Spinner>
            <p className="mt-3">Loading users...</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                {users.length > 0 ? (
                  <Table striped bordered hover responsive className="mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <strong>{user.username}</strong>
                          </td>
                          <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </td>
                          <td>{user.first_name || '-'}</td>
                          <td>{user.last_name || '-'}</td>
                          <td className="text-center">
                            <Button variant="sm" size="sm" className="btn-primary me-2">
                              View Profile
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
                    <h5>No users found</h5>
                    <p className="text-muted">No user data available at this time.</p>
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

export default Users;
