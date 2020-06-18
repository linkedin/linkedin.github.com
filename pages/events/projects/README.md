# Projects

A website that showcases projects! **If you want to use it and it's not exactly
fitting your purpose, please do make upstream changes. We expect this project
to be of use to others and we're happy to make it more generic so it's easier
to adapt to other organizations.**

(It'd be nice to have an organization YML or so e.g.)

## Purpose

This is designed for Open Source Events but can be used for other initiatives at the same
time. We use it for research theses, GSoC, GCI and maybe others in the future.

Why?

- For company aware about open source events and hackathons.

## Usage

To clone the repository and run this website on your local machine, type the following commands:

    $ git clone https://github.com/coala/projects.git
    $ cd projects
    $ python -m SimpleHTTPServer 8080


Then you can simply go to either of the following addresses in your browser to access the site:

    0.0.0.0:8080
    127.0.0.1:8080

## Defining Events

The following structure:

```json
{
    "name": "Hacktoberfest - 2020",
    "desc": "Hacktoberfest is a month-long celebration of open source software run by DigitalOcean and DEV.",
    "target": "Anyone",
    "dates": "October",
    "eventurl": "https://hacktoberfest.digitalocean.com/",
    "image": "/images/events/hacktoberfest.jpg",
    "initiatives": ["events"],
    "tags": ["open-source", "digital ocean", "hacktoberfest"]
  }
```
