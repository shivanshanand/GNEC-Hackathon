import React from "react";

const UserReview = ({ img, name, testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 mx-4 flex-shrink-0">
      <div className="flex flex-col items-center">
        <img
          src={img}
          alt={name}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-indigo-700 text-center">
          {name}
        </h3>
        <p className="text-lg text-gray-600 mt-4 text-center">{testimonial}</p>
      </div>
    </div>
  );
};

export default UserReview;
