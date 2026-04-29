import React, { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-blue-100">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Location Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
            <p className="text-gray-600">
              Lalpet,<br/>
              Cuddalore,<br/>
              Tamil Nadu.
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
            <p className="text-gray-600">
              +91 7806854182<br/>
              <span className="text-sm">Mon-Fri 9am-6pm EST</span><br/>
              <span className="text-sm">Sat-Sun 10am-4pm EST</span>
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8 text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-600">
              support@storhub.com<br/>
              <span className="text-sm">Response within 24 hours</span><br/>
              sales@storhub.com
            </p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-6">Have a question or feedback? We're here to help.</p>

            {submitted && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-semibold text-lg"
              >
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4">We respect your privacy and will never share your information.</p>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-5">
                <div className="pb-5 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">What's your return policy?</h3>
                  <p className="text-gray-600">We offer a hassle-free 30-day return policy for all products in original condition with receipt.</p>
                </div>

                <div className="pb-5 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Do you ship internationally?</h3>
                  <p className="text-gray-600">Yes! We ship to over 50 countries worldwide. International shipping rates vary by location.</p>
                </div>

                <div className="pb-5 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">How long does shipping take?</h3>
                  <p className="text-gray-600">Standard shipping takes 5-7 business days. Express (2-3 days) and Overnight options are available.</p>
                </div>

                <div className="pb-5 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Is my payment secure?</h3>
                  <p className="text-gray-600">Yes, we use industry-standard SSL encryption and PCI compliance to protect your payment information.</p>
                </div>

                <div className="pb-5 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Do you offer bulk discounts?</h3>
                  <p className="text-gray-600">Yes! Contact our sales team for wholesale and bulk order pricing. Email: sales@storhub.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Can I track my order?</h3>
                  <p className="text-gray-600">Absolutely! You'll receive a tracking number via email once your order ships.</p>
                </div>
              </div>
            </div>

            {/* Support Channels */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-semibold text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available Monday-Friday, 9am-6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold text-gray-900">Social Media</p>
                    <p className="text-sm text-gray-600">Message us on Facebook, Twitter, or Instagram</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📖</span>
                  <div>
                    <p className="font-semibold text-gray-900">Help Center</p>
                    <p className="text-sm text-gray-600">Browse our knowledge base for quick answers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Customer Support</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Returns & Exchanges</h3>
              <p className="text-gray-600 mb-3">
                Return shipping labels are available through your account or email support@storhub.com for assistance with returns and exchanges.
              </p>
              <p className="text-sm text-gray-500">Returns accepted within 30 days of purchase.</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-blue-100 mb-8">Follow StorHub on social media for updates, deals, and product launches</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              📘 Facebook
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              𝕏 Twitter
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              📷 Instagram
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              ▶️ YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact