import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

describe('Navbar Component', () => {
  test('renders navigation links', () => {
    const mockAuthContext = {
      user: null,
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
  });

  test('shows sign up and sign in when not logged in', () => {
    const mockAuthContext = {
      user: null,
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('shows users, profile, and sign out when logged in', () => {
    const mockAuthContext = {
      user: { id: '123', name: 'Test User', email: 'test@example.com', role: 'user' },
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test('calls signout when sign out button is clicked', () => {
    const mockSignout = jest.fn();
    const mockAuthContext = {
      user: { id: '123', name: 'Test User', email: 'test@example.com', role: 'user' },
      signup: jest.fn(),
      signin: jest.fn(),
      signout: mockSignout
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const signoutButton = screen.getByText(/Sign Out/i);
    fireEvent.click(signoutButton);
    expect(mockSignout).toHaveBeenCalled();
  });
});
