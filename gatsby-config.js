module.exports = {
	siteMetadata: {
		title: "Swas.io - Swashata's Personal Blog",
		author: 'Swashata Ghosh',
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
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
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
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-',
							inlineCodeMarker: '>',
							aliases: {},
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					'Oregano', // you can also specify font weights and styles
					'Source+Sans+Pro:300,300i,400,400i,700,700i',
				],
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
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
};
