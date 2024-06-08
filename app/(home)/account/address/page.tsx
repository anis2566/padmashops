import { AddressForm } from "@/components/home/account/address-form"
import { AddressList } from "@/components/home/account/address-list"

const Address = () => {
    return (
        <div className="space-y-6">
            <AddressList />
            <AddressForm />
        </div>
    )
}

export default Address