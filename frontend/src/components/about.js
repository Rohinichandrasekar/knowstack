import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Inline styles matching MyQueries component
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "0 15px",
      fontFamily: "'Segoe UI', sans-serif"
    },
    header: {
      background: "linear-gradient(90deg, #3f51b5, #9c27b0)",
      color: "white",
      padding: "60px 20px",
      borderRadius: "15px",
      textAlign: "center",
      marginBottom: "3rem",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      margin: "0 0 1rem 0",
      animation: "fadeInDown 1s ease-in-out"
    },
    subtitle: {
      fontSize: "1.2rem",
      fontWeight: "400",
      opacity: "0.9",
      margin: "0"
    },
    highlight: {
      color: "#ffeb3b",
      fontWeight: "bold"
    },
    sectionTitle: {
      fontSize: "2rem",
      marginBottom: "1.5rem",
      color: "#2c3e50",
      fontWeight: "600",
      textAlign: "center"
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "1.5rem",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      marginBottom: "1.5rem",
      height: "100%",
      borderLeft: "5px solid #3498db"
    },
    hoveredCard: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)"
    },
    cardTitle: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "0.75rem"
    },
    cardText: {
      color: "#34495e",
      lineHeight: "1.6"
    },
    contentBlock: {
      margin: "0 auto 3rem auto",
      maxWidth: "1000px",
      textAlign: "center"
    },
    listGroup: {
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
    },
    listItem: {
      border: "none",
      padding: "0.75rem 1.25rem",
      fontSize: "1rem"
    },
    primaryButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "0.75rem 2rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      fontSize: "1.1rem",
      marginTop: "1rem"
    },
    secondaryButton: {
      backgroundColor: "#17a2b8",
      color: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer"
    },
    icon: {
      fontSize: "1.5rem",
      marginRight: "0.5rem",
      verticalAlign: "middle"
    }
  };

  return (
    <div style={styles.container}>
      {/* Custom styles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
        }
        .btn-hover-effect:active {
          transform: translateY(0);
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>About <span style={styles.highlight}>KnowStack</span></h1>
        <p style={styles.subtitle}>Your intelligent query management companion – organized, collaborative, and powerful.</p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div 
                style={{
                  ...styles.card,
                  ...(hoveredCard === 1 ? styles.hoveredCard : {})
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={styles.cardTitle}>
                  <i className="fas fa-brain" style={styles.icon}></i>
                  Smart Handling
                </h3>
                <p style={styles.cardText}>
                  Automatically categorize and prioritize user queries using AI-assisted logic with our advanced algorithms.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div 
                style={{
                  ...styles.card,
                  ...(hoveredCard === 2 ? styles.hoveredCard : {})
                }}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={styles.cardTitle}>
                  <i className="fas fa-users" style={styles.icon}></i>
                  Collaborative
                </h3>
                <p style={styles.cardText}>
                  Team members can tag, reply, and solve queries with complete transparency and accountability.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div 
                style={{
                  ...styles.card,
                  ...(hoveredCard === 3 ? styles.hoveredCard : {})
                }}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={styles.cardTitle}>
                  <i className="fas fa-chart-line" style={styles.icon}></i>
                  Insightful
                </h3>
                <p style={styles.cardText}>
                  Comprehensive dashboard and analytics to monitor performance, identify bottlenecks, and track resolution rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.contentBlock}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.cardText}>
          At <span style={styles.highlight}>KnowStack</span>, we aim to revolutionize how teams and users interact by transforming
          chaotic query threads into a structured, intuitive, and measurable support ecosystem that drives efficiency.
        </p>
      </div>

     <div style={{ ...styles.contentBlock, background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)", borderRadius: "15px", padding: "2rem" }}>
  <h2 style={{ ...styles.sectionTitle, color: "#00796b" }}>Why Choose KnowStack?</h2>
  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    {[
      "Centralized query management system",
      "Secure user access with role-based permissions",
      "Real-time integrated notifications",
      "Intuitive interface with responsive design",
      "Comprehensive reporting and analytics"
    ].map((text, index) => (
      <li
        key={index}
        style={{
          ...styles.listItem,
          backgroundColor: "#ffffff",
          marginBottom: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          padding: "1rem 1.5rem",
          transition: "transform 0.2s ease",
          cursor: "default"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        <i className="fas fa-check-circle text-success me-2" style={{ fontSize: "1.2rem", marginRight: "0.75rem" }}></i>
        <span style={{ fontSize: "1.05rem", color: "#2e7d32" }}>{text}</span>
      </li>
    ))}
  </ul>
</div>


      <div style={{...styles.contentBlock, padding: '3rem 0'}}>
        <h2 style={styles.sectionTitle}>Join the Stack Revolution <i className="fas fa-rocket"></i></h2>
        <p style={{...styles.cardText, marginBottom: '2rem'}}>
          Whether you're a startup or an enterprise, <strong>KnowStack</strong> is your go-to solution for efficient query organization and management.
        </p>
        <button 
          onClick={() => navigate('/register')} 
          style={styles.primaryButton}
          className="btn-hover-effect"
        >
          <i className="fas fa-user-plus me-2"></i> Get Started Now
        </button>
      </div>
    </div>
  );
};

export default About;