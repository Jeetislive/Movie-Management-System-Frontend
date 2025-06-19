import { useEffect, useState } from 'react'
import { getRentalDetailsById } from '../../api/rentals'

interface Store {
  store_id: number
  address: {
    address: string
    district: string
    city: {
      city: string
    }
  }
}

interface StoreDetailsByRentalIdProps {
  rentalId: number
  isOpen: boolean
}

const StoreDetailsByRentalId = ({ rentalId, isOpen }: StoreDetailsByRentalIdProps) => {
  const [storeDetails, setStoreDetails] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const data = await getRentalDetailsById(rentalId)
        setStoreDetails(data.inventory.store)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchStoreDetails()
    }
  }, [rentalId, isOpen])

  if (!isOpen) return null
  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!storeDetails) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Store Details</h2>
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-semibold w-32">Store ID:</span>
            <span>{storeDetails.store_id}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Address:</span>
            <span>{storeDetails.address.address}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">District:</span>
            <span>{storeDetails.address.district}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">City:</span>
            <span>{storeDetails.address.city.city}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StoreDetailsByRentalId