import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'madison-eats-user-ratings'

function getStoredRatings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {}
  } catch {
    return {}
  }
}

function saveRatings(ratings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
  } catch (e) {
    console.warn('Could not save ratings', e)
  }
}

function clampRating(value) {
  const n = Math.round(parseFloat(value) * 10) / 10
  if (Number.isNaN(n)) return 0
  return Math.min(10, Math.max(0, n))
}

const RatingsContext = createContext(null)

export function RatingsProvider({ children }) {
  const [ratings, setRatings] = useState(getStoredRatings)

  const getRating = useCallback(
    (id) => {
      if (id == null) return undefined
      const v = ratings[id]
      return v !== undefined && v !== null ? Number(v) : undefined
    },
    [ratings]
  )

  const setRating = useCallback((id, value) => {
    if (id == null) return
    const nextVal = clampRating(value)
    setRatings((prev) => {
      const next = { ...prev, [id]: nextVal }
      saveRatings(next)
      return next
    })
  }, [])

  const removeRating = useCallback((id) => {
    if (id == null) return
    setRatings((prev) => {
      const next = { ...prev }
      delete next[id]
      saveRatings(next)
      return next
    })
  }, [])

  const ratedIds = useMemo(
    () => Object.keys(ratings).filter((k) => ratings[k] != null),
    [ratings]
  )

  const value = useMemo(
    () => ({ ratings, getRating, setRating, removeRating, ratedIds }),
    [ratings, getRating, setRating, removeRating, ratedIds]
  )

  return (
    <RatingsContext.Provider value={value}>
      {children}
    </RatingsContext.Provider>
  )
}

export function useRatings() {
  const ctx = useContext(RatingsContext)
  if (!ctx) {
    throw new Error('useRatings must be used inside RatingsProvider')
  }
  return ctx
}
