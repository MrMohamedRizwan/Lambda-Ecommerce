// export default withRouter(Activate);

// import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// export default function ExampleClientComponent() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   return (<div>
//     {JSON.stringify(pathname)}
//     <br/>
//     {JSON.stringify(router)}
//     <br/>
//     {JSON.stringify(searchParams)}
//   </div>)

//   // ...
// }
import { withRouter } from "next/router";

import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ErrorMessage, SuccessMessage } from "@/components/messages/alert";

import { useRouter } from "next/router";

function tokenverify({ router }) {
	// const router = useRouter();
	// const { id } = router.query;
	const [state, setState] = useState({
		name: "",
		token: "",
		buttonText: "Activate Account",
		success: "",
		error: "",
	});
	const { name, token, buttonText, success, error } = state;
	useEffect(() => {
		let token = router.query.id;

		console.log("token val", token);
		const name = jwt.decode(token);
		setState({ ...state, name, token });
	}, [router]);
	const clickSubmit = async (e) => {
		e.preventDefault();
		setState({ ...state, buttonText: "Activating" });

		try {
			const response = await axios.post(`/api/register/activate`, { token });
			// console.log('account activate response', response)
			setState({
				...state,
				name: "",
				token: "",
				buttonText: "Activated",
				success: response.data.message,
			});
		} catch (error) {
			setState({
				...state,
				buttonText: "Activate Account",
				error: error.response.data.error,
			});
		}
	};

	return (
		<div>
			<div className='flex flex-col items-center justify-center'>
				<div className='text-xl my-[10px]'>
					Good day {}, Ready to activate your account?
					<br />
					<br />
					{JSON.stringify(token)}
					<br />
					<br />
				</div>
				<br />
				{success && SuccessMessage(success)}
				{error && ErrorMessage(error)}
				<div>
					<button
						className='w-[100%] border-2 border-black bg-blue-500 flex justify-center'
						onClick={clickSubmit}>
						{state.buttonText}
					</button>
				</div>
			</div>
		</div>
	);

	// return(
	//     <>
	//     njk
	//     {JSON.stringify({id})}
	//     </>
	// )
}
export default withRouter(tokenverify);
