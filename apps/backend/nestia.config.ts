import { INestiaConfig } from '@nestia/sdk';

const NESTIA_CONFIG: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: '../../packages/sdk/src',
  swagger: {
    output: 'src/swagger/swagger.json',
    beautify: true,
    servers: [{ url: `http://localhost:5000` }],
  },
  primitive: true,
  simulate: true,
  assert: true,
  clone: true,
  propagate: true,
};

export default NESTIA_CONFIG;
