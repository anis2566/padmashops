import { DeleteBrandModal } from "@/components/dashboard/modals/brand.modal"
import { DeleteCategoryModal } from "@/components/dashboard/modals/category.modal"
import { DeleteCouponModal } from "@/components/dashboard/modals/coupon.modal"
import { DeleteProductModal } from "@/components/dashboard/modals/product.modal"
import { DeleteAddressModal } from "@/components/home/modal/address-modal"

export const ModalProvider = () => {
    return (
        <>
            <DeleteBrandModal />
            <DeleteCategoryModal />
            <DeleteCouponModal />
            <DeleteProductModal />
            <DeleteAddressModal />
        </>
    )
}