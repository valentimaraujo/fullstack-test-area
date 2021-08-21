export default {
  orderTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:service}-${self:provider.stage}-ORDER',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [{
        AttributeName: 'ORDER_ID',
        AttributeType: 'S'
      }],
      KeySchema: [{
        AttributeName: 'ORDER_ID',
        KeyType: 'HASH'
      }],
      Tags:[ {
        Key: 'name',
        Value: '${self:service}'
      }]
    }
  }
}