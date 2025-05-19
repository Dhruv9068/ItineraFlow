import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/styles/about.css"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="hero-title">Our Story</h1>
          <p className="hero-subtitle">Reimagining travel planning for the modern explorer</p>
        </div>
      </div>

      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              At ItineraFlow, we believe that travel should be transformative, immersive, and seamlessly planned. Our
              mission is to empower travelers with innovative tools and curated content that make planning as enjoyable
              as the journey itself.
            </p>
            <p className="mission-text">
              We're passionate about helping you discover the world on your terms, whether you're seeking cultural
              immersion, adventure thrills, or peaceful retreats. Our platform combines cutting-edge technology with
              human expertise to create travel experiences that resonate with your unique interests.
            </p>
          </div>
          <div className="mission-image">
            <Image
              src="https://picsum.photos/id/304/600/400"
              alt="Team planning travel experiences"
              width={600}
              height={400}
              className="rounded-image"
            />
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Responsible Travel</h3>
              <p>
                We promote sustainable tourism practices and support local communities through our recommendations and
                partnerships.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Authentic Experiences</h3>
              <p>
                We curate genuine, off-the-beaten-path experiences that connect travelers with local cultures and
                traditions.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>
                We continuously push the boundaries of travel technology to create intuitive, immersive planning tools.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Inclusivity</h3>
              <p>
                We design our platform to be accessible and useful for travelers of all backgrounds, abilities, and
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-description">
            Passionate travelers and tech enthusiasts building the future of travel planning
          </p>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://picsum.photos/id/1005/300/300"
                  alt="Alex Chen"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
              <h3>Alex Chen</h3>
              <p className="member-title">Founder & CEO</p>
              <p className="member-bio">
                Former travel blogger with a background in UX design. Has visited 52 countries and counting.
              </p>
            </div>

            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://picsum.photos/id/1011/300/300"
                  alt="Maya Rodriguez"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
              <h3>Maya Rodriguez</h3>
              <p className="member-title">Chief Product Officer</p>
              <p className="member-bio">
                Tech innovator with a passion for creating intuitive digital experiences. Adventure travel enthusiast.
              </p>
            </div>

            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://picsum.photos/id/1012/300/300"
                  alt="James Wilson"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
              <h3>James Wilson</h3>
              <p className="member-title">Head of Partnerships</p>
              <p className="member-bio">
                Former hospitality executive with extensive connections in the global tourism industry.
              </p>
            </div>

            <div className="team-member">
              <div className="member-image">
                <Image
                  src="https://picsum.photos/id/1027/300/300"
                  alt="Priya Sharma"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
              <h3>Priya Sharma</h3>
              <p className="member-title">Lead Developer</p>
              <p className="member-bio">
                Full-stack developer and digital nomad who has been coding from around the world for the past 5 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-journey">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2020</h3>
                <h4>The Beginning</h4>
                <p>
                  ItineraFlow was born from a simple idea: travel planning should be as enjoyable as the journey itself.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2021</h3>
                <h4>First Beta Launch</h4>
                <p>
                  We released our first prototype to a small group of travel enthusiasts and gathered valuable feedback.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2022</h3>
                <h4>Growing Community</h4>
                <p>
                  Our user base expanded to 10,000 travelers, and we formed our first partnerships with boutique hotels
                  and local guides.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2023</h3>
                <h4>Platform Expansion</h4>
                <p>
                  We introduced our 3D visualization tools and interactive maps, revolutionizing how travelers plan
                  their journeys.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2024</h3>
                <h4>Global Recognition</h4>
                <p>
                  ItineraFlow was recognized as one of the most innovative travel tech platforms, with users from over
                  50 countries.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2025</h3>
                <h4>The Future</h4>
                <p>We continue to innovate and expand, with exciting new features and destinations on the horizon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What People Say</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                "ItineraFlow transformed how I plan my trips. The interactive tools made organizing our family vacation
                to Japan so much easier and more fun!"
              </div>
              <div className="testimonial-author">
                <Image
                  src="https://picsum.photos/id/64/100/100"
                  alt="Sarah J."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4>Sarah J.</h4>
                  <p>Family Traveler</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                "As a solo traveler, I appreciate how the platform helps me discover authentic experiences and connect
                with other travelers. It's been a game-changer."
              </div>
              <div className="testimonial-author">
                <Image
                  src="https://picsum.photos/id/91/100/100"
                  alt="Miguel L."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4>Miguel L.</h4>
                  <p>Solo Adventurer</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                "The budget calculator and itinerary planner helped us maximize our time and money on our European tour.
                We discovered places we would have never found otherwise."
              </div>
              <div className="testimonial-author">
                <Image
                  src="https://picsum.photos/id/26/100/100"
                  alt="Emma & David"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4>Emma & David</h4>
                  <p>Couple Travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-description">Collaborating with leading brands in travel and hospitality</p>

          <div className="partners-grid">
            <div className="partner-logo">
              <Image src="https://picsum.photos/id/20/200/100" alt="SkyWings Airlines" width={200} height={100} />
            </div>
            <div className="partner-logo">
              <Image src="https://picsum.photos/id/21/200/100" alt="GlobeHotels" width={200} height={100} />
            </div>
            <div className="partner-logo">
              <Image src="https://picsum.photos/id/22/200/100" alt="AdventureTours" width={200} height={100} />
            </div>
            <div className="partner-logo">
              <Image src="https://picsum.photos/id/24/200/100" alt="TravelInsure" width={200} height={100} />
            </div>
            <div className="partner-logo">
              <Image src="https://picsum.photos/id/25/200/100" alt="LocalGuides" width={200} height={100} />
            </div>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to start your journey?</h2>
          <p>Join thousands of travelers who are planning unforgettable experiences with ItineraFlow</p>
          <Link href="/destinations" className="cta-button">
            Explore Destinations <ArrowRight className="icon" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
