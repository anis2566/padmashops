import { Sidebar } from "@/components/home/account/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { USER_NAVBAR } from "@/constant";
import Link from "next/link";


const AccountLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white py-4 mt-7 space-y-6">
            <Tabs defaultValue="Dashboard" className="md:hidden w-full">
                <TabsList className="w-full">
                    {
                        USER_NAVBAR.map((item, i) => (
                            <TabsTrigger value={item.label} key={i} asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

            <div className="flex gap-x-3">
                <Sidebar />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AccountLayout;