#! /usr/bin/env python

# Takes the raw GitHub API response from 
# https://api.github.com/orgs/LinkedIn/repos?page=1&per_page=100
# and produces a new file with only the keys (and associated values) that are 
# used for building the website.
#
# usage: python api_process.py <file with raw API response>

import json
import sys

api_response_file = sys.argv[1]

with open(api_response_file, "r") as f:
  gh_data = json.load(f)

required_keys = set(["language", "name", "size", "forks", "watchers_count", \
  "description", "html_url"])

filtered_repos = list()

for repo in gh_data:
  filtered_repo = dict()
  for k, v in repo.iteritems():
    if k in required_keys:
      filtered_repo[k] = v
  filtered_repos.append(filtered_repo)

with open("github-api-response.js", "w+") as f:
  json.dump(filtered_repos, f)