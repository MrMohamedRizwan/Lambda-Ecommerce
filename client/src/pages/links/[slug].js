import { withRouter } from "next/router";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";

const Links = ({ slug, category, links, totalLinks, linksLimit, linkSkip }) => {
	const [allLinks, setAllLinks] = useState(links);
	const [limit, setLimit] = useState(linksLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalLinks);
	// useEffect(() => {
	//     loadPopular();
	// }, []);
	const listOfLinks = () =>
		allLinks.map((l, i) => (
			<div key={i} className='row alert alert-primary p-2'>
				<div className='col-md-8' onClick={(e) => handleClick(l._id)}>
					<a href={l.url} target='_blank'>
						<h5 className='pt-2'>{l.title}</h5>
						<h6 className='pt-2 text-danger' style={{ fontSize: "12px" }}>
							{l.url}
						</h6>
					</a>
				</div>
				<div className='col-md-4 pt-2'>
					<span className='pull-right'>
						{moment(l.createdAt).fromNow()}
						by {l.postedBy.name}
					</span>
					<br />
					<span className='badge text-secondary pull-right'>
						{l.clicks} clicks
					</span>
				</div>
				<div className='col-md-12'>
					<span className='badge text-dark'>
						{l.type} / {l.medium}
					</span>
					{l.categories.map((c, i) => (
						<span key={i} className='badge text-success'>
							{c.name}
						</span>
					))}
				</div>
			</div>
		));
	const loadMore = async () => {
		let toSkip = skip + limit;
		const response = await axios.post(
			`http://localhost:5001/api/category/${slug}`,
			{ skip: toSkip, limit },
		);
		setAllLinks([...allLinks, ...response.data.links]);
		console.log("allLinks", allLinks);
		console.log("response.data.links.length", response.data.links.length);
		setSize(response.data.links.length);
		setSkip(toSkip);
	};
	const handleClick = async (linkId) => {
		const response = await axios.put(`http://localhost:5001/api/click-count`, {
			linkId,
		});
		// loadPopular();
	};
	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className='btn btn-outline-primary btn-lg'>
					Load more
				</button>
			)
		);
	};

	return (
		<Navbar>
			<div className='flex flex-row justify-between'>
				<div>
					<div>category/links</div>
					<h1>{category.name}</h1>
					<p>{category.content}</p>
				</div>
				<div className='flex flex-col'>
					<InfiniteScroll
						pageStart={0}
						loadMore={loadMore}
						hasMore={size > 0 && size >= limit}
						loader={
							<img key={0} src='/static/images/loading.gif' alt='loading' />
						}>
						<div className='row'>
							<div className='col-md-8'>{listOfLinks()}</div>
							<div className='col-md-4'>
								<h2 className='lead'>Most popular in {category.name}</h2>
								{/* <div className="p-3">{listOfPopularLinks()}</div> */}
							</div>
						</div>
					</InfiniteScroll>
					{/* {loadMoreButton} */}
				</div>
				{/* <button onClick={loadMoreButton}>Load More</button> */}
				<div>
					<div>right/Sidebar</div>
					<img src={category.image.url} alt={category.name} />
				</div>
			</div>
		</Navbar>
	);
};
export async function getServerSideProps(context) {
	const { query } = context;
	const { slug } = query;
	let skip = 1;
	let limit = 2;

	const response = await axios.post(
		`http://localhost:5001/api/category/${slug}`,
		{ skip, limit },
	);

	return {
		props: {
			slug,
			category: response.data.category,

			links: response.data.links,
			totalLinks: response.data.links.length,
			linksLimit: limit,
			linkSkip: skip,
		},
	};
}
export default Links;
