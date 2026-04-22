import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function RateRestaurantModal({ show, restaurant, initialRating, onHide, onSave, onRemove }) {
  const [value, setValue] = useState(5)

  useEffect(() => {
    if (show && restaurant) {
      setValue(
        initialRating != null && initialRating !== undefined
          ? initialRating
          : 5
      )
    }
  }, [show, restaurant, initialRating])

  if (!restaurant) return null

  const setFromInput = (raw) => {
    const n = parseFloat(raw)
    if (!Number.isNaN(n)) {
      setValue(Math.min(10, Math.max(0, n)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const n = Math.round(parseFloat(value) * 10) / 10
    if (Number.isNaN(n)) return
    onSave?.(restaurant, n)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered aria-labelledby="rate-title">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="rate-title" className="h5">
            Rate {restaurant.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted small mb-3">
            Give this place a score from <strong>0.0</strong> to{' '}
            <strong>10.0</strong> (increments of 0.1).
          </p>
          <Form.Group controlId="user-rating" className="mb-2">
            <Form.Label>Your rating</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={10}
              step={0.1}
              value={value}
              onChange={(e) => setFromInput(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Range
            min={0}
            max={10}
            step={0.1}
            value={value}
            onChange={(e) => setFromInput(e.target.value)}
            className="mb-1"
            aria-label="Adjust rating 0 to 10"
          />
        </Modal.Body>
        <Modal.Footer className="flex-wrap gap-2">
          {onRemove && initialRating != null && initialRating !== undefined && (
            <Button
              variant="outline-danger"
              type="button"
              onClick={() => {
                onRemove(restaurant)
                onHide()
              }}
            >
              Remove rating
            </Button>
          )}
          <div className="ms-auto d-flex flex-wrap gap-2">
            <Button variant="outline-secondary" type="button" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RateRestaurantModal
