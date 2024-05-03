import Navbar from "@/components/Navbar";
import { SuccessMessage } from "@/components/messages/alert";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const read = () => {
	const [state, setState] = useState({
		error: "",
		success: "",
		categories: [],
	});
	const { error, success, categories } = state;
	useEffect(() => {
		loadCategories();
	}, []);
	const confirmDelete = (e, slug) => {
		e.preventDefault();
		// console.log('delete > ', slug);
		let answer = window.confirm("Are you sure you want to delete?");
		if (answer) {
			handleDelete(slug);
		}
	};
	const loadCategories = async () => {
		const response = await axios.get(`http://localhost:5001/api/categories`);
		setState({ ...state, categories: response.data });
	};
	const listCategories = () =>
		categories.map((c, i) => (
			<a key={i} href={`/links/${c.slug}`}>
				<a
					style={{ border: "1px solid red" }}
					className='bg-light p-3 col-md-6'>
					<div>
						<div className='row'>
							<div className='col-md-3'>
								<img
									src={c.image && c.image.url}
									alt={c.name}
									style={{ width: "100px", height: "auto" }}
									className='pr-3'
								/>
							</div>
							<div className='col-md-6'>
								<h3>{c.name}</h3>
							</div>
							<div className='col-md-3'>
								<Link href={`/admin/category/${c.slug}`}>
									<button className='border-2 border-green-600'>
										Update
									</button>
								</Link>

								<button
									onClick={(e) => confirmDelete(e, c.slug)}
									className='border-2 border-red-600'>
									Delete
								</button>
							</div>
						</div>
					</div>
				</a>
			</a>
		));
	return (
		<Navbar>
			<div className='row'>
				<div className='col'>
					<h1>List of categories</h1>
					<br />
					{success && SuccessMessage(success)}
				</div>
			</div>
			<div className='row'>{listCategories()}</div>
		</Navbar>
	);
};

export default read;
