#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws lambda invoke \
  --profile arco-ppham \
  --function-name LambdaFunctionOverHttps \
  --payload file://input.txt outputfile.txt \
  --cli-binary-format raw-in-base64-out
