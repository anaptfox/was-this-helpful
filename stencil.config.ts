import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';
import { reactOutputTarget } from '@stencil/react-output-target';


export const config: Config = {
  namespace: 'was-this-helpful',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    reactOutputTarget({
      componentCorePackage: 'was-this-helpful',
      proxiesFile: '../was-this-helpful-react/src/components.ts'
    }),
  ],
  plugins: [inlineSvg()],
};
