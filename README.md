# badeseenservice ![strider build badge](http://ci.andinfinity.de/codeforgiessen/badeseenservice/badge/?branch=master)

## Installation
### Prerequisites
This project relies on `node.js` and `mongodb`. It both of them are installed,
run `npm install` to fetch all dependencies.

## Development
While developing you should use `grunt watch` for direct feedback. Before
committing anything you should run `grunt beautify`.

### Testing
Run `make test` for unit tests.

### Generate API documentation
Install `apiDoc` first (`npm install -g apidoc`). Then run `apidoc -i  api/`. The
documentation can then be found under `doc/`
