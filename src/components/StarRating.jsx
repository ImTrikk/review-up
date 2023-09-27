import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { buildUrl } from "../../utils/buildUrl";

const StarRating = ({ rating, setRating, disabled = false }) => {
 const [hover, setHover] = useState(null);

 const handleStarRating = async (event) => {
  event.preventdefault();

  // let response = await fetch(buildUrl())
 };

 return (
  <div className="flex space-x-2 items-center">
   {[...Array(5)].map((star, i) => {
    const ratingValue = i + 1;
    let color;
    if (!disabled) {
     if (hover) {
      color =
       ratingValue <= (hover || rating) ? "text-yellow-300" : "text-gray-200";
     } else {
      color =
       ratingValue <= (hover || rating) ? "text-yellow-300" : "text-gray-200";
     }
    } else {
     color = "text-gray-200 opacity-40";
    }
    return (
     <label
      key={i}
      className="transform transition hover:scale-125 ease-in-out lg:text-2xl"
     >
      <input
       type="radio"
       name="rating"
       className="hidden"
       value={ratingValue}
       disabled={disabled}
       onClick={() => setRating(ratingValue)}
      />
      <FaStar
       className={
        `${
         !disabled && "active:text-brown"
        }  cursor-pointer transition ease-in-out ` + color
       }
       size={16}
       onMouseEnter={() => setHover(ratingValue)}
       onMouseLeave={() => setHover(null)}
      />
     </label>
    );
   })}
  </div>
 );
};

export default StarRating;
