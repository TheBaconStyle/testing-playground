const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { IgnorePlugin } = require('webpack');

const lazyImports = [
  '@fastify/static',
  '@fastify/view',
  '@nestjs/microservices',
  '@nestjs/websockets',
  'class-transformer',
  'class-validator',
];

// @reference https://tech-blog.s-yoshiki.com/entry/297
module.exports = {
  // CUSTOMIZE HERE
  entry: {
    server: './src/main.ts',
    migrator: './src/migrator.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFormat: false,
  },
  optimization: {
    minimize: false,
  },
  // JUST KEEP THEM
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '.env',
          to: '[name][ext]',
        },
        {
          from: 'package.json',
          to: '[name][ext]',
        },
        // {
        //   from: "node_modules/**/.prisma/client/*.node",
        //   to: () => Promise.resolve("[path][name][ext]"),
        //   globOptions: {
        //     dot: true,
        // },
      ],
    }),
    new WriteFilePlugin(),
    new IgnorePlugin({
      checkResource: (resource) => {
        if (lazyImports.some((modulo) => resource.startsWith(modulo))) {
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
        }
        return false;
      },
    }),
  ],
};
