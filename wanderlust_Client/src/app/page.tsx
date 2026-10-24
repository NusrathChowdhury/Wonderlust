import { Navbar } from "@/components/site/navbar"
import { Banner } from "@/components/site/banner"
import { WhyChoose } from "@/components/site/why-choose"
import { Destinations } from "@/components/site/destinations"
import { Testimonials } from "@/components/site/testimonials"
import { ReadyToStart } from "@/components/site/ready-to-start"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <ReadyToStart />
      <Footer />
    </>
  )
}
