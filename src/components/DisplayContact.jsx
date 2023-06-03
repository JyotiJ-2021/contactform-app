import React, { useEffect, useState } from "react";
import Header from "./Header";
import { _Url } from "../config";

function DisplayContact() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [dataValue, setDataValue] = useState(false);

  useEffect(() => {
    try {
      const result = JSON.parse(localStorage.getItem("contact-list"));

      if (
        result !== null &&
        result !== undefined &&
        result !== "" &&
        result.length > 0
      ) {
        setData(result);
      }
    } catch (error) {}
  }, []);

  const handleDeleteOption = (value) => {
    setMessage(true);
    setDataValue(value);
  };

  const handleDelete = (value) => {
    const result = JSON.parse(localStorage.getItem("contact-list"));
    setMessage(false);
    if (
      result !== null &&
      result !== undefined &&
      result !== "" &&
      result.length > 0
    ) {
      result.splice(value, 1);

      setData(result);
      JSON.parse(localStorage.setItem("contact-list", JSON.stringify(result)));

      window.location.href = "/";
    }
  };
  let blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  let reqs = ["gym", "school", "store"];

  // console.log(apartmentHunting(blocks, reqs));
  function apartmentHunting(blocks, reqs) {
    let arr = [];
    for (let i = 0; i < blocks.length; i++) {
      arr[i] = getNewSteps(i, blocks, reqs);
    }

    return arr.indexOf(Math.min(...arr));
  }

  function getNewSteps(index, blocks, reqs) {
    let min = 0;
    let obj = {};

    for (let key in blocks[index]) {
      obj[key] = blocks[index][key];
    }

    let left = index;
    let right = index;

    while (left >= 0 || right < blocks.length) {
      let leftobj = left >= 0 ? blocks[left] : {};
      let rightobj = right < blocks.length ? blocks[right] : {};
      let currObj = getMergeObj(leftobj, rightobj, obj, reqs);
      if (containsAllReq(currObj, reqs)) {
        return min;
      }
      min++;
      left--;
      right++;
    }

    return min;
  }

  function getMergeObj(left, right, currObj, reqs) {
    for (let key of reqs) {
      currObj[key] = left[key] || right[key] || currObj[key] ? true : false;
    }

    return currObj;
  }

  function containsAllReq(currObj, reqs) {
    for (let i = 0; i < reqs.length; i++) {
      let a = reqs[i];
      if (currObj[a] === false) return false;
    }
    return true;
  }

  return (
    <div>
      <Header />
      <div className="isolate w-full bg-white">
        <main>
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pt-20 pb-10 sm:pt-10 sm:pb-10">
              <div>
                <div>
                  <h1 className="underline decoration-2 text-2xl font-bold sm:text-center sm:text-2xl">
                    Contact List
                  </h1>
                </div>
              </div>
            </div>
            <div className=" lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              <a
                href={`/add-contact`}
                target="_self"
                style={{ float: "right" }}
                className=" mb-10 inline-block rounded-lg px-2 py-1 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                + Add New Contact
              </a>
            </div>
            <div className="flex justify-center w-full">
              <table className="table-fixed border w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Type</th>
                    <th className="border px-4 py-2">Is WhatApp</th>
                    <th className="border px-4 py-2">Profile Picture</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      console.log(item.type);
                      return (
                        <tr key={index}>
                          <td className="border px-4 py-2 text-center">
                            {item.name}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.phone}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.type === "1" ? "Personal" : "Office"}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.isWhatsup}
                          </td>
                          <td className="border px-4 py-2 flex justify-center ">
                            <img
                              src={item.profile_img}
                              alt="Profile"
                              width={"70px"}
                              height="70px"
                            />
                          </td>
                          <td className="border px-4 py-2 text-center">
                            <a
                              href={`/edit-contact/${item.id}`}
                              target="_self"
                              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold leading-6 text-teal-400   ring-teal-900/10 hover:ring-teal-900/20"
                            >
                              Edit
                            </a>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteOption(item)}
                              className="inline-block rounded-lg px-3 py-1 mx-2 text-sm font-semibold leading-6 text-red-600  ring-teal-900/10 hover:ring-teal-900/20"
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center">-</td>
                      <td className="border px-4 py-2 text-center">-</td>
                      <td className="border px-4 py-2 text-center">-</td>
                      <td className="border px-4 py-2 text-center">-</td>
                      <td className="border px-4 py-2 flex justify-center ">
                        -
                      </td>
                      <td className="border px-4 py-2 text-center">-</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {message === true ? (
            <div
              id="popup-modal"
              tabindex="-1"
              style={{ marginTop: "20%" }}
              className="fixed flex  justify-center top-20 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
            >
              <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this contact?
                    </h3>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      onClick={() => handleDelete(dataValue)}
                      className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes
                    </button>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      onClick={() => setMessage(false)}
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </div>
  );
}

export default DisplayContact;
