#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws apigatewayv2 create-stage \
  --profile arco-ppham \
  --api-id yu5ta9sb36 \
  --stage-name stage

aws apigatewayv2 create-deployment \
  --profile arco-ppham \
  --api-id yu5ta9sb36 \
  --stage-name stage
