"use client"

import { GET_PRODUCTS_CLIENT, SET_FEATURE_PRODUCT, SET_POPULAR_PRODUCT } from "@/actions/product.action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { useAssignFeatureProduct } from "@/hooks/use-feature-product"
import { useAssignPopularProduct } from "@/hooks/use-popular-product"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, Loader, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const AssignFeatureProductModal = () => {
    const [search, setSearch] = useState<string>("")
    const [productId, setProductId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const { open, onClose } = useAssignFeatureProduct()
    const searchValue = useDebounce(search)

    const {data:products, isLoading} = useQuery({
        queryKey: ["get-products-to-assign-feature", searchValue],
        queryFn: async () => {
            const res = await GET_PRODUCTS_CLIENT(searchValue)
            return res.products
        },
    })

    const {mutate: setFeatireProdict, isPending} = useMutation({
        mutationFn: SET_FEATURE_PRODUCT,
        onSuccess: (data) => {
            setProductId("")
            onClose()
            toast.success(data?.success, {
                id: "assign-product"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "assign-product"
            });
        }
    })

    const handleAssign = () => {
        toast.loading("Product assigning...", {
            id: "assign-product"
        })
        setFeatireProdict({productId, title})
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Assign feature product</DialogTitle>
                <DialogDescription>
                    Search your your product to assign.
                </DialogDescription>
                </DialogHeader>
                <Input
                    type="search"
                    placeholder="Search product by name"
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setProductId("")
                    }}
                />
                {
                    search && isLoading ? (
                        <div className="w-full min-h-[100px] flex justify-center items-center">
                            <Loader className="w-5 h-5 animate-spin" />
                        </div>
                    ) : null
                }
                <div className="w-full space-y-2">
                    {
                        products?.map(product => (
                            <div key={product.id} className="flex items-center justify-between hover:bg-muted p-2 rounded-md">
                                <div className="flex items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src={product.featureImageUrl} />
                                        <AvatarFallback>P</AvatarFallback>
                                    </Avatar>
                                    <p className="truncate">{product.name.slice(0, 30)}</p>
                                </div>
                                <Checkbox
                                    disabled={isPending}
                                    checked={productId === product.id}
                                    onCheckedChange={() => {
                                        if (productId === product.id) {
                                            setProductId("")
                                        } else {
                                            setProductId(product.id)
                                        }
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
                <Collapsible open={!!(productId && search)}>
                    <CollapsibleContent>
                        <Label>Title</Label>
                        <Textarea onChange={(e) => setTitle(e.target.value)} className="mt-1" disabled={isPending} />
                    </CollapsibleContent>
                </Collapsible>
                <Button disabled={!productId || isPending || !title} onClick={handleAssign}>Assign</Button>
            </DialogContent>
        </Dialog>
    )
}