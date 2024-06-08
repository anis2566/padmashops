import { BigCard } from "@/components/home/card/big-card";
import { ShoppingCart } from "lucide-react";

const Account = () => {

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 px-4">
            <div className="grid gap-4 md:grid-cols-3">
                <BigCard title="Today Orders" icon={ShoppingCart} value={530} />
                <BigCard title="Pending Orders" icon={ShoppingCart} value={1560} />
                <BigCard title="Total Orders" icon={ShoppingCart} value={4560} />
            </div>
        </main>
    )
}

export default Account; 