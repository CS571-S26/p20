import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetailsModal from '../components/RestaurantDetailsModal'
import { useFavorites } from '../utils/useFavorites'

function Favorites() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const favoriteRestaurants = useMemo(
    () => restaurants.filter((r) => favoriteIds.includes(r.id)),
    [favoriteIds]
  )

  if (favoriteRestaurants.length === 0) {
    return (
      <div className="text-center py-5">
        <h1 className="mb-4">Favorites</h1>
        <p className="text-muted lead mb-2">No favorites yet</p>
        <p className="text-muted mb-4">
          Browse restaurants on the Home page and click the heart to save your favorites here.
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
      />
      <h1 className="mb-4">Favorites</h1>
      <p className="text-muted mb-4">
        {favoriteRestaurants.length} {favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'} saved
      </p>
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
