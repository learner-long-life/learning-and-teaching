#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws lambda create-function-url-config \
    --profile arco-ppham \
    --function-name LambdaFunctionOverHttps \
    --auth-type AWS_IAM 
