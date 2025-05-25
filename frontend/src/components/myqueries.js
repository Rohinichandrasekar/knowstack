import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();


  const [token, setToken] = useState(null);

 useEffect(() => {
  const initialize = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      setError("Please login to view your queries.");
      return;
    }

    setToken(storedToken);
    console.log(storedToken);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:5000/query/getAllQueryById", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch your queries");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Received invalid data format from server");
      }

      setQueries(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  initialize();
}, []);


  const deleteQuery = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this query?");
      if (!confirmDelete) return;

      const response = await fetch(`http://127.0.0.1:5000/query/deleteQuery/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete query");
      }

      setQueries(queries.filter(query => query.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete query");
    }
  };

  const handleEdit = (id) => navigate(`/editquery/${id}`);
  const handlePostQuery = () => navigate("/postquery");

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    queryCard: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "1.5rem",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      marginBottom: "1.5rem",
      borderLeft: "5px solid #3498db",
    },
    hoveredCard: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
    },
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
    editButton: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      cursor: "pointer",
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
    errorState: {
      textAlign: "center",
      padding: "3rem",
      backgroundColor: "#fff8f8",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    errorText: {
      fontSize: "1.2rem",
      color: "#dc3545",
      marginBottom: "1.5rem",
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
    userInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Queries</h1>
        <div style={styles.buttonGroup}>
          <button
            onClick={handlePostQuery}
            style={styles.primaryButton}
            className="btn-hover-effect"
          >
            <i className="fas fa-plus-circle me-2"></i> Post New Query
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={styles.secondaryButton}
            className="btn-hover-effect"
          >
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={styles.loadingText}>Loading your queries...</p>
        </div>
      ) : error ? (
        <div style={styles.errorState}>
          <i className="fas fa-exclamation-triangle fa-4x mb-3" style={{color: "#dc3545"}}></i>
          <p style={styles.errorText}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={styles.secondaryButton}
            className="btn-hover-effect"
          >
            <i className="fas fa-sync-alt me-2"></i> Try Again
          </button>
        </div>
      ) : queries.length === 0 ? (
        <div style={styles.emptyState}>
          <i className="far fa-question-circle fa-4x mb-3" style={{color: "#bdc3c7"}}></i>
          <p style={styles.emptyStateText}>You haven't posted any queries yet.</p>
          <button
            onClick={handlePostQuery}
            style={styles.primaryButton}
            className="btn-hover-effect"
          >
            <i className="fas fa-plus-circle me-2"></i> Post Your First Query
          </button>
        </div>
      ) : (
        <div className="row">
          {queries.map((query) => (
            <div className="col-md-12 mb-4" key={query.id}>
              <div 
                style={{
                  ...styles.queryCard,
                  ...(hoveredCard === query.id ? styles.hoveredCard : {})
                }}
                onMouseEnter={() => setHoveredCard(query.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>
                    {query.username_post?.charAt(0).toUpperCase() || "Y"}
                  </div>
                  <span style={{ fontWeight: 600 }}>
                    {query.username_post || "You"}
                  </span>
                </div>

                <h2 style={styles.question}>
                  <i className="fas fa-question-circle me-2 text-primary"></i>
                  {query.question}
                </h2>
                
                <p style={styles.metaInfo}>
                  <i className="far fa-clock me-1"></i> Posted on: {formatDate(query.created_at)}
                </p>
                
                {query.answer ? (
                  <div style={styles.answerSection}>
                    <p style={styles.answerText}>
                      <i className="fas fa-check-circle me-2 text-success"></i>
                      <strong>Answer:</strong>
                    </p>
                    <p className="mb-2">{query.answer}</p>
                    {query.username_response && (
                      <p style={styles.metaInfo}>
                        <i className="fas fa-user-tie me-1"></i> Answered by: {query.username_response}
                      </p>
                    )}
                    {query.solved_at && (
                      <p style={styles.metaInfo}>
                        <i className="fas fa-calendar-check me-1"></i> Solved on: {formatDate(query.solved_at)}
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={styles.noAnswer}>
                    <i className="far fa-clock me-2"></i> Waiting for response...
                  </p>
                )}
                
                <div style={styles.actionButtons}>
                  <button
                    onClick={() => handleEdit(query.id)}
                    style={styles.editButton}
                    className="btn-hover-effect"
                  >
                    <i className="fas fa-edit me-2"></i> Edit
                  </button>
                  <button
                    onClick={() => deleteQuery(query.id)}
                    style={styles.deleteButton}
                    className="btn-hover-effect"
                  >
                    <i className="fas fa-trash-alt me-2"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
        }
        .btn-hover-effect:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default MyQueries;