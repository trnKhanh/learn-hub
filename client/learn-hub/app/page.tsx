import { Container } from "@/components/container";
import About from "@/components/homepage/about";
import Categories from "@/components/homepage/category";
import Clients from "@/components/homepage/client";
import { HomepageHero } from "@/components/homepage/homepage-zero";
import NewsLetter from "@/components/homepage/news-letter";
import Services from "@/components/homepage/services";

export default function Home() {
  return (
    <div>
      <Container className="pt-[6.4rem] pb-[10rem]">
        <HomepageHero />
      </Container>
      <Clients />
      <Services />
      <Categories />
      <About />
      <NewsLetter />
    </div>
  );
}
