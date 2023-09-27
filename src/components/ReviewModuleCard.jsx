import StarRating from "./StarRating";

export const ReviewModuleCard = () => {
 return (
  <>
   <div className="border border-gray-200 w-[300px] rounded h-[300px] shadow-lg">
    <div className="p-3">
     <div className="bg-primaryColor rounded h-[140px]"></div>
     <div className="pt-2">
      <h1 className="font-black text-xl text-primaryColor">IT 109</h1>
      <p className="text-sm font-medium text-gray-600">
       Web Systems and Integration
      </p>
      <p className="text-xs text-gray-600">
       By: Patrick James Dionen
      </p>
     </div>
     <div className="flex items-center justify-between mt-8">
      <div className="text-primaryColor text-xs flex items-center gap-2">
       Rating:
       {/* <StarRating/> */}
      </div>
      <button className="bg-primaryColor text-xs text-white rounded h-7 px-2 ">
       ReviewUP
      </button>
     </div>
    </div>
   </div>
  </>
 );
}