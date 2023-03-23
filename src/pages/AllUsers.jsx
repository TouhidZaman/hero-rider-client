import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../components/loaders/Loading";

const AllUsers = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // two data will be shown per page
  const [list, setList] = useState([]);
  const { isLoading, data: { count, users } = {} } = useQuery({
    queryKey: ["repoData", currentPage, search, pageSize, ageRange],
    queryFn: () =>
      axiosInstance
        .get(
          `users?limit=${pageSize}&page=${currentPage}&search=${search}&ageBetween=${ageRange}`
        )
        .then((res) => res.data),
  });
  const pages = Math.ceil(count / pageSize);

  //setting search after 1 second of typing
  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(query), 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);

  //Toggle select item
  const toggleChecked = (e) => {
    const selectedId = e.target.value;
    const newList = [...list];
    const index = list.indexOf(selectedId);
    if (index === -1) {
      newList.push(selectedId);
      setList(newList);
    } else {
      newList.splice(index, 1);
      setList(newList);
    }
  };

  return (
    <section className="p-8">
      <div className="flex justify-between align-middle pb-8">
        <input
          type="text"
          placeholder="Type name/email/phone to search"
          className="rounded-lg w-full max-w-xs"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex gap-2 align-middle">
          <select
            onChange={(e) => setAgeRange(e.target.value)}
            className="rounded-lg w-full max-w-xs"
          >
            <option value="" selected>
              Select age range
            </option>
            <option value="18-25">18-25</option>
            <option value="26-30">26-30</option>
            <option value="31-35">31-35</option>
            <option value="36-40">36-40</option>
            <option value="41-60">41-60</option>
          </select>
          <button className="btn btn-ghost">Block Selected - ({list.length})</button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name & Role</th>
                <th>Email & Phone</th>
                <th>Age</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className={user?.status === "blocked" ? "text-red-400" : ""}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        checked={list.includes(user._id)}
                        value={user._id}
                        className="checkbox"
                        onChange={toggleChecked}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              user.photoURL ||
                              "https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                        <div className="text-sm opacity-50">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.phoneNumber}
                    </span>
                  </td>
                  <td>{user.age}</td>
                  <th>{user.address}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-14">
            <div className="btn-group">
              <button
                disabled={!currentPage}
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                className="btn btn-outline"
              >
                Previous page
              </button>
              {[...Array(pages).keys()].map((number) => (
                <button
                  type="button"
                  className={`btn btn-outline ${
                    number === currentPage ? "btn-active" : ""
                  }`}
                  key={number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                className="btn btn-outline"
                disabled={pages === currentPage + 1}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllUsers;
