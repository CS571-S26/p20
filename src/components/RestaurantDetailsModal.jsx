import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function RestaurantDetailsModal({
  show,
  restaurant,
  onHide,
  isFavorite,
  onToggleFavorite,
}) {
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
      <Modal.Header closeButton className="pb-2">
        <Modal.Title id="restaurant-details-title" className="h4">
          {restaurant.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="restaurant-details-description" className="pt-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="img-fluid rounded w-100 mb-3"
          loading="lazy"
          style={{ maxHeight: '280px', objectFit: 'cover' }}
        />
        <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
          <span className="detail-pill detail-pill--muted">{restaurant.cuisine}</span>
          <span className="restaurant-card__rating">
            {restaurant.rating.toFixed(1)} ★
          </span>
          <span className="text-muted small">{restaurant.price}</span>
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
      {onToggleFavorite && (
        <Modal.Footer className="border-top pt-3">
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant={isFavorite ? 'primary' : 'outline-secondary'}
            onClick={() => onToggleFavorite(restaurant)}
          >
            {isFavorite ? 'Remove from saved' : 'Save to list'}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default RestaurantDetailsModal
