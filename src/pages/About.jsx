import React from 'react'
import { Card } from 'react-bootstrap'

function About() {
  return (
    <div className="about-page">
      <header className="mb-4">
        <h1 className="page-title mb-3">About MadisonEats</h1>
      </header>

      <Card className="filter-panel border-0 shadow-sm">
        <Card.Body className="p-4 about-body">
          <p className="mb-3">
            MadisonEats helps you discover restaurants across Madison, Wisconsin
            with a simple and convenient browsing experience. Explore local
            spots, filter and sort listings to match what you are craving, view
            restaurant details, and save your favorites for later.
          </p>
          <p className="mb-0">
            Whether you are looking for a casual bite, a coffee stop, or a
            place for dinner, MadisonEats makes it easy to find places worth
            trying around the city.
          </p>
          <p className="text-muted small mt-4 mb-0 border-top pt-3">
            This site uses sample data for demonstration. Menus, hours, and
            details are not kept up to date.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default About
