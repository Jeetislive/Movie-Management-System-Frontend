import { useEffect, useState } from 'react'
import { getStoreById } from '../../api/store'

interface StoreDetailsProps {
  storeId: string
  isOpen: boolean
}

interface StoreData {
  id: string
  address: string
  manager: string
}

export default function StoreDetails({ storeId, isOpen }: StoreDetailsProps) {
  const [store, setStore] = useState<StoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        setLoading(true)
        const data = await getStoreById(storeId)
        setStore(data)
      } catch (error) {
        console.error("Error fetching store details:", error);
        setError('Failed to load store details')
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchStoreDetails()
    }
  }, [storeId, isOpen])

  if (!isOpen) return null

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600">Store not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Manager</h2>
            <p className="text-gray-600">{store.manager}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <p className="text-gray-600">{store.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}