import React from 'react'
import Image from "next/image";

const Cluster = (props) => {
  return (
    <div onClick={() => props.changeCluster(props.clusterId)} className="flex cursor-pointer items-center justify-between p-3 mb-2 bg-orange-200 hover:bg-orange-300 rounded dark:bg-orange-400 dark:hover:bg-orange-500">
      <div className="p-2 bg-white rounded-lg">
        <Image alt='jghfgghfduh' src={'/192.png'} width={20} height={20} />
      </div>
      <div className="flex items-center justify-between w-full ml-2">
        <p>{props.name}</p>

        <span className="px-4 py-1 text-base rounded-full dark:rounded-lg text-white-900 bg-orange-500  dark:bg-gray-200 ">
          {props.status}
        </span>

      </div>
    </div>
  )
}

export default Cluster