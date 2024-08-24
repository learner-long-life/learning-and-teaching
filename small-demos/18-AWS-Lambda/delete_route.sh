#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws apigatewayv2 delete-route \
  --profile arco-ppham \
  --api-id "yu5ta9sb36" \
  --route-id "wrx36ve"
