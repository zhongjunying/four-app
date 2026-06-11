import Cart from "@/components/Cart";
import { authAction } from "@/actions/users";
export default async function Page() {
  const authResult = await authAction()
  return (
    <div className="container flex py-6">
      <Cart status={authResult.status} />
    </div>
  );
}