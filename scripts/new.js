/* eslint-disable camelcase */
const inquirer = require('inquirer');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const getData = async () => {
	const type = await inquirer.prompt([
		{
			type: 'list',
			name: 'type',
			message: 'What do you want to create?',
			default: 'blog',
			choices: ['blog', 'page', 'project'],
		},
	]);
	let questions = [
		{
			type: 'string',
			message: `Title of ${type.type}?`,
			name: 'title',
		},
	];
	switch (type.type) {
		default:
		case 'blog':
			questions = [
				...questions,
				{
					type: 'input',
					message: `Featured Image of ${type.type}?`,
					name: 'featured_image',
					default: '../../images/',
				},
				{
					type: 'input',
					message: `Description of ${type.type}?`,
					name: 'description',
				},
				{
					type: 'input',
					message: `Tags of ${type.type} (Comma separated)?`,
					name: 'tags',
				},
			];
			break;
		case 'project':
			questions = [
				...questions,
				{
					type: 'input',
					message: `Featured Image of ${type.type}?`,
					name: 'featured_image',
					default: '../../images/',
				},
				{
					type: 'input',
					message: `Subtitle of ${type.type}?`,
					name: 'subtitle',
				},
				{
					type: 'input',
					message: `Order of ${type.type}?`,
					name: 'order',
				},
				{
					type: 'input',
					message: `Link of ${type.type}?`,
					name: 'link',
				},
			];
			break;
	}
	const meta = await inquirer.prompt(questions);
	return {
		type: type.type,
		...meta,
	};
};

const getFrontmatter = ({
	type,
	title,
	featured_image,
	description,
	tags,
	subtitle,
	order,
	link,
}) => {
	let frontmatter = {
		title,
	};
	switch (type) {
		default:
		case 'blog':
			frontmatter = {
				...frontmatter,
				date: new Date().toISOString(),
				featured_image,
				description,
				tags: `[${tags
					.split(',')
					.map(tag => `"${tag.trim()}"`)
					.join(',')}]`,
				templateKey: 'blog-post',
			};
			break;
		case 'page':
			frontmatter = {
				...frontmatter,
				templateKey: 'static-page',
			};
			break;
		case 'project':
			frontmatter = {
				...frontmatter,
				featured_image,
				subtitle,
				order,
				link,
				templateKey: 'projects',
			};
			break;
	}
	return frontmatter;
};

const getConfirmation = async (frontmatter, type) => {
	console.log(`Creating a new ${type} with the following data.`);
	console.log(JSON.stringify(frontmatter, null, 4));
	const confirm = await inquirer.prompt([
		{
			type: 'confirm',
			message: 'Are you sure?',
			name: 'confirm',
		},
	]);
	return confirm.confirm;
};

const createPage = async (frontmatter, type) => {
	const markdown = `---${Object.keys(frontmatter).reduce(
		(prev, current) => `${prev}\n${current}: ${frontmatter[current]}`,
		''
	)}\n---\n\nA new ${type}`;

	const filepath = path.join(
		__dirname,
		`../src/pages/${type}/${slugify(frontmatter.title, {
			replacement: '-',
			remove: null,
			lower: true,
		})}.md`
	);

	console.log(`Creating new ${type} at ${filepath}`);

	fs.open(filepath, 'wx', (err, fd) => {
		if (err) {
			if (err.code === 'EEXIST') {
				console.error(
					'File already exists. Exiting. Edit it manually or try a new name'
				);
			}
			return;
		}
		fs.writeFile(fd, markdown, err => {
			if (err) {
				console.error('Failed');
				console.error(err);
			} else {
				console.log('Success. Please edit:');
				console.log(filepath);
			}
		});
	});
};

const init = () =>
	getData().then(async data => {
		const { type } = data;
		const frontmatter = getFrontmatter(data);
		const confirmed = await getConfirmation(frontmatter, type);
		if (!confirmed) {
			init();
			return;
		}
		console.log(`Creating new ${type}`);
		createPage(frontmatter, type);
	});

init();
