import { useState, useCallback } from 'react'

const STORAGE_KEY = 'madison-eats-favorites'

function getStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const ids = raw ? JSON.parse(raw) : []
    return Array.isArray(ids) ? ids : []
  } catch {
    return []
  }
}

function saveIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch (e) {
    console.warn('Could not save favorites', e)
  }
}

/**
 * Hook for favorites persisted in localStorage.
 * Returns favoriteIds, isFavorite(id), and toggleFavorite(restaurant).
 */
export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(getStoredIds)

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds]
  )

  const toggleFavorite = useCallback((restaurant) => {
    const id = restaurant?.id
    if (!id) return
    setFavoriteIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
      saveIds(next)
      return next
    })
  }, [])

  return { favoriteIds, isFavorite, toggleFavorite }
}
