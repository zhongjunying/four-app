'use client'
import { JwtPayload } from 'jsonwebtoken'
import { Button } from './ui/button'
import { logoutAction } from '@/actions/users'
import { useRouter } from 'next/navigation'
import Address from './Address'
import { Address as AddressType } from '@/types/global'

export default function Account({ authData, addressesData }: { authData: JwtPayload; addressesData: AddressType[] }) {
  const router = useRouter()
  const handleClick = async () => {
    const res = await logoutAction()
    if (res.status === 200) {
      router.refresh()
    }
  }
  console.log(3123123123,authData)
  return (
    <div className="container-sm py-10">
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Account</h2>
        <div className="flex justify-between items-center">
          <div>
            <p>Hello: {authData.name}</p>
            <p>Signed in as: {authData.email}</p>
          </div>
          <Button onClick={handleClick}>Logout</Button>
        </div>
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Addresses</h2>
        <div>
          <p>View and update your shipping addresses, you can add as many as you like.</p>
          <p>Saving your addresses will make them available during checkout.</p>
        </div>
        <Address authData={authData} addressesData={addressesData} />
      </div>
      <div className="py-4">
        <h2 className="text-lg leading-10 font-bold">Orders</h2>
        <div>
          <p>There is currently no order information available</p>
        </div>
      </div>
    </div>
  )
}