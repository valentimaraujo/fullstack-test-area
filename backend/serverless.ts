import type { AWS } from '@serverless/typescript';

import cognitoResourses from './config/cognito-resourses'
import dynamodbTables from './config/dynamodb-tables'

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'test-area-project',
  frameworkVersion: '2',

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  package: {
    individually: true,
    excludeDevDependencies: true,
    exclude: ['.git/**', '.vscode/**', '.idea/**'],
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: {
      ...cognitoResourses,
      ...dynamodbTables
    }
  }
};

module.exports = serverlessConfiguration;
