import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/Users";
import Cluster from "@/models/Clusters";
import Bunch from "./components/Cluster";
import Task from "./components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

const Dashboard = ({ Loading, setLoading }) => {
  const router = useRouter();
  const ref = useRef();


  const [ValidUser, setValidUser] = useState(false)
  const [User, setUser] = useState('');

  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    // console.log(data);
    if (data.success) {
      setValidUser(true);
      setUser(data)
    } else {
      router.push('/login')
      setValidUser(false);
    }
  }

  useEffect(() => {
    auth()
  }, [])

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     if (url !== router.asPath) {
  //       toggleClusterMenu();
  //       router.events.emit("routeChangeError");
  //       router.push("/dashboard");
  //     }
  //   };
  //   router.events.on("beforeHistoryChange", handleRouteChange);
  //   return () => {
  //     router.events.off("beforeHistoryChange", handleRouteChange);
  //   };
  // }, [router]);

  // const [Loading, setLoading] = useState(false);
  const [Cluster, setClusters] = useState([]);
  const [ActiveCluster, setActiveCluster] = useState("");
  const [Tasks, setTasks] = useState(null);
  const [newClusterName, setNewClusterName] = useState("");
  const [newTask, setnewTask] = useState("");
  const [NewCluster, setNewCluster] = useState(false);
  const [IsCompleted, setIsCompleted] = useState(false);

  const changeCluster = (cluster_id) => {
    setActiveCluster(cluster_id);
    let tasks = Cluster.find((obj) => obj._id === cluster_id);
    setTasks(tasks);
    // console.log(tasks);
    toggleClusterMenu();

  };

  async function getCluster(load) {
    if(load){setLoading(true)};
    const fetch_api = await fetch("/api/clusters/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    setLoadingCluster(false)
    // console.log(data.Clusters);
    if (data.success) {
      setClusters(data.Clusters);
    } else {
      setClusters(null);
    }
    if(load){setLoading(false)};
  }

  const [LoadingCluster, setLoadingCluster] = useState(false)

  async function addCluster() {
    setLoadingCluster(true)
    setNewCluster(true);
    setNewClusterName("");
    setClusterInput(false);
    const fetch_api = await fetch("/api/clusters/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cluster_name: newClusterName,
      }),
    });
    const data = await fetch_api.json();
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
      setClusterInput(false);
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
    setNewCluster(false);
  }



  const [LoadingTask, setLoadingTask] = useState(false);

  async function addTask() {
    setLoadingTask(true)
    setnewTask("");
    const fetch_api = await fetch("/api/task/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_name: newTask,
        description: " ",
        is_completed: false,
        cluster_id: ActiveCluster,
      }),
    });
    const data = await fetch_api.json();
    setLoadingTask(false)
    if (data.success) {
      setTasks(data.cluster);
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

  function show() {
    ref.current.classList.remove("translate-x-full");
    ref.current.classList.add("translate-x-0");
    ref.current.classList.add("right-5");
  }
  function hide() {
    ref.current.classList.remove("translate-x-0");
    ref.current.classList.add("translate-x-full");
    ref.current.classList.remove("right-5");
  }
  const toggleClusterMenu = (stat) => {
    if (stat === "on") {
      show();
    } else {
      if (ref.current.classList.contains("translate-x-full")) {
        show();
        // console.log("wordked ");
      } else if (!ref.current.classList.contains("translate-x-full")) {
        hide();
      }
    }
  };

  const [ClusterInput, setClusterInput] = useState(false);

  useEffect(() => {
    getCluster(false);
  }, [NewCluster]);


  const handleLogout = async () => {
    const fetch_api = await fetch("/api/logout/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await fetch_api.json();
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
      setTimeout(() => {
        router.push('/login');
      }, 500);
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



  useEffect(() => {
    getCluster(false);
  }, [Tasks]);

  async function toggleComplete(taskId, isCompleted, nm) {
    const fetch_api = await fetch("/api/task/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cluster_id: ActiveCluster,
        task_id: taskId,
        is_completed: isCompleted,
      }),
    });
    const data = await fetch_api.json();
  }
  const [ProfileDropDown, setProfileDropDown] = useState(true);
  const [ClusterdropDown, setClusterdropDown] = useState(true);


  const deleteCluster=async()=>{
    changeCluster(null)
    const fetch_api = await fetch("/api/clusters/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cluster_id: ActiveCluster,
      }),
    });
    const data = await fetch_api.json();
    console.log(data);
    setClusterdropDown(true)
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
    <>{ValidUser &&
      <div className="flex p-1 h-[100vh] dark:bg-gray-900">
        <ToastContainer />

        <div
          ref={ref}
          className="flex flex-col justify-between w-full md:w-2/3 fixed sm:relative top-0 left-0  bg-white lg:w-1/3 transform transition-transform dark:bg-gray-900 sm:translate-x-0 sm:z-20 sm:overflow-x-scroll"
        >
          {/* sm:translate-x-full */}
          <div>
            <div className=" flex justify-between h-[10vh] px-3 mx-2 bg-white dark:bg-gray-800 shadow-lg rounded-b-xl">
              <div className="flex justify-start items-center">
                <h1 className="font-extrabold leading-tight text-left dark:text-white text-5xl md:text-6xl">
                  <span className="text-orange-600">TASK</span>MATE
                </h1>
                {/* <h1 className="font-extrabold leading-tight text-left text-lg md:text-2xl">
                  <span className="text-indigo-600">Welcome back</span>{" "}
                  {User.user_details.name}
                </h1> */}
              </div>

              <div onMouseOver={() => setProfileDropDown(false)} onMouseLeave={() => setProfileDropDown(true)}
                href="#"
                className="flex items-center flex-col justify-center cursor-pointer dark:text-white"
              >
                <img
                  alt="profil"
                  src="/profile.png"
                  className="mx-auto object-cover rounded-full h-12 w-12 "
                />
                {User.user_details.name.slice(0, 10)}...
                <div className={`absolute ${ProfileDropDown && 'hidden'} right-2 mt-48 z-10 w-48 text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">{User.user_details.name}</a> */}
                    <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-1">{User.user_details.email}</Link>
                    <Link href="/account" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-2">Edit account</Link>
                    <button onClick={handleLogout} type="submit" className="hover:bg-slate-100  hover:text-red-600 text-gray-700 block w-full px-4 py-2 text-left text-sm dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                  </div>



                </div>
              </div>



            </div>

            <div className="flex justify-center flex-col items-start p-2">
              <div className="relative w-full p-4 bg-white shadow-lg rounded-xl overflow-y-scroll h-[85vh] dark:bg-gray-800">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="text-xl font-medium text-gray-800 dark:text-white ">
                    All Cluster
                  </p>
                  <button
                    onClick={() => setClusterInput(true)}
                    className="flex items-center text-gray-800 border-0 text-black hover:text-black focus:outline-none"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="dark:text-white text-black"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
                    </svg>
                  </button>
                </div>
                {ClusterInput && (
                  <div className="mb-4">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Enter new Cluster name
                    </label>
                    <form className="relative" onSubmit={(e) => { e.preventDefault(), addCluster() }}>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                        {" "}
                      </div>
                      <input
                        type="text"
                        id="default-text"
                        className="block font-medium w-full p-4 pl-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 outline-none focus:border-orange-500 dark:bg-gray-800 text-lg dark:text-white"
                        placeholder="New Cluster name..."
                        required={true}
                        value={newClusterName}
                        onChange={(e) => {
                          setNewClusterName(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-3.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Create
                      </button>
                    </form>
                  </div>
                )}
                {Loading &&
                  <div className="flex justify-center items-center h-[50vh]">

                    <svg width="40" height="40" fill="currentColor" class="animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                      </path>
                    </svg>
                  </div>}
                {Cluster ? (
                  Cluster.map((cluster, indx) => {
                    return (
                      <Bunch
                        key={indx}
                        clusterId={cluster._id}
                        changeCluster={changeCluster}
                        name={cluster.cluster_name}
                        status={cluster.tasks.length}
                      />
                    );
                  })
                ) : (
                  <p>Unable to fetch Your Cluster</p>
                )}
                {LoadingCluster && <div className="flex cursor-pointer items-center justify-between p-3 mb-2 bg-orange-200 hover:bg-orange-200 rounded animate-pulse dark:bg-orange-400">
                  <div className="p-2 bg-white rounded-lg">
                    <Image alt='jghfgghfduh' src={'/192.png'} width={20} height={20} />
                  </div>
                  <div className="flex items-center justify-between w-full ml-2">
                    <p className="text-slate-500"></p>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>

        {!Tasks &&

          <div className="relative z-0 lg:flex flex-col justify-center items-center w-full hidden">
            <div className='flex flex-col justify-center items-center'>
              <Image
                src="/ToDo.png"
                alt="Logo"
                className="mx-auto mb-2 animate-bounce"
                height={400}
                width={400}
              /></div></div>
        }
        {Tasks && (
          <div className="w-full sm:w-2/3  md:block m-1">
            <div className="w-full bg-white shadow-xl dark:shadow-lg rounded-2xl h-[95vh] dark:bg-gray-800">
              <div className="p-3 text-center text-xl font-semibold flex justify-between dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left block sm:hidden" viewBox="0 0 16 16" onClick={toggleClusterMenu}>
                  <path tabIndex="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                {" "}
                {Tasks.cluster_name}
                <div onClick={() => setClusterdropDown(false)} onMouseLeave={() => setClusterdropDown(true)} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-gear cursor-pointer" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                  <div className={`absolute ${ClusterdropDown && 'hidden'} right-2 z-10 w-48 text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                      {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">{User.user_details.name}</a> */}
                      <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-1">Edit Cluster</Link>
                      <Link href="/account" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-2">Remove all tasks</Link>
                      <button onClick={deleteCluster} type="button" className="hover:bg-slate-100  hover:text-red-600 text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-3">Delete Cluster</button>
                    </div>
                  </div>
                </div>
              </div>
              <form className="w-full" onSubmit={(e) => { e.preventDefault(), addTask() }}  >
                <div className="flex items-center border-2 border-orange-300 dark:border-gray-500 py-2 mx-3 rounded-md">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none dark:text-white text-md"
                    type="text"
                    placeholder="Type task name here...."
                    value={newTask}
                    onChange={(e) => {
                      setnewTask(e.target.value);
                    }}
                  />
                  <button
                    className="flex-shrink-0 mx-2 bg-orange-500 hover:bg-orange-700 border-orange-500 hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>

              <p className="p-4 font-bold text-black text-md dark:text-white">
                All Tasks
                {/* <span className="ml-2 text-sm text-gray-800 ">(05)</span> */}
              </p>
              <div className="flex flex-col">
                <ul className="px-4 overflow-y-scroll h-[75vh]">
                  {!Tasks && <p>No Tasks to Show..</p>}
                  {Tasks &&
                    Tasks.tasks.map((task, index) => {
                      return <Task key={index} toggleComplete={toggleComplete} task={task} />;
                    })}
                  {LoadingTask && <li className="py-2 text-gray-600 dark:bg-gray-700 my-2 animate-pulse bg-slate-100 rounded-lg shadow-lg cursor-pointer">
                    <div className='rounded cursor-pointer'>
                      <input className="hidden" type="checkbox" id="task_1" checked={false} />
                      <label className="flex items-center justify-between h-10 px-2 cursor-pointer" htmlFor="task_1">
                        <div className='flex'>
                          <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path tabIndex="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="ml-4 text-md"></span>
                        </div>
                      </label>
                    </div>
                  </li>}
                </ul>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </div>}
    </>
  );
};

// export async function getServerSideUser(context) {
//   // Parse cookies from the request headers
//   const cookies = parse(context.req.headers.cookie || "");
//   const token = cookies.access_token;

//   try {
//     // Verify the JWT token
//     let decoded = await jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded._id);
//     let user = await User.findOne({ _id: decoded._id });
//     // let user_Cluster = await Cluster.findOne({ user_id: user._id });
//     // console.log(user_Cluster);

//     if (user) {
//       decoded = { name: user.name, email: user.email };
//       // console.log(decoded);
//     }

//     return {
//       User: {
//         user_details: decoded,
//         // Cluster: user_Cluster.Cluster
//       },
//     };
//   } catch (err) {
//     // Handle invalid or expired token
//     return {
//       redirect: {
//         destination: "/login", // Redirect to login page if the token is invalid or expired
//         permanent: false,
//       },
//     };
//   }
// }

export default Dashboard;
