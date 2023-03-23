import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../components/loaders/Loading";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // two data will be shown per page
  const { isLoading, data: { count, users } = {} } = useQuery({
    queryKey: ["repoData", currentPage],
    queryFn: () =>
      axiosInstance
        .get(`users?limit=${pageSize}&page=${currentPage}`)
        .then((res) => res.data),
  });
  const pages = Math.ceil(count / pageSize);

  if (isLoading) return <Loading />;

  return (
    <section className="p-8">
      <div className="flex justify-between align-middle pb-8">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 align-middle">
          <h3>Age Range</h3>
          <h3>Block All</h3>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name & Role</th>
              <th>Email & Phone</th>
              <th>Age</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input type="checkbox" value={user._id} className="checkbox" />
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
    </section>
  );
};

export default AllUsers;
