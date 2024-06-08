import { Popcorn } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Slider } from "./slider"

export const PopularProducts = () => {
  
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Popcorn className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-semibold text-slate-700">Popular Products</h1>
        </div>
        <Button className="rounded-full">See All</Button>
      </div>
      <Slider />
    </div>
  )
}