import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const router = useRouter();

  async function loginUser(e) {
    e.preventDefault();
    setLoading(true);
    const fetch_api = await fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await fetch_api.json();
    setLoading(false);
    if (data.success) {
      toast.success(`${data.msg}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail('');
      setPassword('');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      toast.error(`${data.msg}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (
    <>
      <div className=" relative bg-gray-50 dark:bg-gray-900 h-[100vh] overflow-hidden">
        <ToastContainer />
        <div className="absolute top-6 -right-2 w-44 h-44 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 "></div>
      <div className="absolute top-6 right-28 w-44 h-44 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div className="absolute top-20 right-4 w-44 h-44 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 "></div>

      <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 "></div>
      <div className="absolute bottom-0 left-32 w-44 h-44 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div className="absolute bottom-16 left-20 w-44 h-44 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="absolute top-0 left-[50%] ">
            <div className=" w-[849px] h-[825px] filter blur-[509px]"></div>
            <div className="bg-[rgb(226,102,30)] w-[999px] h-[971px] filter blur-[509px]"></div>
          </div>

          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-16 h-16 mr-2 rounded-full" src="/192.png" alt="logo" />
            Task Mate
          </a>
          <div className="absolute w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

            
              <form className="space-y-4 md:space-y-6" onSubmit={loginUser}>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                  </div>
                  <a href="#" className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account yet? <a href="/register" className="font-medium text-orange-600 hover:underline dark:text-orange-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login