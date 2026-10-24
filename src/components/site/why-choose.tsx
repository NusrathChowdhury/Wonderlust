import { ShieldCheck, Map, Headphones } from "lucide-react"

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-[#e8f7fa] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-[15px] text-slate-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon className="size-9 text-[#1a9dc4]" strokeWidth={1.75} />
                <h3 className="mt-6 text-2xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
