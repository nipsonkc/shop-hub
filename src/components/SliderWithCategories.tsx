import { BackgroundSlider } from './BackgroundSlider';
import { CategoryGrid } from './CategoryGrid';

export function SliderWithCategories() {
  return (
    <section className="relative w-full">
      <BackgroundSlider />
      <CategoryGrid />
    </section>
  );
}