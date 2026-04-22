import React from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'

function RestaurantFilters({
  filters,
  cuisineOptions,
  onChange,
  onClear,
}) {
  const handleInputChange = (event) => {
    const { name, value } = event.target
    onChange({
      ...filters,
      [name]: value,
    })
  }

  return (
    <Card className="filter-panel p-3 mb-4 border-0 shadow-sm">
      <Card.Title as="h5" className="mb-3 page-title h6">
        Search &amp; filters
      </Card.Title>

      <Form>
        <Form.Group className="mb-3" controlId="search">
          <Form.Label className="small mb-1">Search by name</Form.Label>
          <Form.Control
            type="text"
            name="search"
            placeholder="Try “Banzo” or “Graze”"
            value={filters.search}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="g-2">
          <Col xs={12} md={6}>
            <Form.Group controlId="cuisine" className="mb-3 mb-md-0">
              <Form.Label className="small mb-1">Cuisine</Form.Label>
              <Form.Select
                name="cuisine"
                value={filters.cuisine}
                onChange={handleInputChange}
              >
                <option value="">Any cuisine</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="price">
              <Form.Label className="small mb-1">Price</Form.Label>
              <Form.Select
                name="price"
                value={filters.price}
                onChange={handleInputChange}
              >
                <option value="">Any price</option>
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mt-3 mb-3" controlId="minRating">
          <Form.Label className="small mb-1">Minimum rating</Form.Label>
          <Form.Select
            name="minRating"
            value={filters.minRating}
            onChange={handleInputChange}
          >
            <option value="0">Any rating</option>
            <option value="3">3.0+</option>
            <option value="3.5">3.5+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={onClear}
          >
            Clear filters
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default RestaurantFilters

