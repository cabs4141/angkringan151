import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const BannerMobile = () => {
  return (
    <>
      <div className="relative xl:hidden isolate flex flex-row items-center  gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5  font-opensauce">
        <div aria-hidden="true" className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl">
          <div
            style={{
              clipPath: "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div aria-hidden="true" className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl">
          <div
            style={{
              clipPath: "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="flex items-center gap-x-4 gap-y-2 overflow-hidden whitespace-nowrap ">
          <p className="text-sm leading-6 text-gray-900 animate-marquee inline-block ">
            <strong className="font-semibold ">Selamat Datang di Angkringan 151</strong>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
              <circle r={1} cx={1} cy={1} />
            </svg>
            Nikmati suasana santai sambil makan ditempat, atau pesan langsung dibawah
          </p>
        </div>
        {/* <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        </div> */}
      </div>
    </>
  );
};

export default BannerMobile;
