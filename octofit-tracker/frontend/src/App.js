import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';
import Activities from './components/Activities';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('OctoFit Tracker App initialized');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);
  console.log('Backend API URL: https://' + (process.env.REACT_APP_CODESPACE_NAME || 'codespace') + '-8000.app.github.dev/api/');

  const features = [
    {
      icon: '🏃',
      title: 'Track Activities',
      description: 'Log your daily activities and monitor your progress over time.',
      path: '/activities',
    },
    {
      icon: '💪',
      title: 'Workouts',
      description: 'Discover and complete personalized workout routines for your fitness goals.',
      path: '/workouts',
    },
    {
      icon: '👥',
      title: 'Manage Teams',
      description: 'Create teams, invite friends, and work together toward shared fitness goals.',
      path: '/teams',
    },
    {
      icon: '🏆',
      title: 'Leaderboards',
      description: 'Compete with your teammates and climb the rankings to become a champion.',
      path: '/leaderboard',
    },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" expand="lg" sticky="top" className="navbar-dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src="/octofitapp-logo.png" alt="OctoFit Tracker Logo" className="navbar-logo" />
              OctoFit Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/activities" className="nav-link">
                  Activities
                </Nav.Link>
                <Nav.Link as={Link} to="/users" className="nav-link">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/workouts" className="nav-link">
                  Workouts
                </Nav.Link>
                <Nav.Link as={Link} to="/teams" className="nav-link">
                  Teams
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboard" className="nav-link">
                  Leaderboard
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {/* Hero Section */}
                  <Row className="mb-5">
                    <Col lg={8} className="mx-auto text-center">
                      <h1 className="display-4 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
                      <p className="lead mb-4">
                        Track your fitness activities, compete with your team, and achieve your goals all in one place!
                      </p>
                      <p className="text-muted mb-4">
                        Explore the navigation menu above to manage your fitness journey with advanced tracking and team collaboration features.
                      </p>
                      <div>
                        <Link to="/activities">
                          <Button variant="primary" size="lg" className="me-3">
                            Get Started
                          </Button>
                        </Link>
                        <Link to="/leaderboard">
                          <Button variant="secondary" size="lg">
                            View Leaderboard
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  {/* Features Section */}
                  <Row className="mb-5">
                    <Col lg={10} className="mx-auto">
                      <h2 className="text-center mb-5">Features</h2>
                      <Row>
                        {features.map((feature, index) => (
                          <Col md={6} lg={3} key={index} className="mb-4">
                            <Link to={feature.path} style={{ textDecoration: 'none' }}>
                              <Card className="h-100 text-center shadow-sm hover-card" style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}>
                                <Card.Body>
                                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    {feature.icon}
                                  </div>
                                  <Card.Title>{feature.title}</Card.Title>
                                  <Card.Text>{feature.description}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  {/* Quick Links Section */}
                  <Row className="mb-5">
                    <Col lg={10} className="mx-auto">
                      <Card className="bg-light border-0">
                        <Card.Body>
                          <h3 className="mb-4">Quick Navigation</h3>
                          <Row>
                            <Col md={6} className="mb-3">
                              <Link to="/users">
                                <Button variant="outline-primary" className="w-100">
                                  👥 View All Users
                                </Button>
                              </Link>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Link to="/teams">
                                <Button variant="outline-primary" className="w-100">
                                  🤝 Browse Teams
                                </Button>
                              </Link>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Link to="/workouts">
                                <Button variant="outline-primary" className="w-100">
                                  💪 Explore Workouts
                                </Button>
                              </Link>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Link to="/leaderboard">
                                <Button variant="outline-primary" className="w-100">
                                  🏆 Top Performers
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Container>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <Container>
            <p className="mb-2">© 2024 OctoFit Tracker. All rights reserved.</p>
            <p className="text-muted">Built with React and Bootstrap for optimal fitness tracking.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
