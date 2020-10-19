request-presigned-url

{
  url: 'https://s3.ap-northeast-2.amazonaws.com/your-bucket',
  fields: {
    key: 'test/d9409646-7201-4db9-a611-006230bd1dc2',
    bucket: 'your-bucket',
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': 'X-Amz-Credential',
    'X-Amz-Date': '20200901T091643Z',
    'X-Amz-Security-Token': 'X-Amz-Security-Toke',
    Policy: 'Policy',
    'X-Amz-Signature': '3e39fd7a2d9c88d95eab5d0b6d234f31f348ecb148badec1059215bd534ffb50'
  }
}