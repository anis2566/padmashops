import { AddressForm } from "@/components/home/account/address-form"
import { AddressList } from "@/components/home/account/address-list"

const Address = () => {
    return (
        <div className="space-y-6 px-2">
            <AddressList />
            <AddressForm />
        </div>
    )
}

export default Address