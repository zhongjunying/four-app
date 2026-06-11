import Checkout from "@/components/Checkout";
import { authAction } from "@/actions/users";
import { redirect } from "next/navigation";
import { getAddressesAction } from "@/actions/addresses";
import { JwtPayload } from 'jsonwebtoken'

export default async function Page() {
    const authResult = await authAction()
    if (authResult.status !== 200 ) {
        redirect('/account')
    }
    const addressesData= (await getAddressesAction((authResult.data as JwtPayload).userid)).data

    return (
        <div className="container-sm">
            <Checkout addressesData={addressesData}  />
        </div>
    );
}