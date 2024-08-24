#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws lambda list-function-url-configs \
  --profile arco-ppham \
  --function-name LambdaFunctionOverHttps
