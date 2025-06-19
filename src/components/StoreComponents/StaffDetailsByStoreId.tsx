import { useEffect, useState } from 'react'
import { getAllStaffDetailsByStoreId } from '../../api/store'

interface Staff {
  manager: string
  address: string
  staffId: number
}

interface StaffDetailsByStoreIdProps {
  storeId: number
  isOpen: boolean
}

const StaffDetailsByStoreId = ({ storeId, isOpen }: StaffDetailsByStoreIdProps) => {
  const [staffDetails, setStaffDetails] = useState<Staff | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await getAllStaffDetailsByStoreId(storeId)
        setStaffDetails(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchStaffDetails()
    }
  }, [storeId, isOpen])

  if (!isOpen) return null
  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!staffDetails) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Details</h2>
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-semibold w-24">Manager:</span>
            <span>{staffDetails.manager}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Address:</span>
            <span>{staffDetails.address}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Staff ID:</span>
            <span>{staffDetails.staffId}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StaffDetailsByStoreId