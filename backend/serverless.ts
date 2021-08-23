import type { AWS } from '@serverless/typescript';

import cognitoResourses from './config/cognito-resourses'
import dynamodbTables from './config/dynamodb-tables'

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'fullstack-test-area',
  frameworkVersion: '2',

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    appSync: {
      name: 'fullstackTestAreaAppSyncApi',
      authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      userPoolConfig: {
        awsRegion: '${self:provider.region}',
        defaultAction: 'ALLOW',
        userPoolId: {Ref : 'cognitoUserPool'}
      },
      mappingTemplatesLocation: 'mapping-templates',
      mappingTemplates: [
        {
          type: 'Query',
          field: 'getOrderById',
          dataSource: 'orderTable'
        },
        {
          type: 'Mutation',
          field: 'createOrder',
          dataSource: 'orderTable'
        }
      ],
      dataSources: [
          {
            type: 'AMAZON_DYNAMODB',
            name: 'orderTable',
            config: {
              tableName: {Ref: 'orderTable'}
            }
          }
        ]
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-appsync-plugin'
  ],
  package: {
    individually: true,
    excludeDevDependencies: true,
    exclude: ['.git/**', '.vscode/**', '.idea/**'],
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    stage: 'dev',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
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
