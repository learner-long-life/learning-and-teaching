#!/usr/bin/env sh

set -x
# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws dynamodb create-table \
  --profile arco-ppham \
  --table-name Music \
  --attribute-definitions \
      AttributeName=Artist,AttributeType=S \
      AttributeName=SongTitle,AttributeType=S \
  --key-schema \
      AttributeName=Artist,KeyType=HASH \
      AttributeName=SongTitle,KeyType=RANGE \
  --provisioned-throughput \
      ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --table-class STANDARD
