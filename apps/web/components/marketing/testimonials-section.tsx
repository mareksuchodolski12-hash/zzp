const testimonials = [
  {
    name: 'LenaSinger.nl',
    role: 'Voorbeeld: Zangeres & Vocal Coach — klaar in 36 uur',
    content:
      'Professionele branding, foto’s, teksten en een moderne uitstraling die klanten aantrekt.',
    avatar: 'LS',
    rating: 5,
  },
  {
    name: 'MSHydroPro.nl',
    role: 'Voorbeeld: Loodgieter & Installateur — klaar in 41 uur',
    content:
      'Technische diensten helder uitgelegd, sterke call‑to‑actions en een betrouwbare uitstraling.',
    avatar: 'MH',
    rating: 5,
  },
  {
    name: 'SystemPilot.nl',
    role: 'Voorbeeld: IT‑specialist & Systeembeheer — klaar in 44 uur',
    content:
      'Strakke zakelijke website met duidelijke diensten en conversiegerichte structuur.',
    avatar: 'SP',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Wat andere ZZP&apos;ers zeggen</h2>
          <p className="text-xl text-gray-600">
            Honderden tevreden ZZP-professionals gingen je voor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gradient-to-br from-white to-blue-50/40 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-emerald-500 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
