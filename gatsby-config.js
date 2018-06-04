const autoprefixer = require('autoprefixer');

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
				path: `${__dirname}/src/images`,
				name: 'images',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-twitter',
		'gatsby-plugin-react-helmet',
		// 'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-postcss-sass',
			options: {
				postCssPlugins: [autoprefixer()],
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-autolink-headers',
						options: {
							offsetY: 55,
						},
					},
					{
						resolve: 'gatsby-remark-embed-video',
						options: {
							width: 800,
							ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
							height: 400, // Optional: Overrides optional.ratio
							related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
						},
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-',
							inlineCodeMarker: '±',
							aliases: {},
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 960,
							linkImagesToOriginal: true,
						},
					},
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-responsive-iframe',
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
			resolve: 'gatsby-plugin-sitemap',
			options: {
				exclude: ['/project/*', '/tags/*'],
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
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "Swas.io - Swashata's Personal Blog",
				short_name: 'Swas.io',
				start_url: '/',
				background_color: '#FCF2E5',
				theme_color: '#1E578E',
				display: 'standalone',
				icon: 'src/images/ninja.png', // This path is relative to the root of the site.
			},
		},
		// {
		// 	resolve: 'gatsby-plugin-netlify-cms',
		// 	options: {
		// 		modulePath: `${__dirname}/src/cms/cms.js`,
		// 	},
		// },
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
};
