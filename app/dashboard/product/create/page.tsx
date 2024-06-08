import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CreateNonVariantProduct } from "@/components/dashboard/product/create-non-variant-product"
import { CreateVariantProduct } from "@/components/dashboard/product/create-variant-product"

const CreateProduct = () => {
    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/product">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Tabs defaultValue="non-variant" className="w-full">
                <TabsList>
                    <TabsTrigger value="non-variant">Non Variant</TabsTrigger>
                    <TabsTrigger value="variant">Variant</TabsTrigger>
                </TabsList>
                <TabsContent value="non-variant">
                    <CreateNonVariantProduct />
                </TabsContent>
                <TabsContent value="variant">
                    <CreateVariantProduct />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CreateProduct