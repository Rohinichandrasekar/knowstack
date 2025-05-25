import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    hero: {
      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      borderRadius: "20px",
      padding: "3rem 2rem",
      color: "white",
      textAlign: "center",
      marginBottom: "3rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    heroSubtitle: {
      fontSize: "1.5rem",
      fontWeight: "300",
      marginBottom: "2rem",
      opacity: "0.9",
    },
    featureCard: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "2rem",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      height: "100%",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "1.5rem",
      color: "#6e8efb",
    },
    featureTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#2c3e50",
    },
    featureText: {
      fontSize: "1rem",
      color: "#7f8c8d",
      lineHeight: "1.6",
    },
    ctaButton: {
      backgroundColor: "#6e8efb",
      color: "white",
      padding: "0.8rem 2rem",
      borderRadius: "50px",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginTop: "2rem",
    },
    decoration: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-6">
      {/* Hero Section */}
      <div style={styles.hero} className="animate__animated animate__fadeIn">
        <div style={{ ...styles.decoration, top: "-50px", right: "-50px" }}></div>
        <div style={{ ...styles.decoration, bottom: "-80px", left: "-80px" }}></div>

        <h1 style={styles.heroTitle}>Welcome to KnowStack</h1>
        <p style={styles.heroSubtitle}>
          Ask questions. Get answers. Share knowledge. Just like Quora, Stack Overflow, and beyond.
        </p>

        <button 
          style={styles.ctaButton}
          className="btn-hover-effect"
          onClick={() => navigate('/postquery')}
        >
          <i className="fas fa-plus-circle me-2"></i> Ask Your First Question
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Feature 1 */}
        <div
          style={styles.featureCard}
          className="feature-card animate__animated animate__fadeInUp"
          data-delay="100"
          onClick={() => navigate('/postquery')}
        >
          <div style={styles.featureIcon}>
            <i className="fas fa-question-circle"></i>
          </div>
          <h3 style={styles.featureTitle}>Ask a Question</h3>
          <p style={styles.featureText}>
            Post questions about programming, science, tech, or anything you're curious about. Our community is ready to help!
          </p>
        </div>

        {/* Feature 2 */}
        <div
          style={styles.featureCard}
          className="feature-card animate__animated animate__fadeInUp"
          data-delay="200"
          onClick={() => navigate('/myqueries')}
        >
          <div style={styles.featureIcon}>
            <i className="fas fa-lightbulb"></i>
          </div>
          <h3 style={styles.featureTitle}>Answer & Earn</h3>
          <p style={styles.featureText}>
            Share your knowledge, help others, and build your reputation as an expert in your field.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          style={styles.featureCard}
          className="feature-card animate__animated animate__fadeInUp"
          data-delay="300"
          onClick={() => navigate('/register')}
        >
          <div style={styles.featureIcon}>
            <i className="fas fa-users"></i>
          </div>
          <h3 style={styles.featureTitle}>Join the Community</h3>
          <p style={styles.featureText}>
            Connect with like-minded individuals, follow topics you love, and grow together.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "3rem", marginTop: "3rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem", color: "#2c3e50" }}>
          What Our Users Say
        </h2>
        <div className="row">
          {[
            {
              quote: `"KnowStack helped me solve a tricky programming problem in minutes when I was stuck for hours!"`,
              name: "- Rohini, Web Developer",
            },
            {
              quote: `"The quality of answers here is exceptional. I've learned so much from the community."`,
              name: "- Sachin Adith, Data Scientist",
            },
            {
              quote: `"As a beginner, I found the perfect mentors here who guided me through complex topics."`,
              name: "- Nithin Sangeethkumar, Designer",
            },
          ].map((testimonial, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
              }}>
                <i className="fas fa-quote-left fa-2x mb-3" style={{ color: "#6e8efb" }}></i>
                <p style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>{testimonial.quote}</p>
                <div style={{ fontWeight: "600" }}>{testimonial.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15) !important;
          background-color: #5a7df4 !important;
        }
        .btn-hover-effect:active {
          transform: translateY(0) !important;
        }
        .feature-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        .animate__animated {
          animation-duration: 0.8s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate__fadeIn {
          animation-name: fadeIn;
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        [data-delay="100"] {
          animation-delay: 0.1s;
        }
        [data-delay="200"] {
          animation-delay: 0.2s;
        }
        [data-delay="300"] {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Home;
