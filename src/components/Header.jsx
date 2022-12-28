import React from "react";

function Header() {
  return (
    <div>
      <div class="isolate bg-white">
        <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
        <div class="px-6 pt-6 lg:px-8">
          <div>
            <nav
              class="flex h-9 items-center justify-between"
              aria-label="Global"
            >
              <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global"></div>

              <div class=" lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                <h1 className="text-3xl font-bold sm:text-center sm:text-3xl">
                  Contact Form
                </h1>
              </div>
              <div class=" lg:flex lg:min-w-0 lg:flex-1 lg:justify-end"></div>
            </nav>
          </div>
        </div>
      </div>

      <hr style={{ marginTop: 10 }} />
    </div>
  );
}

export default Header;
