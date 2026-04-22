import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetailsModal from '../components/RestaurantDetailsModal'
import RateRestaurantModal from '../components/RateRestaurantModal'
import { useFavorites } from '../context/FavoritesContext'
import { useRatings } from '../context/RatingsContext'

function MyEats() {
  const { getRating, setRating, removeRating, ratedIds } = useRatings()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [rateRestaurant, setRateRestaurant] = useState(null)

  const ratedList = useMemo(() => {
    return restaurants
      .filter((r) => getRating(r.id) !== undefined)
      .map((r) => ({ ...r, userScore: getRating(r.id) }))
      .sort((a, b) => b.userScore - a.userScore)
  }, [getRating, ratedIds])

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
      <RateRestaurantModal
        show={!!rateRestaurant}
        restaurant={rateRestaurant}
        initialRating={rateRestaurant ? getRating(rateRestaurant.id) : undefined}
        onHide={() => setRateRestaurant(null)}
        onSave={(r, value) => setRating(r.id, value)}
        onRemove={(r) => removeRating(r.id)}
      />

      {ratedList.length === 0 ? (
        <div className="empty-state-card text-center py-5 px-3">
          <h1 className="page-title mb-3">My Eats</h1>
          <p className="text-muted mb-2 fw-semibold">No ratings yet</p>
          <p className="text-muted small mb-4">
            On <strong>Home</strong>, tap <strong>Rate</strong> on a card to
            record a score. Your places will show up here.
          </p>
          <Button as={Link} to="/" variant="primary">
            Discover restaurants
          </Button>
        </div>
      ) : (
        <>
          <header className="mb-4">
            <h1 className="page-title mb-2">My Eats</h1>
            <p className="text-muted small mb-0">
              Places you&rsquo;ve scored ({ratedList.length})
            </p>
          </header>
          <Row xs={1} md={2} lg={3} className="g-4">
            {ratedList.map((restaurant) => (
              <Col key={restaurant.id}>
                <RestaurantCard
                  restaurant={restaurant}
                  onViewDetails={(r) => setSelectedRestaurant(r)}
                  isFavorite={isFavorite(restaurant.id)}
                  onToggleFavorite={toggleFavorite}
                  showRateButton
                  userRating={getRating(restaurant.id)}
                  onOpenRate={setRateRestaurant}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default MyEats
