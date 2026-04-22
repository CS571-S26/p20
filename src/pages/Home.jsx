import React, { useMemo, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantFilters from '../components/RestaurantFilters'
import RestaurantDetailsModal from '../components/RestaurantDetailsModal'
import RateRestaurantModal from '../components/RateRestaurantModal'
import { useFavorites } from '../context/FavoritesContext'
import { useRatings } from '../context/RatingsContext'

const getUniqueCuisines = () => {
  const cuisines = restaurants.map((restaurant) => restaurant.cuisine)
  const unique = Array.from(new Set(cuisines))
  return unique.sort()
}

function Home() {
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    price: '',
    minRating: '0',
  })
  const [sortBy, setSortBy] = useState('rating-desc')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [rateRestaurant, setRateRestaurant] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getRating, setRating, removeRating } = useRatings()

  const cuisineOptions = useMemo(getUniqueCuisines, [])

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        filters.search.trim() === '' ||
        restaurant.name
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase())

      const matchesCuisine =
        filters.cuisine === '' || restaurant.cuisine === filters.cuisine

      const matchesPrice =
        filters.price === '' || restaurant.price === filters.price

      const matchesRating =
        Number(filters.minRating) === 0 ||
        restaurant.rating >= Number(filters.minRating)

      return (
        matchesSearch && matchesCuisine && matchesPrice && matchesRating
      )
    })
  }, [filters])

  const sortedRestaurants = useMemo(() => {
    const list = [...filteredRestaurants]
    if (sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'rating-asc') {
      list.sort((a, b) => a.rating - b.rating)
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [filteredRestaurants, sortBy])

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant)
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
      <RateRestaurantModal
        show={!!rateRestaurant}
        restaurant={rateRestaurant}
        initialRating={
          rateRestaurant ? getRating(rateRestaurant.id) : undefined
        }
        onHide={() => setRateRestaurant(null)}
        onSave={(r, value) => setRating(r.id, value)}
        onRemove={(r) => removeRating(r.id)}
      />
      <header className="mb-4">
        <h1 className="page-title mb-2">Discover restaurants</h1>
        <p className="page-lead mb-0">
          Search, filter, save favorites, and rate places you&rsquo;ve tried. Your
          scores appear on <strong>My Eats</strong>.
        </p>
      </header>

      <Row>
        <Col lg={3} className="mb-4">
          <RestaurantFilters
            filters={filters}
            cuisineOptions={cuisineOptions}
            onChange={setFilters}
            onClear={() =>
              setFilters({
                search: '',
                cuisine: '',
                price: '',
                minRating: '0',
              })
            }
          />
        </Col>

        <Col lg={9}>
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-3">
            <p className="text-muted small mb-0">
              Showing{' '}
              <strong>{sortedRestaurants.length}</strong>
              {sortedRestaurants.length === 1 ? ' place' : ' places'}
            </p>
            <div className="d-flex align-items-center gap-2">
              <Form.Label htmlFor="sort-by" className="small text-muted mb-0">
                Sort
              </Form.Label>
              <Form.Select
                id="sort-by"
                size="sm"
                style={{ maxWidth: '12rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating-desc">Rating: high to low</option>
                <option value="rating-asc">Rating: low to high</option>
                <option value="name-asc">Name: A–Z</option>
              </Form.Select>
            </div>
          </div>

          {sortedRestaurants.length === 0 ? (
            <div className="empty-state-card text-center py-5 px-3">
              <p className="text-muted mb-2 fw-semibold">No matches</p>
              <p className="text-muted small mb-3">
                Try a different search or clear filters to see all restaurants.
              </p>
              <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={() =>
                  setFilters({
                    search: '',
                    cuisine: '',
                    price: '',
                    minRating: '0',
                  })
                }
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {sortedRestaurants.map((restaurant) => (
                <Col key={restaurant.id}>
                  <RestaurantCard
                    restaurant={restaurant}
                    onViewDetails={handleViewDetails}
                    isFavorite={isFavorite(restaurant.id)}
                    onToggleFavorite={toggleFavorite}
                    showRateButton
                    userRating={getRating(restaurant.id)}
                    onOpenRate={setRateRestaurant}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Home
