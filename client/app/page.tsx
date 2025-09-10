import Link from "next/link";
import Image from "next/image";
import { MapPin, Luggage, Headphones } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overlay">
          <Image
            src={"/Trek365_HomePage.jpg"}
            alt="DreamWayHolidays Homepage Image"
            fill
            className="object-cover scale-110 transition-transform duration-[10s] hover:scale-100"
            priority
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Your Journey,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">
              Our Care
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Discover the spiritual and adventurous heart of India with
            stress-free travel planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/packages" className="btn-primary">
              {"Explore Packages ->"}
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Featured
              <span className="text-emerald-600"> Destinations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked experiences that will transform your perspective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Char Dham Yatra",
                image:
                  "https://res.cloudinary.com/dvkmzugpb/image/upload/v1757518689/ofbqygqma9d3iwl8jhro_v0b4xb.jpg",
                type: "Spiritual",
              },
              {
                title: "Himalayan Adventures",
                image:
                  "https://res.cloudinary.com/dvkmzugpb/image/upload/v1757518694/kedarkantha3_bqofn0_mh5qw0.jpg",
                type: "Winter",
              },
              {
                title: "Chandrashila Trek",
                image:
                  "https://res.cloudinary.com/dvkmzugpb/image/upload/v1757518657/pslser1t32p7sjmlphjf_u9zi1x.jpg",
                type: "Winter",
              },
            ].map((destination, index) => (
              <Link
                href={"/packages"}
                key={index}
                className="package-card group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                      {destination.type}
                    </span>
                    <h3 className="text-xl font-bold">{destination.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/packages" className="btn-primary">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 slide-up">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Why Choose{" "}
              <span className="text-emerald-600 text-4xl md:text-6xl">
                DreamWayHolidays
              </span>
              <span className="text-3xl md:text-6xl text-black">?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just plan trips, we craft transformative experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Local Expertise */}
            <div className="card text-center group cursor-default">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 transition-transform duration-300">
                <MapPin className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Local Expertise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our local guides know every hidden gem and sacred spot, ensuring
                you experience the authentic India.
              </p>
            </div>

            {/* Hassle-Free Experience */}
            <div className="card text-center group cursor-default">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 transition-transform duration-300">
                <Luggage className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Hassle-Free Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From booking to boarding, we handle everything so you can focus
                on creating memories.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="card text-center group cursor-default">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 transition-transform duration-300">
                <Headphones className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is always available to assist you
                throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
