import React, { useEffect, useState } from 'react'

const Task = (props) => {
	// let val;
	// useEffect(() => {
	// 	if (!props.task){
	// 		val = true
	// 	}
	// }, [])

	const [dropDown, setdropDown] = useState(true);
	const [State1, setState1] = useState(props.task && props.task.is_completed)
	return (
		<li className="py-2 text-gray-600 my-2 border-b-2 dark:border-gray-800 border-gray-100 dark:text-white bg-slate-50 dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer" >
			<div className='rounded cursor-pointer'>
				<input className="hidden" type="checkbox" id="task_1" checked={State1} />
				<label className="flex items-center justify-between h-10 px-2 cursor-pointer" htmlFor="task_1">
					<div className='flex' onClick={() => { setState1(!State1), props.toggleComplete(props.task._id, State1, props.task.task_name) }}>
						<span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
							<svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path tabIndex="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
						</span>
						<span className="ml-4 text-md">{props.task && props.task.task_name}</span>
					</div>

					<div></div>
					<div onClick={() => setdropDown(false)} onMouseLeave={() => setdropDown(true)}>

						<button>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
							</svg>

						</button>


						<div className={`absolute ${dropDown && 'hidden'} right-8 z-10 w-48 text-left origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
							<div className="py-1" role="none">
								{/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100  dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-0">Edit Task</a> */}
								<button onClick={() => { props.deleteTask(props.task._id) }} className="w-full text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 hover:text-red-600 text-left dark:hover:bg-gray-600 dark:text-white" role="menuitem" tabIndex="-1" id="menu-item-1">Delete</button>
								{/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-2">Remove from here</a>
						<button type="submit" className="hover:bg-slate-100 text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button> */}
							</div>
						</div>
					</div>
				</label>
			</div>
		</li>
	)
}

export default Task