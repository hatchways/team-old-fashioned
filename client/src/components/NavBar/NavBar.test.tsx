import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { mockLoggedInUser } from '../../mocks/mockUser';

describe('NavBar tests', () => {
  test('smoke test', () => {
    render(<NavBar loggedInUser={mockLoggedInUser} />);
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(<NavBar loggedInUser={mockLoggedInUser} />);
    expect(asFragment).toMatchSnapshot();
  });
});
