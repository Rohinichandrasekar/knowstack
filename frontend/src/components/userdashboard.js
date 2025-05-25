import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/query/getAllQuery", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setQueries(data);
        
        // Extract user data
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.username) {
          setUsername(userData.username);
        }
      } catch (err) {
        console.error("Error fetching queries:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [token]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/query/solve/${currentQueryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer }),
      });

      if (response.ok) {
        const updatedQueries = queries.map((query) =>
          query.id === currentQueryId
            ? { ...query, answer, solved_at: new Date().toISOString(), username_response: "You" }
            : query
        );
        setQueries(updatedQueries);
        setShowAnswerModal(false);
        setAnswer("");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit answer: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openAnswerModal = (queryId) => {
    setCurrentQueryId(queryId);
    setShowAnswerModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Inline styles with fixed queryCard function
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "0 15px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#2c3e50",
      margin: 0,
    },
    subtitle: {
      color: "#7f8c8d",
      fontSize: "1.1rem",
      marginTop: "0.5rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    primaryButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
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
      cursor: "pointer",
    },
    // Fixed: making queryCard a function that returns an object
    queryCard: (solved) => ({
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "1.5rem",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      marginBottom: "1.5rem",
      borderLeft: solved ? "5px solid #28a745" : "5px solid #3498db",
    }),
    hoveredCard: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    statusBadge: (solved) => ({
      fontSize: "0.85rem",
      fontWeight: "600",
      padding: "0.3rem 1rem",
      borderRadius: "50px",
      backgroundColor: solved ? "#d4edda" : "#cce5ff",
      color: solved ? "#155724" : "#004085",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    }),
    statusIndicator: (solved) => ({
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: solved ? "#28a745" : "#007bff",
      marginRight: "5px",
    }),
    question: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "0.75rem",
    },
    metaInfo: {
      fontSize: "0.9rem",
      color: "#7f8c8d",
      marginBottom: "1rem",
    },
    answerSection: {
      backgroundColor: "#f8f9fa",
      padding: "1rem",
      borderRadius: "10px",
      marginTop: "1rem",
    },
    answerText: {
      color: "#27ae60",
      fontWeight: "500",
    },
    noAnswer: {
      color: "#f39c12",
      fontStyle: "italic",
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    answerButton: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      cursor: "pointer",
      width: "100%",
    },
    loadingText: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#7f8c8d",
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    emptyStateText: {
      fontSize: "1.2rem",
      color: "#7f8c8d",
      marginBottom: "1.5rem",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    userAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#3498db",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "0.9rem",
      marginRight: "0.5rem",
    },
    userName: {
      fontWeight: "600",
      color: "#2c3e50",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(5px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1050,
      padding: "1rem",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
      maxWidth: "600px",
      width: "100%",
      overflow: "hidden",
    },
    modalHeader: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "1rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalBody: {
      padding: "1.5rem",
    },
    modalTitle: {
      margin: 0,
      fontWeight: "600",
      fontSize: "1.25rem",
    },
    closeButton: {
      background: "transparent",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    textArea: {
      borderRadius: "10px",
      border: "1px solid #e2e8f0",
      padding: "1rem",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      minHeight: "180px",
      width: "100%",
      resize: "none",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      padding: "1rem 1.5rem",
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    submitButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "1rem",
      height: "1rem",
      borderRadius: "50%",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTopColor: "white",
      animation: "spin 1s linear infinite",
      marginRight: "0.5rem",
    },
    floatingActionButton: {
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      boxShadow: "0 6px 20px rgba(40, 167, 69, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: 100,
      fontSize: "1.5rem",
    },
  };

  return (
    <div className="dashboard-container">
      {/* Bootstrap CDN is assumed to be included in your public/index.html */}

      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Welcome back, {username}!</h1>
            <p style={styles.subtitle}>
              Engage with the community by answering queries or posting your own questions
            </p>
          </div>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => navigate("/postquery")}
              style={styles.primaryButton}
              className="btn-hover-effect"
            >
              <i className="fas fa-plus-circle me-2"></i> Post New Query
            </button>
            <button
              onClick={() => navigate("/myqueries")}
              style={styles.secondaryButton}
              className="btn-hover-effect"
            >
              <i className="fas fa-list me-2"></i> My Queries
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={styles.loadingText}>Loading queries...</p>
          </div>
        ) : queries.length === 0 ? (
          <div style={styles.emptyState}>
            <i className="far fa-question-circle fa-4x mb-3" style={{color: "#bdc3c7"}}></i>
            <p style={styles.emptyStateText}>No queries found. Be the first to start a discussion!</p>
            <button
              onClick={() => navigate("/postquery")}
              style={styles.primaryButton}
              className="btn-hover-effect"
            >
              <i className="fas fa-plus-circle me-2"></i> Post Your First Query
            </button>
          </div>
        ) : (
          <div className="row">
            {queries.map((query) => (
              <div className="col-md-6 col-lg-4 mb-4" key={query.id}>
                <div 
                  style={{
                    ...styles.queryCard(!!query.solved_at),
                    ...(hoveredCard === query.id ? styles.hoveredCard : {})
                  }}
                  onMouseEnter={() => setHoveredCard(query.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.statusBadge(!!query.solved_at)}>
                      <span style={styles.statusIndicator(!!query.solved_at)}></span>
                      {query.solved_at ? "Solved" : "Open"}
                    </div>
                    <div style={styles.metaInfo}>
                      <i className="far fa-clock me-1"></i> {formatDate(query.created_at)}
                    </div>
                  </div>
                  
                  <div style={styles.userInfo}>
                    <div style={styles.userAvatar}>
                      {query.username_post ? query.username_post.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span style={styles.userName}>{query.username_post || "Unknown User"}</span>
                  </div>
                  
                  <h2 style={styles.question}>
                    <i className="fas fa-question-circle me-2 text-primary"></i>
                    {query.question}
                  </h2>
                  
                  {query.answer ? (
                    <div style={styles.answerSection}>
                      <p style={styles.answerText}>
                        <i className="fas fa-check-circle me-2 text-success"></i>
                        <strong>Answer:</strong>
                      </p>
                      <p className="mb-2">{query.answer}</p>
                      <p style={styles.metaInfo}>
                        <i className="fas fa-user-tie me-1"></i> Responded by: <strong>{query.username_response}</strong>
                      </p>
                    </div>
                  ) : (
                    <p style={styles.noAnswer}>
                      <i className="far fa-clock me-2"></i> Waiting for response...
                    </p>
                  )}
                  
                  {!query.solved_at && (
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => openAnswerModal(query.id)}
                        style={styles.answerButton}
                        className="btn-hover-effect"
                      >
                        <i className="fas fa-reply me-2"></i> Answer This
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Answer Modal */}
        {showAnswerModal && (
          <div style={styles.modalOverlay} onClick={() => !submitting && setShowAnswerModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h5 style={styles.modalTitle}>
                  <i className="fas fa-reply me-2"></i> Submit Your Answer
                </h5>
                <button 
                  onClick={() => !submitting && setShowAnswerModal(false)} 
                  style={styles.closeButton}
                  disabled={submitting}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div style={styles.modalBody}>
                <form onSubmit={handleAnswerSubmit}>
                  <div className="mb-4">
                    <label htmlFor="answerText" className="form-label text-muted mb-2">
                      Your detailed answer
                    </label>
                    <textarea
                      id="answerText"
                      style={styles.textArea}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                      placeholder="Type your detailed answer here... Try to be as clear and helpful as possible!"
                    ></textarea>
                  </div>
                  <div style={styles.modalFooter}>
                    <button 
                      type="button" 
                      style={styles.cancelButton} 
                      onClick={() => setShowAnswerModal(false)}
                      disabled={submitting}
                      className="btn-hover-effect"
                    >
                      <i className="fas fa-times me-1"></i> Cancel
                    </button>
                    <button 
                      type="submit" 
                      style={styles.submitButton} 
                      disabled={submitting || !answer.trim()}
                      className="btn-hover-effect"
                    >
                      {submitting ? (
                        <>
                          <div style={styles.loadingSpinner}></div> Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-1"></i> Submit Answer
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <button 
          style={styles.floatingActionButton}
          onClick={() => navigate("/postquery")}
          className="btn-hover-effect"
        >
          <i className="fas fa-plus"></i>
        </button>

        {/* Add the same custom hover effects as in MyQueries */}
        <style>{`
          .btn-hover-effect:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
          }
          .btn-hover-effect:active {
            transform: translateY(0);
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default UserDashboard;