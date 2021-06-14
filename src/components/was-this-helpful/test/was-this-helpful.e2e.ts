import { newE2EPage } from '@stencil/core/testing';

describe('was-this-helpful', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<was-this-helpful></was-this-helpful>');

    const element = await page.find('was-this-helpful');
    expect(element).toHaveClass('hydrated');
  });
});
