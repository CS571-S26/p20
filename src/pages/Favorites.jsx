import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetailsModal from '../components/RestaurantDetailsModal'
import { useFavorites } from '../context/FavoritesContext'

function Favorites() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const favoriteRestaurants = useMemo(
    () => restaurants.filter((r) => favoriteIds.includes(r.id)),
    [favoriteIds]
  )

  if (favoriteRestaurants.length === 0) {
    return (
      <div className="empty-state-card text-center py-5 px-3">
        <h1 className="page-title mb-3">Favorites</h1>
        <p className="text-muted mb-2 fw-semibold">No favorites yet</p>
        <p className="text-muted small mb-4">
          On Home, tap <strong>Save</strong> on any card to add it here.
        </p>
        <Button as={Link} to="/" variant="primary">
          Discover restaurants
        </Button>
      </div>
    )
  }

  return (
    <>
      <RestaurantDetailsModal
        show={!!selectedRestaurant}
        restaurant={selectedRestaurant}
        onHide={() => setSelectedRestaurant(null)}
        isFavorite={
          selectedRestaurant ? isFavorite(selectedRestaurant.id) : false
        }
        onToggleFavorite={toggleFavorite}
      />
      <header className="mb-4">
        <h1 className="page-title mb-2">Favorites</h1>
        <p className="text-muted small mb-0">
          {favoriteRestaurants.length}{' '}
          {favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'} saved
        </p>
      </header>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favoriteRestaurants.map((restaurant) => (
          <Col key={restaurant.id}>
            <RestaurantCard
              restaurant={restaurant}
              onViewDetails={(r) => setSelectedRestaurant(r)}
              isFavorite={isFavorite(restaurant.id)}
              onToggleFavorite={toggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Favorites
