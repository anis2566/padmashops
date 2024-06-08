import { RecentlyAdded } from "./recently-added"
import { TopRated } from "./top-rated"
import { TopSelling } from "./top-selling"

export const ProductHouse = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-x-5">
            <TopSelling />
            <RecentlyAdded />
            <TopRated />
        </div>
    )
}