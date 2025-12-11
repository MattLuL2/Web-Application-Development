import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';

describe('Profile Component', () => {
  test('shows not logged in message when user is null', () => {
    render(<Profile user={null} />);
    expect(screen.getByText(/Not logged in/i)).toBeInTheDocument();
  });

  test('displays user information when user is provided', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    };

    render(<Profile user={mockUser} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/user/i)).toBeInTheDocument();
  });
});
