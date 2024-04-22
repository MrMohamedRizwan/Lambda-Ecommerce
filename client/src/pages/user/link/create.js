import Navbar from "@/components/Navbar";
import { SuccessMessage,ErrorMessage } from "@/components/messages/alert";
import { getCookie, isAuth } from "@/helpers/authenticationOfCookies";
import axios from "axios";
import React, { useEffect, useState } from "react";

const create = ({token}) => {
	const [state, setState] = useState({
		title: "check123",
		url: "http://localhost:3000/user/link/create",
		categories: [],
		loadedCategories: [],
		success: "",
		error: "",
		type: "",
		medium: "",
	});
	const {
		title,
		url,
		categories,
		loadedCategories,
		success,
		error,
		type,
		medium,
	} = state;
	useEffect(() => {
		loadCategories();
	}, [success]);
	const loadCategories = async () => {
		const response = await axios.get(`/api/categories`);
		setState({ ...state, loadedCategories: response.data });
	};
	const handleTitleChange = (name) => (e) => {
		setState({ ...state, [name]: e.target.value });
	};
	const handleUrlChange = (name) => (e) => {
		setState({ ...state, [name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const response = await axios.post(
                `/api/link`,
                { title, url, categories, type, medium },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response);
            setState({
                ...state,
                title: '',
                url: '',
                success: 'Link is created',
                error: '',
                loadedCategories: [],
                categories: [],
                type: '',
                medium: ''
            });
        } catch (error) {
            console.log('LINK SUBMIT ERROR', error);
            setState({ ...state, error: error.response.data.error });
        }
	};
	const handleToggle = (c) => () => {
		// return the first index or -1
		const clickedCategory = categories.indexOf(c);
		const all = [...categories];

		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		console.log("all >> categories", all);
		setState({ ...state, categories: all, success: "", error: "" });
	};
	// show categories
	const showCategories = () => {
		return (
			loadedCategories &&
			loadedCategories.map((c) => (
				<li className='list-unstyled' key={c._id}>
					<input
						type='checkbox'
						onChange={handleToggle(c._id)}
						className='mr-2'
					/>
					<label className='form-check-label'>{c.name}</label>
				</li>
			))
		);
	};
	const handleTypeClick = (e) => {
		setState({ ...state, type: e.target.value, success: "", error: "" });
	};

    const handleMediumClick = (e) => {
        setState({ ...state, medium: e.target.value, success: '', error: '' });
    };

	const showTypes = () => {
		return (<div>
			<div className='form-check ml-3'>
				<label className='form-check-label'>
					<input
						type='radio'
						onClick={handleTypeClick}
						checked={type === "free"}
						value='free'
						className='from-check-input'
						name='type'
					/>{" "}
					Free
				</label>
			</div>

			<div className='form-check ml-3'>
				<label className='form-check-label'>
					<input
						type='radio'
						onClick={handleTypeClick}
						checked={type === "paid"}
						value='paid'
						className='from-check-input'
						name='type'
					/>{" "}
					Paid
				</label>
			</div>
		</div>)
	};
    const showMedium = () => {
        return (<div>
            <div className='form-check ml-3'>
                <label className='form-check-label'>
                    <input
                        type='radio'
                        onClick={handleMediumClick}
                        checked={medium === "video"}
                        value='video'
                        className='from-check-input'
                        name='medium'
                    />{" "}
                    Video
                </label>
            </div>

            <div className='form-check ml-3'>
                <label className='form-check-label'>
                    <input
                        type='radio'
                        onClick={handleMediumClick}
                        checked={medium === "book"}
                        value='book'
                        className='from-check-input'
                        name='medium'
                    />{" "}
                    Book
                </label>
            </div>
        </div>)
        };
	// submit link form
	const submitLinkForm = () => {
		return (
			<div className=''>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col border-2 border-black  justify-center'>
					<div className='flex flex-col'>
						<label>Title</label>
						<input
							type='text'
							className='border-2 border-blue-500'
							onChange={handleTitleChange("title")}
							value={title}
						/>
					</div>
					<div className='flex flex-col'>
						<label>URL</label>
						<input
							type='url'
							className='border-2 border-blue-500'
							onChange={handleUrlChange("url")}
							value={url}
						/>
					</div>
					<button disabled={!token} className="w-[50%] border-2 border-black bg-blue-500 flex justify-center" type="submit">
                    {isAuth() || token ? 'Post' : 'Login to post'}
                </button>
				</form>
			</div>
		);
	};
	return (
		<Navbar>
			<div className='flex flex-row  h-[100%] items-center  justify-between'>
				<div>
					<div className='form-group'>
						<label className='text-muted ml-4'>Category</label>
						<ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
							{showCategories()}
						</ul>
					</div>
					<div className='form-group'>
						<label className='text-muted ml-4'>Types</label>
						<ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
							{showTypes()}
						</ul>
					</div>
                    <div className='form-group'>
						<label className='text-muted ml-4'>Medium</label>
						<ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
							{showMedium()}
						</ul>
					</div>
				</div>
				<div>
					{submitLinkForm()}
				</div>
			</div>
					{success && SuccessMessage(success)}
                    {error && ErrorMessage(error)}
		</Navbar>
	);
};

create.getInitialProps = ({ req }) => {
    const token = getCookie('token', req);
    return { token };
};
export default create;
