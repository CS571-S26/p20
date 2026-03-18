import React, { useMemo, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { restaurants } from '../data/restaurants'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantFilters from '../components/RestaurantFilters'
import RestaurantDetailsModal from '../components/RestaurantDetailsModal'
import { useFavorites } from '../utils/useFavorites'

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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

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

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant)
  }

  return (
    <>
      <RestaurantDetailsModal
        show={!!selectedRestaurant}
        restaurant={selectedRestaurant}
        onHide={() => setSelectedRestaurant(null)}
      />
      <h1 className="mb-4">Discover restaurants</h1>

      <Row>
        {/* Filters sidebar (stacks on top on mobile) */}
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

        {/* Restaurant cards grid */}
        <Col lg={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredRestaurants.map((restaurant) => (
              <Col key={restaurant.id}>
                <RestaurantCard
                  restaurant={restaurant}
                  onViewDetails={handleViewDetails}
                  isFavorite={isFavorite(restaurant.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Home

