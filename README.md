# Swas.io - Swashata's Personal Blog

Hey there 🎉🎉. This is my personal blog built with the awesome [Gatsby](https://www.gatsbyjs.org/).

Here I write about things I like and stuff I have learnt. Please feel free to
browse.

<p align="center">
	<a href="https://swas.io">Swas.io</a>
</p>

If you are curious, I have started with the [netlify-cms gatsby starter](https://github.com/AustinGreen/gatsby-starter-netlify-cms) and
hacked my way into building the site.

* Connection with [netlifycms](https://www.netlifycms.org/).
* Paginated Blog and Posts with [gatsby-pagination](https://github.com/infinitedescent/gatsby-pagination).
* Structured Projects with ordering 💪.

and many a things. Fork away 😎.

### New Entries

```bash
yarn newEntry
```

Will walk you through a wizard to create either a blog, page or post entry. Neat! 🍪

### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn install
$ yarn develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ yarn build
$ yarn serve
```

## Getting Started (Without Netlify)
```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/AustinGreen/gatsby-starter-netlify-cms/
$ cd [SITE_DIRECTORY_NAME]
$ npm run build
$ npm run serve
```

### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
