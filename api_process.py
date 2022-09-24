#!/usr/bin/env python3

# Takes the raw GitHub API response from
# https://api.github.com/orgs/LinkedIn/repos?page=1&per_page=100
# and produces a new file with only the keys (and associated values) that are
# used for building the website.
#
# usage: python api_process.py

import json
import urllib.request
from datetime import datetime

REQUIRED_KEYS = {
    'description',
    'fork',
    'forks',
    'html_url',
    'language',
    'name',
    'size',
    'watchers_count',
}

GITHUB_LINKEDIN_REPO_URL = 'https://api.github.com/orgs/LinkedIn/repos?page=1&per_page=100'
with urllib.request.urlopen(GITHUB_LINKEDIN_REPO_URL) as response:
    gh_data = json.loads(response.read().decode('utf-8'))

filtered_repos = list()

for repo in gh_data:
    filtered_repo = dict()
    # Skip forked repos, as they are not directly owned by LinkedIn
    if repo.get('fork', False):
        continue
    for k, v in repo.items():
        if k in REQUIRED_KEYS:
            filtered_repo[k] = v
    filtered_repos.append(filtered_repo)

# Write the data out in the desired format.
with open('js/cached-github-api-response.js', 'w+') as f:
    f.write(f'// Generated from {GITHUB_LINKEDIN_REPO_URL} on {datetime.utcnow().replace(microsecond=0).isoformat()}\n')
    f.write('var cachedGithubApiResponse = ')
    json.dump(filtered_repos, f)
