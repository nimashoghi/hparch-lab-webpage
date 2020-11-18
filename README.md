## Development Environment

Make sure you have Node and yarn installed. Clone the repository (master branch) and run `yarn` to install all dependencies.


## Testing
Run `yarn dev`

## Building instructions

Run `URL_PREFIX="http://comparch.gatech.edu/hparch/undergraduate_research/" yarn export`, which will build the project and export into a static html (and JS) site.
The `URL_PREFIX` environment variable sets the URL prefix of all the assets in the generated HTML site.

## Deploying to GitHub pages
Run `URL_PREFIX="http://comparch.gatech.edu/hparch/undergraduate_research/" yarn publish-gh`, which will build the project, export into a static html (and JS) site, and upload that to the `gh-pages` branch of this repository.
