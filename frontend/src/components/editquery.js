import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditQuery = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:5000/query/getAllQueryById", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const queryToEdit = data.find((q) => q.id === parseInt(id));
        if (queryToEdit) {
          setQuestion(queryToEdit.question);
        } else {
          setError("Query not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch query.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
   console.log(question);
    try {
      const res = await fetch(`http://127.0.0.1:5000/query/editQuery/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update query.");
      }

      setSuccess("Query updated successfully!");
      setTimeout(() => navigate("/myqueries"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Inline styles for the component
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "3rem auto",
      padding: "2rem",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#2c3e50",
      position: "relative",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#7f8c8d",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    textarea: {
      width: "100%",
      padding: "1rem",
      borderRadius: "12px",
      border: "1px solid #dfe6e9",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      minHeight: "200px",
      resize: "vertical",
    },
    textareaFocus: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.2)",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "50px",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    primaryButton: {
      backgroundColor: "#3498db",
      color: "white",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    buttonActive: {
      transform: "translateY(0)",
    },
    loadingButton: {
      backgroundColor: "#bdc3c7",
      cursor: "not-allowed",
    },
    errorAlert: {
      backgroundColor: "#fdecea",
      color: "#d32f2f",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem",
      borderLeft: "4px solid #d32f2f",
    },
    successAlert: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem",
      borderLeft: "4px solid #2e7d32",
    },
    backButton: {
      position: "absolute",
      left: "0",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#3498db",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container} className="animate__animated animate__fadeIn">
      <div style={styles.header}>
        <button 
          style={styles.backButton}
          onClick={() => navigate(-1)}
          title="Go back"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 style={styles.title}>
          <i className="fas fa-edit me-2"></i>Edit Your Query
        </h2>
        <p style={styles.subtitle}>Refine your question to get better answers</p>
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      {success && (
        <div style={styles.successAlert}>
          <i className="fas fa-check-circle me-2"></i>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={styles.textarea}
            className="focus-style"
            required
            placeholder="Type your updated question here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...styles.primaryButton,
            ...(loading ? styles.loadingButton : {}),
          }}
          className="btn-hover-effect"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Updating...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i> Update Query
            </>
          )}
        </button>
      </form>

      {/* Scoped CSS for the component */}
      <style>{`
        .btn-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
        }
        .btn-hover-effect:active {
          transform: translateY(0);
        }
        .focus-style:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          outline: none;
        }
        .animate__animated {
          animation-duration: 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate__fadeIn {
          animation-name: fadeIn;
        }
      `}</style>
    </div>
  );
};

export default EditQuery;