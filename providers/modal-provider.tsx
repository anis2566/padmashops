import { AssignBestDealProductModal } from "@/components/dashboard/modals/assign-best-deal.modal"
import { AssignFeatureProductModal } from "@/components/dashboard/modals/assign-feature.modal"
import { AssignPopularProductModal } from "@/components/dashboard/modals/assign-polular.modal"
import { DeleteBannerModal } from "@/components/dashboard/modals/banner-modal"
import { RemoveBestDealProductModal } from "@/components/dashboard/modals/best-deal-product.modal"
import { DeleteBrandModal } from "@/components/dashboard/modals/brand.modal"
import { DeleteCategoryModal } from "@/components/dashboard/modals/category.modal"
import { DeleteCouponModal } from "@/components/dashboard/modals/coupon.modal"
import { DeleteCustomerModal } from "@/components/dashboard/modals/customer.modal"
import { RemoveFeatureProductModal } from "@/components/dashboard/modals/feature-product.modal"
import { RemovePopularProductModal } from "@/components/dashboard/modals/popular-product.modal"
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
            <DeleteBannerModal />
            <AssignPopularProductModal />
            <RemovePopularProductModal />
            <AssignBestDealProductModal />
            <RemoveBestDealProductModal />
            <AssignFeatureProductModal />
            <RemoveFeatureProductModal />
            <DeleteCustomerModal />
        </>
    )
}