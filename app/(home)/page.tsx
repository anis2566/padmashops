import { DailyBestDeal } from "@/components/home/daily-best-deal"
import { FeatureProducts } from "@/components/home/feature-products"
import { Hero } from "@/components/home/hero"
import { Newsletter } from "@/components/home/newsletter"
import { PopularProducts } from "@/components/home/popular-products"
import { ProductHouse } from "@/components/home/product-house"
import { TopCategory } from "@/components/home/top-category"

const Home = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 space-y-[30px] pb-10">
      <Hero />
      <TopCategory />
      <PopularProducts />
      <DailyBestDeal />
      <FeatureProducts />
      <ProductHouse />
      <Newsletter />
    </div>
  )
}

export default Home