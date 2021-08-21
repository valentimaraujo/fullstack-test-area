export default {
  cognitoUserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UsernameAttributes: ['email'],
      UserPoolName: 'TestAreaProject'
    }
  },
  cognitoUserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'AppUser',
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAppDriverGroup: {
    Type: 'AWS::Cognito::UserPoolGroup',
    Properties: {
      Description: 'Only AppDriver users can belong to this group',
      GroupName: 'AppDriver',
      Precedence: 1,
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAppUserGroup: {
    Type: 'AWS::Cognito::UserPoolGroup',
    Properties: {
      Description: 'Only AppUser users can belong to this group',
      GroupName: 'AppUser',
      Precedence: 1,
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAppDriverIAMRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Federated: ['cognito-identify.amazonaws.com']
            },
            Action: ['sts:AssumeRoleWithWebIdentity']
          }
        ]
      },
      Policies: [
        {
          PolicyName: 'TestAreaProjectAppDriverPolicy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Action: [
                  'dynamodb:UpdateItem',
                  'dynamodb:PutItem',
                  'dynamodb:GetItem',
                  'dynamodb:Query',
                  'dynamodb:BatchGetItem',
                ],
                Resource: [
                  {
                    'Fn::GetAtt': 'orderTable.Arn'
                  }
                ]
              },
            ]
          }
        }
      ],
      RoleName: 'TestAreaProjectAppDriverRole'
    }
  },
  cognitoAppUserIAMRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Federated: ['cognito-identify.amazonaws.com']
            },
            Action: ['sts:AssumeRoleWithWebIdentity']
          }
        ]
      },
      Policies: [
        {
          PolicyName: 'TestAreaProjectAppUserPolicy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Action: [
                  'dynamodb:UpdateItem',
                  'dynamodb:PutItem',
                  'dynamodb:GetItem',
                  'dynamodb:Query',
                  'dynamodb:BatchGetItem',
                ],
                Resource: [
                  {
                    'Fn::GetAtt': 'orderTable.Arn'
                  }
                ]
              },
            ]
          }
        }
      ],
      RoleName: 'TestAreaProjectAppUserRole'
    }
  }
}