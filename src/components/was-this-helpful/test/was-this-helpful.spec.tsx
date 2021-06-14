import { newSpecPage } from '@stencil/core/testing';
import { WasThisHelpful } from '../was-this-helpful';

describe('was-this-helpful', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WasThisHelpful],
      html: `<was-this-helpful></was-this-helpful>`,
    });
    expect(page.root).toEqualHtml(`
      <was-this-helpful>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </was-this-helpful>
    `);
  });
});
