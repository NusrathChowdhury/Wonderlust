import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function ReadyToStart() {
  return (
    <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-4 py-24">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

      <div className="relative text-center text-white">
        <h2 className="font-serif text-4xl text-balance md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/80">
          Join thousands of happy travelers who have explored the world with us
        </p>
        <a
          href="#destinations"
          className="mt-8 inline-flex items-center gap-2.5 bg-black px-8 py-3.5 text-[13px] font-medium tracking-wide uppercase transition-colors hover:bg-white hover:text-black"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" data-icon="inline-end" />
        </a>
      </div>
    </section>
  )
}
