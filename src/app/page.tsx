import { Hero } from '@/components/home/Hero'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { PopularProducts } from '@/components/home/PopularProducts'
import { Features } from '@/components/home/Features'

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <PopularProducts />
      <Features />
    </div>
  )
}