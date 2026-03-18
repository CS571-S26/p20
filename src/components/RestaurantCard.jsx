import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'

function RestaurantCard({ restaurant, onViewDetails, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = () => {
    onToggleFavorite?.(restaurant)
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={restaurant.image}
        alt={restaurant.name}
        height="180"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{restaurant.name}</span>
          <Badge bg="success">{restaurant.rating.toFixed(1)}</Badge>
        </Card.Title>
        <Card.Text className="mb-1">
          <span className="text-muted">{restaurant.cuisine}</span>
        </Card.Text>
        <Card.Text className="mb-3">
          <span className="text-muted">Price: {restaurant.price}</span>
        </Card.Text>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails?.(restaurant)}
          >
            View Details
          </Button>
          <Button
            variant={isFavorite ? 'danger' : 'outline-danger'}
            size="sm"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default RestaurantCard

