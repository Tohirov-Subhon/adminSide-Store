import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../api/authSlice';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Auth () {
    setLoading(true);
    setError(false);

    let obj = {
      userName: name,
      password: password,
    };


    // console.log(localStorage.getItem('token'));
    dispatch(loginAdmin(obj))
    setLoading(true)

    setTimeout(() =>{
      if(localStorage.getItem('token')) {
      
        window.location.href = 'http://localhost:5174/dashboard';
        setLoading(false);
      } 
      else {
        setError(true);
        setLoading(false);
      }
  }, 4000);
   
  }

  return (
<>
    <div className='flex '>

    <div className='w-[50%] bg-[#1C2536] items-center p-[250px_40px] '>
      <h1 className='text-white text-[20px] font-[500]'>Welcome to admin panel</h1>
        <img className='w-[300px]' src={Logo} alt="" />
    </div>

      <div className='w-[50%] flex justify-center items-center min-h-screen '>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <p className='text-xl font-semibold text-center text-gray-900'>Sign in to your account</p>
        <div className='mt-4'>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Enter email' 
            type='text' 
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
          />
        </div>
        <div className='mt-4'>
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter password' 
            type='password' 
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
          />
        </div>
        <div className='flex justify-between mt-3 text-sm text-gray-600'>
          <p>No account?</p>
          <p className='text-indigo-600 cursor-pointer hover:underline'>Sign up</p>
        </div>
        <button 
          onClick={Auth} 
          className='w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-lg mt-4 font-medium hover:bg-indigo-700 transition disabled:bg-gray-400' 
          type='submit' 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        {error && <p className='text-red-500 text-center mt-3'>Account not found</p>}
      </div>
    </div>
    </div>

</>
  );
};

export default Login;
