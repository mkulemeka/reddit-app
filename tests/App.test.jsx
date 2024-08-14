import {render, screen} from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
    it('renders App', () => {
        render(<App />);
        screen.debug();
    })
})