import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ReactFileReader from "react-file-reader";
import Header from "./Header";
const url =
  "http://localhost:3000/contactform-app" ||
  "https://jyotij-2021.github.io/contactform-app";

function AddContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsup, setIsWhatsUp] = useState("");
  const [profile_img, setProfileImg] = useState("");
  const [message, setMessage] = useState(false);
  const [img_name, setImgName] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const handleSubmit = () => {
    if (
      name !== " " &&
      phone !== "" &&
      type !== "" &&
      isWhatsup !== "" &&
      profile_img !== ""
    ) {
      const data = {
        id: small_id,
        name: name,
        phone: phone,
        type: type,
        isWhatsup: isWhatsup,
        profile_img: profile_img,
      };

      const getItems = localStorage.getItem("contact-list");
      const results = JSON.parse(getItems);
      const contactList = results || [];
      contactList.push(data);
      localStorage.setItem("contact-list", JSON.stringify(contactList));
      setMessage(true);

      setTimeout(() => {
        setMessage(false);

        window.location.href = url;
      }, 2000);
    } else {
      alert("Please fill all the required field!");
    }
  };

  const handleFiles = (files) => {
    setImgName(files.fileList[0].name);
    setProfileImg(files.base64);
  };

  return (
    <div>
      <Header />
      <div className=" lg:flex lg:min-w-0 lg:flex-1 mt-12 lg:justify-center">
        <h1 className="underline decoration-2 text-2xl font-bold sm:text-center sm:text-2xl">
          Add Contact
        </h1>
      </div>
      <div className="relative mx-auto mt-8 w-full justify-center flex max-w-container px-4 sm:px-6 lg:px-8 ">
        <form className="w-full max-w-lg bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="name"
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="phone"
              >
                Phone
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="phone"
                type="text"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                maxLength={10}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="type"
              >
                Type
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                id="type"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
                className="bg-white border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              >
                <option defaultValue>Choose a type</option>
                <option value="1">Personal</option>
                <option value="2">Office</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="isWhatsup"
              >
                Is Whatsup
              </label>
            </div>
            <div className="md:w-2/3 flex">
              <div className="flex items-center ">
                <input
                  id="default-radio-1"
                  type="radio"
                  name="isChecked"
                  onChange={(e) => {
                    setIsWhatsUp(e.target.value);
                  }}
                  required
                  checked={isWhatsup === "True"}
                  value="True"
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 "
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  True
                </label>
              </div>
              <div className="flex items-center ml-4">
                <input
                  id="default-radio-2"
                  type="radio"
                  name="isChecked"
                  onChange={(e) => {
                    setIsWhatsUp(e.target.value);
                  }}
                  required
                  checked={isWhatsup === "False"}
                  value="False"
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  False
                </label>
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="profile_img"
              >
                Profile Image
              </label>
            </div>
            <div className="md:w-2/3">
              <ReactFileReader
                handleFiles={handleFiles}
                fileTypes={[".png", ".jpg"]}
                base64={true}
              >
                {img_name === "" ? (
                  <span
                    style={{ cursor: "pointer" }}
                    className="bg-white md:text-left appearance-none border border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  >
                    Choose a image(.png or .jpg)
                  </span>
                ) : (
                  img_name
                )}
              </ReactFileReader>
            </div>
          </div>

          <div className="md:flex mt-10 md:items-center">
            <div className="md:w-2/3 text-center">
              <button
                className="shadow  hover:bg-purple-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
                type="button"
              >
                <Link to={"/"}> Cancel</Link>
              </button>
            </div>
            <div className="md:w-2/3 text-center">
              <button
                className="shadow bg-black hover:bg-black-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </form>

        {message === true ? (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            style={{ marginTop: "20%" }}
            className="fixed flex  justify-center top-20 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-6 text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Contact Information Added Successfully.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AddContact;
