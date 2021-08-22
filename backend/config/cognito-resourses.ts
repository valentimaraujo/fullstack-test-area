export default {
  cognitoUserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UsernameAttributes: ['email'],
      UserPoolName: 'fullstackTestArea-${self:provider.stage}'
    }
  },
  cognitoUserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'fullstackTestAreaUserPoolClient-${self:provider.stage}',
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAdminUserGroup: {
    Type: 'AWS::Cognito::UserPoolGroup',
    Properties: {
      Description: 'Only AdminUser users can belong to this group',
      GroupName: 'AdminUser-${self:provider.stage}',
      Precedence: 0,
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAppDriverGroup: {
    Type: 'AWS::Cognito::UserPoolGroup',
    Properties: {
      Description: 'Only AppDriver users can belong to this group',
      GroupName: 'AppDriver-${self:provider.stage}',
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
      GroupName: 'AppUser-${self:provider.stage}',
      Precedence: 2,
      UserPoolId: {
        Ref: 'cognitoUserPool'
      }
    }
  },
  cognitoAdminUserIAMRole: {
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
          PolicyName: 'fullstackTestAreaAdminUserPolicy-${self:provider.stage}',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Action: [
                  'dynamodb:*',
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
      RoleName: 'fullstackTestAreaAdminUserRole-${self:provider.stage}'
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
          PolicyName: 'fullstackTestAreaAppDriverPolicy-${self:provider.stage}',
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
      RoleName: 'fullstackTestAreaAppDriverRole-${self:provider.stage}'
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
          PolicyName: 'fullstackTestAreaAppUserPolicy-${self:provider.stage}',
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
      RoleName: 'fullstackTestAreaAppUserRole-${self:provider.stage}'
    }
  }
}