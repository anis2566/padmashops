import { BigCard } from "@/components/dashboard/card/big-card"
import { SmallCard } from "@/components/dashboard/card/small-card"
import { ModeToggle } from "@/components/mode-toggle"
import { Check, CreditCard, DollarSign, RefreshCcw, ShoppingCart, Truck } from "lucide-react"

const Dashboard = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <BigCard title="Today Orders" icon={DollarSign} value={530} />
                <BigCard title="Yesterday Orders" icon={DollarSign} value={1560} />
                <BigCard title="This Month" icon={CreditCard} value={4560} />
                <BigCard title="All Time" icon={CreditCard} value={241644} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <SmallCard title="Today Orders" icon={ShoppingCart} value={34} />
                <SmallCard title="Order Pending" icon={RefreshCcw} value={89} />
                <SmallCard title="Order Delivered" icon={Truck} value={25} />
                <SmallCard title="Order Returned" icon={Check} value={20} />
            </div>
        </main>
    )
}

export default Dashboard