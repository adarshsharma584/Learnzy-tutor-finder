import React from 'react'
import TutorCard from '../components/TutorCard'
import SearchInput from '../components/SearchInput'
import {fetchAllTuitions} from './../redux/thunk/tuitionThunk';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';

function Tutions() {
  const dispatch = useDispatch();
  
  useEffect(() => {
   const tuitions = dispatch(fetchAllTuitions());
   console.log(tuitions);
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-gray-600 mt-16 mb-2 mx-auto w-full text-center text-3xl font-bold font-[verdana]">Find the Perfect Tutor for Your Learning Journey</h1>
      <p className="text-sm text-gray-600">Search and connect with verified tutors near you. Filter by subject, classes  to find the right match.</p>
    <SearchInput/>
    <div className= "grid grid-cols-2 gap-2 max-w-[90vw] my-10 rounded-md bg-gray-100 shadow-4xl mx-auto">
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        <TutorCard 
        image="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
        name="aditya parihar" 
        classes="1-12"
        board="MP-board"
        medium="English"
        address="43,ambethkar nagar nanakheda ujjain" 
        subjects={["maths","physics","bio"]} 
        />
        
    </div>
    </div>
  )
}

export default Tutions