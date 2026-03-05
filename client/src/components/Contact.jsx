import React from "react";
import { GiPostOffice } from "react-icons/gi";

function Contact() {
  return (
    <div className="justify-center items-center flex">
      <div className="w-250 max-w-[350px] flex-row text-2xl border-gray-800 items-center justify-center py-2 px-4 ">
        <p className="w-250 flex gap-2 text-2xl max-w-[350px] h-250 justify-center mt-2">
          Tomasz Szopa
        </p>

        <a
          className="w-250 flex gap-2 text-base max-w-[350px] h-250 justify-center hover:text-pink-600 cursor-pointer mt-2 "
          href="mailto:shopa.tomek@gmail.com"
        >
          shopa.tomek@gmail.com
          <GiPostOffice></GiPostOffice>
        </a>

        <a
          className="w-250 flex gap-2 text-base max-w-[350px] font-semibold hover:text-orange-500 h-250 justify-center mt-2"
          href="http://gitlab.com/shopa.tomek"
        >
          My projects
        </a>
      </div>
    </div>
  );
}

export default Contact;
