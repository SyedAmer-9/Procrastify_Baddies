import React from 'react'

export default function TaskFilter({setFilter}) {
  return (
    <div className='flex justify-center gap-2 my-4'>
        <button onClick={()=> setFilter('all')} className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-600">
            All
        </button>
        <button onClick={()=> setFilter('active')} className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-600">
            Active
        </button>
        <button onClick={()=> setFilter('completed')} className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-600">
            Completed
        </button>
    </div>
  )
}
