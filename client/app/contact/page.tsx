"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setShowThankYou(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setShowThankYou(false), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900">
            Have doubts?
            <span className="text-emerald-600"> Ask here</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you plan your perfect journey. Get in touch with us and let's make your travel dreams
            come true!
          </p>
        </div>
      </section>

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-12 h-auto">
              {showThankYou ? (
                <div className="text-center py-12 fade-in">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-emerald-600" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Your message has been sent successfully. We'll get back to you within 24 hours!
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="peer w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-200 bg-transparent focus:border-emerald-600 focus:outline-none transition-colors"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-emerald-600 peer-valid:top-0 peer-valid:text-sm"
                      >
                        Your Name *
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="peer w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-200 bg-transparent focus:border-emerald-600 focus:outline-none transition-colors"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-emerald-600 peer-valid:top-0 peer-valid:text-sm"
                      >
                        Email Address *
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="peer w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-200 bg-transparent focus:border-emerald-600 focus:outline-none transition-colors resize-none"
                        placeholder=" "
                        required
                      ></textarea>
                      <label
                        htmlFor="message"
                        className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-emerald-600 peer-valid:top-0 peer-valid:text-sm"
                      >
                        Your Message *
                      </label>
                    </div>

                    <button type="submit" className="btn-primary w-full text-xl py-5">
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-emerald-600">info@trek365.com</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-emerald-600">+91 98765 43210</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Visit Us</h3>
                      <p className="text-gray-600">Come say hello at our office</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-emerald-600">Uttarakhand, India</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Saturday</span>
                    <span className="font-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday</span>
                    <span className="font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mt-10">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Response Guarantee</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Need immediate assistance? We typically respond to inquiries within 2-4 hours during business hours.
            </p>
            <p className="text-sm text-gray-600">
             For urgent travel-related queries, please call us directly at our 24/7 helpline.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
