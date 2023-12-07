import { Container } from '@/components/container'
import { Clients } from '@/components/homepage/client'
import { HomepageHero } from '@/components/homepage/homepage-zero'
import { Services } from '@/components/homepage/service'
import Navbar from '@/components/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="overflow-hidden pb-[16.4rem] md:pb-[25.6rem]">
        <Container className="pt-[6.4rem]">
          <HomepageHero />
        </Container>
        <Container>
          <Clients />
        </Container>
      </div>
    </>
  )
}
