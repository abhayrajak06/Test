import React from "react";

const HomePosts = () => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-10 mt-8  mb-10">
      <div className="flex justify-center items-center w-[30%] h-[200px]">
        <img
          src="https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=900&t=st=1703947991~exp=1703948591~hmac=5770d52bab6fea01d4019e3298127ae259ac0697c56b51ed74c889c5437f4bcf"
          alt=""
          className="h-full w-full object-cover rounded"
          style={{ minWidth: "12rem" }}
        />
      </div>
      <div className="flex flex-col w-[60%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          10 Uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex flex-wrap mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@showwowowowo</p>
          <div className="flex space-x-2">
            <p>30/12/2023</p>
            <p>08:24</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
          perspiciatis doloremque sunt nihil distinctio sapiente doloribus
          ullam, natus at dolor vel quaerat ratione, similique corporis.
          Repudiandae nemo iusto aspernatur hic.
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
