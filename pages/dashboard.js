import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/Users";
import Cluster from "@/models/Clusters";
import Bunch from "./components/Bunch";
import Task from "./components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

const Dashboard = (props) => {
  const router = useRouter();
  const ref = useRef();


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

  const [Loading, setLoading] = useState(false);
  const [Cluster, setClusters] = useState([]);
  const [ActiveCluster, setActiveCluster] = useState("");
  const [Tasks, setTasks] = useState(null);
  const [newClusterName, setNewClusterName] = useState("");
  const [newTask, setnewTask] = useState("");
  const [NewBunch, setNewBunch] = useState(false);
  const [IsCompleted, setIsCompleted] = useState(false);

  const changeCluster = (cluster_id) => {
    setActiveCluster(cluster_id);
    let tasks = Cluster.find((obj) => obj._id === cluster_id);
    setTasks(tasks);
    console.log(tasks);
    toggleClusterMenu();

  };

  async function getCluster() {
    setLoading(true);
    const fetch_api = await fetch("/api/clusters/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    setLoading(false);
    console.log(data.Clusters);
    if (data.success) {
      setClusters(data.Clusters);
    } else {
      setClusters(null);
    }
  }

  async function addCluster() {
    setNewBunch(true);
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
      setNewClusterName("");
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
      setClusterInput(false);
    }
    setNewBunch(false);
  }

  async function addTask() {
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
      setTasks(data.cluster);
      setnewTask("");
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
        console.log("wordked ");
      } else if (!ref.current.classList.contains("translate-x-full")) {
        hide();
      }
    }
  };

  const [ClusterInput, setClusterInput] = useState(false);

  useEffect(() => {
    getCluster();
  }, [NewBunch]);


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
    getCluster();
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


  return (
    <>
      <div className="flex p-1 h-[100vh]">
        <ToastContainer />

        <div
          ref={ref}
          className="flex flex-col justify-between w-full md:w-2/3 fixed sm:relative top-0 left-0 bg-white lg:w-1/3 transform transition-transform  sm:translate-x-0 sm:z-20 sm:overflow-x-scroll"
        >
          {/* sm:translate-x-full */}
          <div>
            <div className=" flex justify-between h-[10vh] px-3 mx-2 bg-white shadow-lg rounded-b-xl">
              <div className="flex justify-start items-center">
                <h1 className="font-extrabold leading-tight text-left text-5xl md:text-6xl">
                  <span className="text-orange-600">TASK</span>MATE
                </h1>
                {/* <h1 className="font-extrabold leading-tight text-left text-lg md:text-2xl">
                  <span className="text-indigo-600">Welcome back</span>{" "}
                  {props.user_details.name}
                </h1> */}
              </div>

              <div onMouseOver={() => setProfileDropDown(false)} onMouseLeave={() => setProfileDropDown(true)}
                href="#"
                className="flex items-center flex-col justify-center cursor-pointer "
              >
                <img
                  alt="profil"
                  src="/profile.png"
                  className="mx-auto object-cover rounded-full h-12 w-12 "
                />
                {props.user_details.name}
                <div className={`absolute ${ProfileDropDown && 'hidden'} right-2 mt-48 z-10 w-48 text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">{props.user_details.name}</a> */}
                    <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-1">{props.user_details.email}</Link>
                    <Link href="/account" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-2">Edit account</Link>
                    <button onClick={handleLogout} type="submit" className="hover:bg-slate-100  hover:text-red-600 text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                  </div>



                </div>
              </div>



            </div>

            <div className="flex justify-center flex-col items-start p-2">
              <div className="relative w-full p-4  bg-white shadow-lg rounded-xl overflow-y-scroll h-[85vh]">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="text-xl font-medium text-gray-800  ">
                    All Cluster
                  </p>
                  <button
                    onClick={() => setClusterInput(true)}
                    className="flex items-center text-gray-800 border-0  hover:text-black focus:outline-none"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
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
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Enter new Cluster name
                    </label>
                    <form className="relative" onSubmit={(e) => { e.preventDefault(), addCluster() }}>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {" "}
                      </div>
                      <input
                        type="text"
                        id="default-text"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="New Cluster name..."
                        required={true}
                        value={newClusterName}
                        onChange={(e) => {
                          setNewClusterName(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Create
                      </button>
                    </form>
                  </div>
                )}
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
            <div className="w-full bg-white shadow-xl border-2 rounded-2xl dark:bg-gray-100 h-[95vh]">
              <div className="p-3 text-center text-xl flex justify-between ">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left block sm:hidden" viewBox="0 0 16 16" onClick={toggleClusterMenu}>
                  <path tabIndex="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                {" "}
                {Tasks.cluster_name}
                <div onClick={() => setClusterdropDown(false)} onMouseLeave={() => setClusterdropDown(true)} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                  <div className={`absolute ${ClusterdropDown && 'hidden'} right-2 z-10 w-48 text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                      {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">{props.user_details.name}</a> */}
                      <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-1">Edit Cluster</Link>
                      <Link href="/account" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-2">Remove all tasks</Link>
                      <button type="submit" className="hover:bg-slate-100  hover:text-red-600 text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Delete Cluster</button>
                    </div>
                  </div>
                </div>
              </div>
              <form className="w-full" onSubmit={(e) => { e.preventDefault(), addTask() }}  >
                <div className="flex items-center border-2 border-orange-300 py-2 mx-3 rounded-md">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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

              <p className="p-4 font-bold text-black text-md ">
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
                </ul>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // Parse cookies from the request headers
  const cookies = parse(context.req.headers.cookie || "");
  const token = cookies.access_token;

  try {
    // Verify the JWT token
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded._id);
    let user = await User.findOne({ _id: decoded._id });
    // let user_Cluster = await Cluster.findOne({ user_id: user._id });
    // console.log(user_Cluster);

    if (user) {
      decoded = { name: user.name, email: user.email };
      // console.log(decoded);
    }

    return {
      props: {
        user_details: decoded,
        // Cluster: user_Cluster.Cluster
      },
    };
  } catch (err) {
    // Handle invalid or expired token
    return {
      redirect: {
        destination: "/login", // Redirect to login page if the token is invalid or expired
        permanent: false,
      },
    };
  }
}

export default Dashboard;
