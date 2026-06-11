import NotAccount from "@/components/NotAccount";
import Account from "@/components/Account";
import { authAction } from "@/actions/users";
import { JwtPayload } from 'jsonwebtoken'
import { getAddressesAction } from "@/actions/addresses";
import { Address } from "@/types/global";
export default async function Page() {
    const authResult = await authAction()
    const isAuth = authResult.status === 200 && authResult.data
    const addressesData= isAuth ? (await getAddressesAction((authResult.data as JwtPayload).userid)).data : []
    return (
        <>
            {isAuth ? <Account authData={authResult.data as JwtPayload} addressesData={addressesData as Address[]}  /> : <NotAccount />}
        </>
    )
}