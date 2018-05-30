module.exports = {
	siteMetadata: {
		title: "Swas.io - Swashata's Personal Blog",
		shortTitle: 'Swas.io',
		description:
			'Personal blog of Swashata Ghosh, full-stack web developer and WordPress geek based in Noida, IN. Here I write about stuff I have learnt and things I like.',
		image: '/img/ninja.png',
		twitterHandle: '@swashata',
		author: 'Swashata Ghosh',
		url: 'https://swas.io',
		siteUrl: 'https://swas.io',
		socials: {
			twitter: 'https://twitter.com/swashata',
			github: 'https://github.com/swashata',
			linkedin: 'https://www.linkedin.com/in/swashata/',
		},
		taglines: [
			'Founder <a href="https://wpquark.com">@WPQuark</a>',
			'Created <a href="https://eform.live">eForm</a>',
			'React, Node, WordPress',
			'❤️s Scooby & Shelly',
		],
		disqusShortName: 'swashata',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-sitemap',
			options: {
				exclude: ['/project/*', '/tags/*'],
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-',
							inlineCodeMarker: '±',
							aliases: {},
						},
					},
					'gatsby-remark-copy-linked-files',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 1344,
							linkImagesToOriginal: true,
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: ['Oregano', 'Roboto:300,400,400i,700,700i'],
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: './src/img/ninja.png',
				injectHTML: true,
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					twitter: false,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-81510319-8',
				// Puts tracking script in the head instead of the body
				head: true,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: ['/preview/**', '/do-not-track/me/too/'],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Swas.io - Swashata's Personal Blog",
				short_name: 'Swas.io',
				start_url: '/',
				background_color: '#BBDEFB',
				theme_color: '#E1F5FE',
				display: 'minimal-ui',
				icon: 'src/img/ninja.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
};
