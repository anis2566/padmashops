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
import { MessageModal } from "@/components/dashboard/modals/message.modal"
import { RemovePopularProductModal } from "@/components/dashboard/modals/popular-product.modal"
import { DeleteProductModal } from "@/components/dashboard/modals/product.modal"
import { SellerStatusModal } from "@/components/dashboard/modals/seller-status.modal"
import { DeleteSellerModal } from "@/components/dashboard/modals/seller.modal"
import { TrackingModal } from "@/components/dashboard/modals/tracking.modal"
import { WithdrawStatusModal } from "@/components/dashboard/modals/withdraw.modal"
import { DeleteAddressModal } from "@/components/home/modal/address-modal"
import { QuickOrderModal } from "@/components/home/modal/quick-order-modal"
import { RegisterSuccessModal } from "@/components/seller/register/register-modal"
import { WithdrawModal } from "@/components/seller/withdraw/withdraw.modal"

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
            <MessageModal />
            <SellerStatusModal />
            <DeleteSellerModal />
            <TrackingModal />
            <WithdrawModal />
            <WithdrawStatusModal />
            <RegisterSuccessModal />
            <QuickOrderModal />
        </>
    )
}