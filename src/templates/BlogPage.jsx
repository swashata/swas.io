import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import BlogCard from '../components/BlogCard';
import Page from '../components/Page';

const createPaginationObjects = (length, page, increment = 2) =>
	Array.from({ length }, (_, i) => ({
		link: `/blog/${i + increment}/`,
		index: i + increment,
		current: page === i + increment,
	}));

const BlogPage = ({ pathContext }) => {
	const {
		nodes,
		page,
		prev,
		next,
		pages,
		total,
		shortTitle: siteTitle,
	} = pathContext;
	let navItems = [
		{
			link: `/blog/`,
			index: 1,
			current: page === 1,
		},
	];
	if (pages <= 5) {
		navItems = [
			...navItems,
			...Array.from({ length: pages - 1 }, (_, i) => ({
				link: `/blog/${i + 2}/`,
				index: i + 2,
				current: page === i + 2,
			})),
		];
	} else {
		// We have a situation where we have to show the first
		// item, three items around the current one
		// and also the last item
		/* eslint-disable no-lonely-if */
		if (page <= 3) {
			// If the current one is closer to the start
			navItems = [
				...navItems,
				...createPaginationObjects(3, page),
				{
					separator: true,
					index: 'starter-separator',
				},
				{
					link: `/blog/${pages}/`,
					index: pages,
					current: false,
				},
			];
		} else if (page > pages - 3) {
			// If the current one is closer to the last one
			navItems = [
				...navItems,
				{
					separator: true,
					index: 'finisher-separator',
				},
				...createPaginationObjects(4, page, pages - 3),
			];
		} else {
			navItems = [
				...navItems,
				{
					separator: true,
					index: 'starter-separator',
				},
				...createPaginationObjects(3, page, page - 1),
				{
					separator: true,
					index: 'finisher-separator',
				},
				{
					link: `/blog/${pages}/`,
					index: pages,
					current: false,
				},
			];
		}
		/* eslint-enable */
	}

	const footer = (
		<nav className="pagination">
			{prev && (
				<Link to={prev} className="pagination-previous">
					Previous
				</Link>
			)}
			{next && (
				<Link to={next} className="pagination-next">
					Next page
				</Link>
			)}
			<ul className="pagination-list">
				{navItems.map(item => (
					<li key={item.index}>
						{item.separator ? (
							<span className="pagination-ellipsis">
								&hellip;
							</span>
						) : (
							<Link
								to={item.link}
								className={`pagination-link ${
									item.current ? 'is-current' : ''
								}`}
								aria-label={`Goto page ${item.index}`}
							>
								{item.index}
							</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);

	return (
		<Page
			title={`${siteTitle} – Blog`}
			subtitle={`Showing Page ${page} of ${pages} · Total ${total} articles`}
			footer={footer}
		>
			<div className="columns is-desktop is-multiline">
				{nodes.map(item => {
					const {
						node: {
							excerpt,
							fields: { slug },
							frontmatter: {
								date,
								featured_image: featuredImage,
								tags,
								title,
							},
							id,
						},
					} = item;
					const cardProps = {
						excerpt,
						date,
						featuredImage,
						tags,
						title,
						slug,
					};
					return (
						<div className="column is-full" key={id}>
							<BlogCard {...cardProps} />
						</div>
					);
				})}
			</div>
		</Page>
	);
};

BlogPage.propTypes = {
	pathContext: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BlogPage;
