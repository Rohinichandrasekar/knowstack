import React, { useState, useEffect } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import styled, { keyframes, css } from "styled-components";


// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const NavContainer = styled.nav`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: "💡";
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-around;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${({ $active }) => $active && css`
    font-weight: 600;
    &::after {
      width: 100%;
      background-color: #f59e0b;
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

const AuthButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;
  font-weight: 500;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  transform-origin: top right;
  transform: scale(0);
  opacity: 0;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  ${({ $open }) => $open && css`
    transform: scale(1);
    opacity: 1;
  `}
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }

  & + & {
    border-top: 1px solid #f3f4f6;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        name: "User",
      });
    }
    
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <>
      <NavContainer>
        <Logo as={Link} to="/">KnowStack</Logo>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </MobileMenuButton>

        <NavLinks style={{ display: mobileMenuOpen ? 'flex' : 'flex' }}>
          <NavLink 
            to="/" 
            $active={location.pathname === "/"}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            $active={location.pathname === "/about"}
          >
            About
          </NavLink>
          
          {user ? (
            <UserDropdown>
              <DropdownToggle onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span>{user.name}</span>
                <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
              </DropdownToggle>
              
              <DropdownMenu $open={dropdownOpen}>
                <DropdownItem to="/dashboard">
                  <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                </DropdownItem>
                <DropdownItem to="/myqueries">
                  <i className="fas fa-list mr-2"></i> My Queries
                </DropdownItem>
                <DropdownItem 
                  as="button" 
                  onClick={handleLogout}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </DropdownItem>
              </DropdownMenu>
            </UserDropdown>
          ) : (
            <AuthButton to="/login">
              <i className="fas fa-sign-in-alt mr-2"></i> Login/Register
            </AuthButton>
          )}
        </NavLinks>
      </NavContainer>

      {/* Add some space below the fixed navbar */}
      <div style={{ height: '70px' }}></div>
    </>
  );
};

export default Navbar;