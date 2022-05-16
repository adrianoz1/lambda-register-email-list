import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'lambda-register-email-list',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"]
      },
    ]
  },
  functions: { 
    registerEmail: {
      handler: "src/functions/registerEmail.handler",
      events: [
        {
          http: {
            path: "registerEmail",
            method: "post",
            cors: {
              origins: [
                "https://*.adrianoalmeida.dev",
                "https://*.2dev.com.br"
              ],
              headers: [
                'Content-Type',
                'X-Amz-Date',
                'Authorization',
                'X-Api-Key',
                'X-Amz-Security-Token',
                'X-Amz-User-Agent',
              ]
            },
          }
        }
      ]
    }
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ["chrome-aws-lambda"]
    },
    dynamodb: {
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      }
    }
  },
  resources: {
    Resources: {
      dbEmailList: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "email-list",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH"
            }
          ],
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
