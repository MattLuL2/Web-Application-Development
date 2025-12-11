import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthContext } from '../context/AuthContext';

describe('Home Component', () => {
  test('renders site title', () => {
    const mockAuthContext = {
      user: null,
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Book Management App/i)).toBeInTheDocument();
  });

  test('shows sign up and sign in links when not logged in', () => {
    const mockAuthContext = {
      user: null,
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('hides auth links when logged in', () => {
    const mockAuthContext = {
      user: { id: '123', name: 'Test User', email: 'test@example.com', role: 'user' },
      signup: jest.fn(),
      signin: jest.fn(),
      signout: jest.fn()
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });
});
