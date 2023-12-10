import * as React from "react";

function Signup(props) {
  return (
    <div className="bg-white flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <div className="items-start shadow-2xl bg-white flex w-[470px] max-w-full flex-col mt-44 mb-96 px-5 py-11 rounded-3xl max-md:my-10">
        <div className="text-black text-3xl font-medium self-stretch whitespace-nowrap max-md:max-w-full">
          Sign up
        </div>
        <div className="text-black text-base self-stretch whitespace-nowrap mt-8 max-md:max-w-full">
          If you already have an account register
        </div>
        <div className="text-sky-500 text-base self-stretch mt-3.5 max-md:max-w-full">
          <span className=" text-black">You can </span>
          <button className="font-semibold text-sky-500">Login here !</button>
        </div>
        <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10">
          Email
        </div>
        <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch gap-3">
            <img
                loading="lazy"
                src="./icon/mail.svg"
                className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
            />
           <input
                type="text"
                placeholder="Enter your email address"
                className="text-slate-900 text-base grow border-none outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="bg-neutral-400 self-stretch flex w-full shrink-0 h-0.5 flex-col mt-2.5 max-md:max-w-full" />
        <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10">
          Username
        </div>
        <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch gap-3">
            <img
                loading="lazy"
                src="./icon/user.svg"
                className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
            />
            <input
                type="text"
                placeholder="Enter your User name"
                className="text-slate-900 text-base grow border-none outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="bg-neutral-400 self-stretch flex w-full shrink-0 h-0.5 flex-col mt-2.5 max-md:max-w-full" />
        <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10">
          Password
        </div>
        <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch gap-3">
            <img
              loading="lazy"
              src="./icon/padlock.svg"
              className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
            />
            <input
                type="text"
                placeholder="Enter your Password"
                className="text-slate-900 text-base grow border-none outline-none bg-transparent"
            />
          </div>
          <img
            loading="lazy"
            src="./icon/invisible.svg"
            className="aspect-square object-contain object-center w-3.5 overflow-hidden shrink-0 max-w-full mt-1"
          />
        </div>
        <div className="bg-neutral-400 self-stretch flex w-full shrink-0 h-0.5 flex-col mt-2.5 max-md:max-w-full" />
        <div className="text-neutral-400 text-sm font-medium self-stretch whitespace-nowrap mt-14 max-md:max-w-full max-md:mt-10">
          Confrim Password
        </div>
        <div className="self-stretch flex w-full justify-between gap-5 mt-5 items-start max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch gap-3">
            <img
              loading="lazy"
              src="./icon/padlock.svg"
              className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
            />
            <input
                type="text"
                placeholder="Confrim your Password"
                className="text-slate-900 text-base grow border-none outline-none bg-transparent"
            />
          </div>
          <img
            loading="lazy"
            src="./icon/invisible.svg"
            className="aspect-square object-contain object-center w-3.5 overflow-hidden shrink-0 max-w-full mt-1.5"
          />
        </div>
        <div className="bg-neutral-400 self-stretch flex w-full shrink-0 h-0.5 flex-col mt-2.5 max-md:max-w-full" />
        <button className="text-white text-lg font-medium whitespace-nowrap shadow-lg bg-sky-500 self-stretch flex items-center justify-center mt-12 px-16 py-5 rounded-[32px] max-md:max-w-full max-md:mt-10 max-md:px-5">
            Register
        </button>

      </div>
    </div>
  );
}
export default Signup;
