import React from 'react'
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { FavoritesProvider, useFavorites } from './context/FavoritesContext'
import { RatingsProvider, useRatings } from './context/RatingsContext'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import About from './pages/About'
import MyEats from './pages/MyEats'
import AppFooter from './components/AppFooter'

function AppShell() {
  const location = useLocation()
  const { favoriteIds } = useFavorites()
  const { ratedIds } = useRatings()
  const favoriteCount = favoriteIds.length
  const ratedCount = ratedIds.length

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <Navbar expand="md" className="navbar-me shadow-sm mb-0">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-semibold">
            MadisonEats
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-md-center gap-md-1">
              <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/favorites"
                active={location.pathname === '/favorites'}
                className="d-inline-flex align-items-center gap-2"
              >
                Favorites
                {favoriteCount > 0 && (
                  <Badge pill bg="light" text="dark" className="me-nav-badge">
                    {favoriteCount}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/my-eats"
                active={location.pathname === '/my-eats' || location.pathname === '/my-ratings'}
                className="d-inline-flex align-items-center gap-2"
              >
                My Eats
                {ratedCount > 0 && (
                  <Badge pill bg="light" text="dark" className="me-nav-badge">
                    {ratedCount}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                active={location.pathname === '/about'}
              >
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="flex-grow-1 app-main">
        <Container className="py-4 pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/my-eats" element={<MyEats />} />
            <Route
              path="/my-ratings"
              element={<Navigate to="/my-eats" replace />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <FavoritesProvider>
        <RatingsProvider>
          <AppShell />
        </RatingsProvider>
      </FavoritesProvider>
    </HashRouter>
  )
}

export default App
