import { useEffect, useState } from 'react'
import { getRentalDetailsById } from '../../api/rentals'

interface Film {
  film_id: number
  title: string
  description: string
  release_year: number
  rental_duration: number
  rental_rate: string
  length: number
  rating: string
  special_features: string
}

interface MovieDetailsByRentalIdProps {
  rentalId: number
  isOpen: boolean
}

const MovieDetailsByRentalId = ({ rentalId, isOpen }: MovieDetailsByRentalIdProps) => {
  const [movieDetails, setMovieDetails] = useState<Film | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getRentalDetailsById(rentalId)
        setMovieDetails(data.inventory.film)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchMovieDetails()
    }
  }, [rentalId, isOpen])

  if (!isOpen) return null
  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!movieDetails) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Movie Details</h2>
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-semibold w-32">Title:</span>
            <span>{movieDetails.title}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Description:</span>
            <span>{movieDetails.description}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Release Year:</span>
            <span>{movieDetails.release_year}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Rental Duration:</span>
            <span>{movieDetails.rental_duration} days</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Rental Rate:</span>
            <span>${movieDetails.rental_rate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Length:</span>
            <span>{movieDetails.length} minutes</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Rating:</span>
            <span>{movieDetails.rating}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Special Features:</span>
            <span>{movieDetails.special_features}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MovieDetailsByRentalId