import { Banner } from "@/components/Home/banner"
import { WhyChoose } from "@/components/Home/why-choose"
import { Destinations } from "@/components/Destination/destinations"
import { Testimonials } from "@/components/Home/testimonials"
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
