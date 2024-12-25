import { INestiaConfig } from '@nestia/sdk';

const NESTIA_CONFIG: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: './src/sdk',
  swagger: {
    output: 'src/swagger/swagger.json',
    beautify: true,
    servers: [{ url: `http://localhost:5000` }],
  },
  distribute: '../../packages/sdk',
  primitive: true,
  simulate: true,
  assert: true,
  clone: true,
  propagate: true,
};

export default NESTIA_CONFIG;
