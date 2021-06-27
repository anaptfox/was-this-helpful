// jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    "transform": {
        "^.+\\.svg$": "jest-svg-transformer"
    }
};
export default config;
