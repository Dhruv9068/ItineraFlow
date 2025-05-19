"use client"

import type React from "react"

import { useState } from "react"
import { Send, Check, AlertCircle, Mail, Phone, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/styles/contact.css"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setFormStatus("submitting")

      // Simulate API call
      setTimeout(() => {
        setFormStatus("success")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset form status after 3 seconds
        setTimeout(() => {
          setFormStatus("idle")
        }, 3000)
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">We'd love to hear from you. Reach out with any questions or feedback.</p>
        </div>
      </div>

      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <h2>Contact Information</h2>
              <p>Have questions about our services or need assistance planning your trip? Our team is here to help.</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Mail />
                  </div>
                  <div className="method-details">
                    <h3>Email Us</h3>
                    <p>hello@itineraflow.com</p>
                    <p>support@itineraflow.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Phone />
                  </div>
                  <div className="method-details">
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <MapPin />
                  </div>
                  <div className="method-details">
                    <h3>Visit Us</h3>
                    <p>123 Travel Avenue</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Clock />
                  </div>
                  <div className="method-details">
                    <h3>Office Hours</h3>
                    <p>Monday-Friday: 9am - 6pm EST</p>
                    <p>Weekend: 10am - 4pm EST</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  />
                  {errors.subject && <div className="error-message">{errors.subject}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  ></textarea>
                  {errors.message && <div className="error-message">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  className={`submit-button ${formStatus}`}
                  disabled={formStatus === "submitting" || formStatus === "success"}
                >
                  {formStatus === "idle" && (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                  {formStatus === "submitting" && <>Sending...</>}
                  {formStatus === "success" && (
                    <>
                      Message Sent <Check size={16} />
                    </>
                  )}
                  {formStatus === "error" && (
                    <>
                      Try Again <AlertCircle size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I create a custom itinerary?</h3>
              <p>
                You can create a custom itinerary by signing up for an account and using our interactive planner tool.
                Simply select your destination, travel dates, and start adding activities to your schedule.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I share my itinerary with travel companions?</h3>
              <p>
                Yes! Once you've created an itinerary, you can share it with friends and family via email or by
                generating a unique link that allows them to view and even collaborate on the plan.
              </p>
            </div>

            <div className="faq-item">
              <h3>Are the travel recommendations personalized?</h3>
              <p>
                Absolutely. Our recommendation engine learns from your preferences and past trips to suggest
                destinations and activities that match your interests, travel style, and budget.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I book activities through ItineraFlow?</h3>
              <p>
                When you find an activity you'd like to book, simply click the "Book Now" button. You'll be directed to
                our trusted partners' booking platforms to complete your reservation securely.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is my payment information secure?</h3>
              <p>
                Yes, we take security seriously. We use industry-standard encryption and never store your full payment
                details on our servers. All transactions are processed through secure, PCI-compliant payment gateways.
              </p>
            </div>

            <div className="faq-item">
              <h3>What if I need to cancel or modify my trip?</h3>
              <p>
                You can modify your itinerary at any time through your account. For bookings made through our partners,
                cancellation policies vary. We provide clear information about these policies before you complete any
                booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Visit Our Office</h2>
          <div className="office-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968870204795!2d-122.39997368468215!3d37.78774997975504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085d1d35d05%3A0x8f5c4e7c2d7edd11!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1620956669141!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
