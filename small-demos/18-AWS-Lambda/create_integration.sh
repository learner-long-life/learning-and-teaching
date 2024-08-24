#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws apigatewayv2 create-integration \
  --profile arco-ppham \
  --api-id yu5ta9sb36 \
  --integration-type "AWS_PROXY" \
  --integration-uri "arn:aws:lambda:us-east-1:029061586525:function:LambdaFunctionOverHttps" \
  --payload-format-version 2.0
  # https://jngkkyegfdjgt2x3dopgn2xq2y0uuzud.lambda-url.us-west-2.on.aws/" \

