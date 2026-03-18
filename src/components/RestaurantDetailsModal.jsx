import React from 'react'
import { Modal, Badge } from 'react-bootstrap'

function RestaurantDetailsModal({ show, restaurant, onHide }) {
  if (!restaurant) return null

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      scrollable
      aria-labelledby="restaurant-details-title"
      aria-describedby="restaurant-details-description"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title id="restaurant-details-title" className="h4">
          {restaurant.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="restaurant-details-description" className="pt-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="img-fluid rounded w-100 mb-3"
          style={{ maxHeight: '280px', objectFit: 'cover' }}
        />
        <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
          <Badge bg="secondary">{restaurant.cuisine}</Badge>
          <Badge bg="success">{restaurant.rating.toFixed(1)} ★</Badge>
          <span className="text-muted">{restaurant.price}</span>
        </div>
        {restaurant.address && (
          <p className="mb-1">
            <strong>Address:</strong>{' '}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.address}
            </a>
          </p>
        )}
        {restaurant.hours && (
          <p className="mb-2">
            <strong>Hours:</strong> {restaurant.hours}
          </p>
        )}
        <p className="mb-0">{restaurant.description}</p>
      </Modal.Body>
    </Modal>
  )
}

export default RestaurantDetailsModal
