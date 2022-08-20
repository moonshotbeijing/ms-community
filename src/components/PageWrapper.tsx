import React, { FunctionComponent } from "react";
import Navbar from "./Navbar";

type Props = {
  children: any;
};

const PageWrapper: FunctionComponent<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl tracking-tight font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {children}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
