import React from 'react'


function TutorCard({ image, name, address, subjects,classes,board,medium}) {
  return (
    <div className="card card-side bg-white text-black/100 shadow-xl w-[550px] h-[220px] my-5 mx-5">
  <figure>
    <img
      src={image}
      alt="Movie" />
  </figure>

  <div className="card-body flex flex-col justify-center items-start ml-2 gap-2">

    <h2 className="card-title">{name}</h2>
    <h4> <span>{classes}th class</span> | <span>{board}</span>  | <span>{medium}</span> </h4>
    <div className="flex gap-2 flex-wrap">
      {subjects.map((subject, index) => (
      <p key={index} className="px-3 py-2  text-md max-w-fit rounded-xl bg-white text-black/50 shadow-lg">{subject}</p>
    ))}
    </div>
    <p>{address}</p>
    <p>⭐⭐⭐⭐⭐</p>
    <div className="card-actions justify-start">
      <button className="btn btn-primary">Visit</button>
      <button className="btn btn-primary">Check Location</button>
    </div>
  </div>
</div>
  );
}

export default TutorCard