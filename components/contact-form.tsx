"use client"

import type React from "react"

import { useState } from "react"
import { Send, Check, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
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

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <section className="contact-form-section">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-description">Have questions or feedback? We'd love to hear from you!</p>

        <div className="form-container">
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
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
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

          <div className="contact-info">
            <div className="info-card">
              <h3>Contact Information</h3>
              <div className="info-item">
                <strong>Email:</strong>
                <span>hello@itineraflow.com</span>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <span>123 Travel Avenue, San Francisco, CA 94105</span>
              </div>
              <div className="info-item">
                <strong>Hours:</strong>
                <span>Monday-Friday: 9am - 6pm EST</span>
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
        </div>
      </div>

      <style jsx>{`
        .contact-form-section {
          padding: 6rem 2rem;
          background: var(--background);
        }

        .form-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--primary);
        }

        .form-group input.error,
        .form-group textarea.error {
          border-color: var(--error);
        }

        .error-message {
          color: var(--error);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: var(--radius);
          font-weight: 600;
          transition: background 0.3s ease, transform 0.3s ease;
          margin-top: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button.submitting {
          background: var(--primary-dark);
          position: relative;
        }

        .submit-button.submitting::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 0.5rem;
        }

        .submit-button.success {
          background: var(--success);
          color: black;
        }

        .submit-button.error {
          background: var(--error);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-card {
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 1.5rem;
        }

        .info-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .info-item strong {
          margin-bottom: 0.25rem;
        }

        .info-item span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .social-links {
          background: rgba(18, 18, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 1.5rem;
        }

        .social-links h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--primary);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .social-icon:hover {
          background: var(--primary);
          transform: translateY(-5px);
        }

        @media (max-width: 992px) {
          .form-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
