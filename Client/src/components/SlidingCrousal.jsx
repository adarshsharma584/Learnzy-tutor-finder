import React from 'react'

import "swiper/css";

function SlidingCrousal({name,image,subjects,rating}) {
  return (
    
   
   <div className="flex-shrink-0 w-full bg-blue-600 md:w-1/3 p-4">
     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
       <img src={image} alt={name} className="w-full h-48 object-cover object-top" />
       <div className="p-6">
         <h3 className="text-xl font-bold text-gray-800">{name}</h3>
         <div className="flex flex-wrap gap-2 mt-2">
          {subjects.map((subject) => (
            <span key={subject} className="px-3 py-1 bg-sky-100 text-sky-800 text-sm font-medium rounded-full">
               {subject}
             </span>
           ))}
         </div>
        <div className="flex items-center mt-4">
          {'⭐'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
      </div>
    </div>
  </div>
        

  
  )
}

export default SlidingCrousal