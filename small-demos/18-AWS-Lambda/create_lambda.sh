#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws lambda create-function \
  --profile arco-ppham \
  --function-name LambdaFunctionOverHttps \
  --zip-file fileb://function.zip \
  --handler LambdaFunctionOverHttps.lambda_handler \
  --runtime python3.12 \
  --role arn:aws:iam::029061586525:role/lambda-apigateway-role
