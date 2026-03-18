import React from 'react'
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function AppShell() {
  const location = useLocation()

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MadisonEats
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/favorites"
                active={location.pathname === '/favorites'}
              >
                Favorites
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}

export default App
