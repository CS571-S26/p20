import React from 'react'
import { Card, Button } from 'react-bootstrap'

function RestaurantCard({
  restaurant,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
  showRateButton = false,
  userRating,
  onOpenRate,
}) {
  const handleFavoriteClick = () => {
    onToggleFavorite?.(restaurant)
  }

  return (
    <Card className="restaurant-card h-100 border-0 shadow-sm">
      <Card.Img
        variant="top"
        src={restaurant.image}
        alt={restaurant.name}
        height="180"
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="restaurant-card__body">
        <Card.Title className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span className="restaurant-card__name">{restaurant.name}</span>
          <span className="restaurant-card__rating" aria-label={`Community rating ${restaurant.rating} out of 5`}>
            {restaurant.rating.toFixed(1)}
          </span>
        </Card.Title>
        <Card.Text className="restaurant-card__meta mb-1">
          {restaurant.cuisine}
        </Card.Text>
        <Card.Text className="restaurant-card__meta mb-2">
          {restaurant.price}
        </Card.Text>
        {userRating != null && (
          <Card.Text className="restaurant-card__your-rating small mb-2">
            Your rating: <strong>{userRating.toFixed(1)}</strong>/10
          </Card.Text>
        )}
        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            className="restaurant-card__btn"
            onClick={() => onViewDetails?.(restaurant)}
          >
            View details
          </Button>
          <Button
            variant={isFavorite ? 'primary' : 'outline-secondary'}
            size="sm"
            className="restaurant-card__btn"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
          {showRateButton && onOpenRate && (
            <Button
              variant="outline-info"
              size="sm"
              className="restaurant-card__btn"
              onClick={() => onOpenRate(restaurant)}
            >
              {userRating != null ? 'Update' : 'Rate'}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default RestaurantCard

