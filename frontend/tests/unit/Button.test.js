/**
 * Button Component Unit Tests
 * 
 * @jest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    const icon = <span data-testid="icon">Icon</span>;
    render(<Button text="Button" icon={icon} />);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies correct type class', () => {
    const { container } = render(<Button text="Login" type="Login" />);
    const button = container.querySelector('.Button_Login');
    expect(button).toBeInTheDocument();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button text="Button" onClick={handleClick} disabled />);
    
    const button = screen.getByText('Button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});

