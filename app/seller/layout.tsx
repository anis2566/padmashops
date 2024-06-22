import { Pending } from "@/components/seller/home/pending"
import { Navbar } from "@/components/seller/navbar"
import { Sidebar } from "@/components/seller/sidebar"
import { ThemeProvider } from "@/providers/theme-provider"
import { getSeller } from "@/services/user.services"

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
    const {seller} = await getSeller()

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <main className="min-h-screen w-full flex relative">
                <div className="hidden md:block fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl">
                    <div className="fixed top-0 left-0 h-full w-[220px]">
                        <Sidebar />
                    </div>
                </div>
                <div className="flex flex-col flex-1 max-w-screen-2xl mx-auto">
                    <Navbar />
                    <main className="flex flex-1 flex-col p-4 md:ml-[220px]">
                        {
                            seller.status === "pending" ? <Pending /> : children
                        }
                    </main>
                </div>
            </main>
        </ThemeProvider>
    )
}

export default SellerLayout