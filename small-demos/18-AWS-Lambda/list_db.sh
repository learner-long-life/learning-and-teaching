#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws dynamodb list-tables \
  --profile arco-ppham
