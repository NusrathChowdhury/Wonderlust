import { Banner } from "@/components/site/banner"
import { WhyChoose } from "@/components/site/why-choose"
import { Destinations } from "@/components/site/destinations"
import { Testimonials } from "@/components/site/testimonials"
import { ReadyToStart } from "@/components/site/ready-to-start"

export default function Home() {
  return (
    <>
      <Banner />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <ReadyToStart />
      
    </>
  )
}
