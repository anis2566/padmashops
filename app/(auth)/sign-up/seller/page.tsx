import { SellerRegisterForm } from "@/components/seller/register"
import Image from "next/image"

const SellerRegister = () => {
    return (
        <div className="space-y-6 w-full pt-5 px-4 h-screen">
            <div className="w-full flex justify-center">
                <div className="w-[100px] h-[100px] rounded-full shadow-md shadow-primary flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={70}
                        width={70}
                    />
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary text-center">Become a Seller</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                    Join our community and start earning by selling products.
                </p>
            </div>
            <SellerRegisterForm />
        </div>
    )
}

export default SellerRegister