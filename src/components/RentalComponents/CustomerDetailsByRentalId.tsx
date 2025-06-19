import { useEffect, useState } from 'react'
import { getRentalDetailsById } from '../../api/rentals'

interface Customer {
  customer_id: number
  first_name: string
  last_name: string
  email: string
  address: {
    address: string
    district: string
    city: {
      city: string
    }
  }
}

interface RentalDetails {
  rental_id: number
  rental_date: string
  return_date: string
  customer: Customer
  payment: Array<{
    payment_id: number
    amount: string
    payment_date: string
  }>
}

interface CustomerDetailsByRentalIdProps {
  rentalId: number
  isOpen: boolean
}

const CustomerDetailsByRentalId = ({ rentalId, isOpen }: CustomerDetailsByRentalIdProps) => {
  const [rentalDetails, setRentalDetails] = useState<RentalDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const data = await getRentalDetailsById(rentalId)
        setRentalDetails(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchRentalDetails()
    }
  }, [rentalId, isOpen])

  if (!isOpen) return null
  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!rentalDetails) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-semibold w-32">Customer ID:</span>
            <span>{rentalDetails.customer.customer_id}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Name:</span>
            <span>{rentalDetails.customer.first_name} {rentalDetails.customer.last_name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Email:</span>
            <span>{rentalDetails.customer.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Address:</span>
            <span>{rentalDetails.customer.address.address}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">District:</span>
            <span>{rentalDetails.customer.address.district}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">City:</span>
            <span>{rentalDetails.customer.address.city.city}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Rental Date:</span>
            <span>{new Date(rentalDetails.rental_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-32">Return Date:</span>
            <span>{rentalDetails.return_date ? new Date(rentalDetails.return_date).toLocaleDateString() : 'Not returned'}</span>
          </div>
          {rentalDetails.payment.length > 0 && (
            <div className="flex items-center">
              <span className="font-semibold w-32">Payment Amount:</span>
              <span>${rentalDetails.payment[0].amount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default CustomerDetailsByRentalId