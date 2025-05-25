import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  width: 100%;
  max-width: 650px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    border-radius: 0 0 20px 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    border-radius: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 1.1rem;
  resize: none;
  min-height: 200px;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  line-height: 1.6;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.02);
    outline: none;
  }

  &::placeholder {
    color: #94a3b8;
    font-style: italic;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.85rem;
  color: ${props => props.length > 480 ? "#ef4444" : "#64748b"};
  background: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  background: ${props => 
    props.disabled ? "#cbd5e1" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"};
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: all 0.6s ease;
    z-index: -1;
  }

  &:hover::before {
    transform: ${props => props.disabled ? "translateX(-100%)" : "translateX(100%)"};
  }

  &:hover {
    transform: ${props => props.disabled ? "none" : "translateY(-3px)"};
    box-shadow: ${props => 
      props.disabled ? "0 4px 15px rgba(59, 130, 246, 0.3)" : "0 10px 25px rgba(59, 130, 246, 0.4)"};
  }

  &:active {
    transform: ${props => props.disabled ? "none" : "translateY(1px)"};
  }
`;

const Spinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const FloatingHelp = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 2s infinite;
  }

  i {
    color: #3b82f6;
    font-size: 1.2rem;
  }
`;

const PostQuery = () => {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const showSuccessToast = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Query Posted Successfully!",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      background: "#f0fdf4",
      iconColor: "#10b981",
      timerProgressBar: true,
      showClass: { popup: "animate__animated animate__fadeInRight" },
      hideClass: { popup: "animate__animated animate__fadeOutRight" }
    });
  };

  const showErrorToast = (error) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error || "Failed to post query",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      background: "#fef2f2",
      iconColor: "#ef4444",
      timerProgressBar: true,
      showClass: { popup: "animate__animated animate__fadeInRight" },
      hideClass: { popup: "animate__animated animate__fadeOutRight" }
    });
  };

  const showHelpTooltip = () => {
    Swal.fire({
      title: 'Tips for a Great Question',
      html: `
        <div style="text-align: left;">
          <p><strong>1. Be specific</strong> - Clearly describe your problem</p>
          <p><strong>2. Provide context</strong> - What have you tried already?</p>
          <p><strong>3. Include details</strong> - Relevant code, error messages, etc.</p>
          <p><strong>4. Keep it concise</strong> - But include all necessary information</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#3b82f6',
      background: '#ffffff',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(question);
    try {
      const response = await fetch("http://127.0.0.1:5000/query/postQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to post query");

      showSuccessToast();
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      showErrorToast(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card>
        <FloatingHelp onClick={showHelpTooltip}>
          <i className="fas fa-question"></i>
        </FloatingHelp>
        
        <Title>Post a New Query</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <TextArea
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your detailed question here... Try to be as clear and specific as possible!"
              required
              maxLength={500}
            />
            <Counter length={question.length}>
              {question.length}/500
            </Counter>
          </FormGroup>
          <Button
            type="submit"
            disabled={isSubmitting || !question.trim()}
          >
            {isSubmitting ? (
              <>
                <Spinner /> Posting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Post Your Question
              </>
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default PostQuery;