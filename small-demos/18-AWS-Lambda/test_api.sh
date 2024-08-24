#!/usr/bin/env sh

# Change the --profile flag below to match the account profile 
# with access key and secret in your ~/.aws/credentials file

curl \
  -X "GET" \
  -H "Content-Type: application/json" \
  -d '{ "operation": "create", "payload": { "Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "1"}}}' \
  https://yu5ta9sb36.execute-api.us-west-2.amazonaws.com/
