#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

aws dynamodb get-item --consistent-read \
    --table-name Music  \
    --key \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}}' \
  --profile arco-ppham
