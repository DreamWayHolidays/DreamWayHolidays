import Image from "next/image"

export default function About() {
  return (
    <div className="pt-20">
      <section className="relative h-96 flex items-center justify-center text-white mb-16">
        <div className="absolute inset-0 z-0">
          <Image src="/happy-travelers-indian-guide.png" alt="About Trek365" fill className="object-cover" />
          <div className="hero-overlay"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            About
            <span className="text-emerald-400"> Trek365</span>
          </h1>
          <p className="text-xl font-light">Crafting transformative journeys across incredible India</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-emerald-800 text-white rounded-3xl p-12 lg:p-16 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8">What is Trek365?</h2>
              <p className="text-xl leading-relaxed mb-6">
                Trek365 is India's premier travel experience platform, specializing in spiritual and adventure
                journeys that connect you with the soul of incredible India.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                We believe that travel is not just about visiting places, but about transforming lives through
                meaningful experiences that leave lasting impressions on your heart and mind.
              </p>
            </div>
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image src="/indian-temple-meditation.png" alt="Spiritual journey" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-12 lg:p-16 mb-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-1">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image src="/himalayan-trekking-adventure.png" alt="Adventure trekking" fill className="object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400 rounded-full opacity-20"></div>
            </div>
            <div className="lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 text-gray-900">What We Do</h2>
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                We curate extraordinary travel experiences across India, from spiritual pilgrimages to the sacred
                Ganges, to thrilling adventures in the mighty Himalayas.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Our expertly crafted itineraries blend cultural immersion, spiritual awakening, and adrenaline-pumping
                activities to create journeys that transform perspectives and create lifelong memories.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-emerald-800 text-white rounded-3xl p-12 lg:p-16 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-6">
                To make India's rich spiritual and natural heritage accessible to every traveler, while ensuring
                sustainable tourism practices that benefit local communities.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                We strive to create transformative journeys that leave lasting positive impacts on both travelers and
                destinations, fostering cultural understanding and environmental consciousness.
              </p>
            </div>
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/happy-travelers-indian-guide.png"
                  alt="Travelers with local guide"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-yellow-400 rounded-full opacity-10"></div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-12 lg:p-16 mb-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-1">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image src="/luxury-mountain-view-india.png" alt="Luxury accommodation" fill className="object-cover" />
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-emerald-400 rounded-full opacity-15"></div>
            </div>
            <div className="lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 text-gray-900">Why Choose Us</h2>
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                With over a decade of experience and thousands of satisfied travelers, we offer unmatched expertise in
                Indian travel experiences.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 mb-8">
                Our commitment to quality, safety, and authentic experiences sets us apart. Every journey with us is
                carefully planned, expertly guided, and absolutely unforgettable.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-2">10+</div>
                  <div className="text-sm font-semibold text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-2">5000+</div>
                  <div className="text-sm font-semibold text-gray-600">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-2">50+</div>
                  <div className="text-sm font-semibold text-gray-600">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-2">4.8★</div>
                  <div className="text-sm font-semibold text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
