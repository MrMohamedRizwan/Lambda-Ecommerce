import { useState } from 'react';
import axios from 'axios';

import Router from 'next/router';
// import Layout from '../../../components/Layout';
import { ErrorMessage, SuccessMessage } from '@/components/messages/alert';
import Navbar from '@/components/Navbar';

const ForgotPassword = () => {
    const API="/api"
    const [state, setState] = useState({
        email: 'mrrizwan2207@gmail.com',
        buttonText: 'Forgot Password',
        success: '',
        error: ''
    });
    const { email, buttonText, success, error } = state;

    const handleChange = e => {
        setState({ ...state, email: e.target.value, success: '', error: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log('post email to ', email);
        try {
            const response = await axios.post(`${API}/forgot-password`, {email: email });
            // console.log('FORGOT PASSWORD', response);
            setState({
                ...state,
                email: '',
                buttonText: 'Done',
                success: response.data.message
            });
        } catch (e) {
            console.log('FORGOT PW ERROR', e);
            setState({
                ...state,
                buttonText: 'Forgot Password',
                error: e.response.data.error
            });
        }
    };

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="">
                <input
                    type="email"
                    className="w-full border-2"
                    onChange={handleChange}
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition duration-300 ease-in-out mt-[20px]">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Navbar>
            <div className="flex flex-row items-center justify-center">
                <div className=" border-2 border-black ">
                    <h1>Forgot Password</h1>
                    <br />
                    {success && SuccessMessage(success)}
                    {error && ErrorMessage(error)}
                    {passwordForgotForm()}
                </div>
            </div>
        </Navbar>
    );
};

export default ForgotPassword;
