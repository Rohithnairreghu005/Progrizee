import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './button';

afterEach(cleanup);

describe('Button', () => {
  it('renders an accessible button with its label', () => {
    render(<Button>Apply</Button>);
    expect(screen.getByRole('button', { name: 'Apply' })).toBeTruthy();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  it('respects an explicit type and disabled state', () => {
    render(
      <Button type="submit" disabled>
        Send
      </Button>,
    );
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.type).toBe('submit');
    expect(button.disabled).toBe(true);
  });
});
