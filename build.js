const esbuild = require('esbuild');

const lambdas = [
  {
    entry: 'lambda/api-gateway-authorizer/handler.ts',
    out: 'dist/api-gateway-authorizer-lambda/api-gateway-authorizer.js',
  },
  { entry: "lambda/rds-lambda/handler.ts", out: "dist/rds-lambda/rds-lambda.js" }
];

lambdas.forEach((lambda) => {
  esbuild
    .build({
      entryPoints: [lambda.entry],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: lambda.out,
      sourcemap: true,
      minify: false,
      tsconfig: 'tsconfig.json',
    })
    .catch(() => process.exit(1));
});
