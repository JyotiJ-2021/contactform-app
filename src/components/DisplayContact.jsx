import React, { useEffect, useState } from "react";
// import { _Url } from "../config";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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

  return (
    <div>
      <div className="isolate w-full bg-white">
        <main>
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-3xl pt-20 pb-10 sm:pt-10 sm:pb-10">
              <div>
                <div>
                  <h1 className="decoration-2 text-2xl font-bold sm:text-center sm:text-2xl">
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
                className="bg-indigo-400 mb-10 inline-block rounded-lg px-2 py-2 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                + Add New Contact
              </a>
            </div>
            <div className="flex justify-center w-full">
              <Table className="table-fixed border w-full">
                <Thead>
                  <Tr className="bg-indigo-400">
                    <Th className="border px-4 py-2">Name</Th>
                    <Th className="border px-4 py-2">Phone</Th>
                    <Th className="border px-4 py-2">Type</Th>
                    <Th className="border px-4 py-2">Is WhatApp</Th>
                    <Th className="border px-4 py-2">Profile Picture</Th>
                    <Th className="border px-4 py-2">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td className="border px-4 py-2 text-center">
                            {item.name}
                          </Td>
                          <Td className="border px-4 py-2 text-center">
                            {item.phone}
                          </Td>
                          <Td className="border px-4 py-2 text-center">
                            {item.type === "1" ? "Personal" : "Office"}
                          </Td>
                          <Td className="border px-4 py-2 text-center">
                            {item.isWhatsup}
                          </Td>
                          <Td className="border px-4 py-2 flex justify-center ">
                            <img
                              src={item.profile_img}
                              alt="Profile"
                              width={"70px"}
                              height="70px"
                            />
                          </Td>
                          <Td className="border px-4 py-2 text-center">
                            <a
                              href={`/edit-contact/${item.id}`}
                              target="_self"
                              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold leading-6 text-indigo-400   ring-teal-900/10 hover:ring-teal-900/20"
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
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td className="border px-4 py-2 text-center">-</Td>
                      <Td className="border px-4 py-2 text-center">-</Td>
                      <Td className="border px-4 py-2 text-center">-</Td>
                      <Td className="border px-4 py-2 text-center">-</Td>
                      <Td className="border px-4 py-2 flex justify-center ">
                        -
                      </Td>
                      <Td className="border px-4 py-2 text-center">-</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
          </div>

          {message === true ? (
            <>
              <div className="bg-blur"></div>
              <div
                id="popup-modal"
                tabindex="-1"
                style={{ marginTop: "20%" }}
                className="fixed flex  justify-center top-20 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
              >
                <div className="relative w-full h-full max-w-md md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 text-center">
                      <h4 className="mb-5 decoration-2 text-2xl font-bold sm:text-center sm:text-2xl">
                        Delete Contact
                      </h4>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this contact?
                      </h3>
                      <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={() => setMessage(false)}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No
                      </button>
                      <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={() => handleDelete(dataValue)}
                        className="mx-4 bg-indigo-400 text-white bg-slate-600 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </main>
      </div>
    </div>
  );
}

export default DisplayContact;
