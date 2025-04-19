import React from "react";

export default function Footer() {
    
    return(
        <>
   <div class="bg-[#0c4c8a]">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 text-white flex flex-wrap justify-between">
        <div class="p-5">
            <div class="text-xs uppercase text-white/70 font-medium"></div>
            <a class="my-3 block font-extrabold text-white">Company 
            </a>
            
            <a class="my-3 block hover:text-white/80" href="/#aboutUs">About Us 
            </a>
            <a class="my-3 block hover:text-white/80" href="/contact">Contact 
            </a>
            
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-white/70 font-medium"></div>

            <a class="my-3 block font-extrabold text-white">Legal 
            </a>
            <a class="my-3 block hover:text-white/80" href="/#">Terms and conditions 
            </a>
            <a class="my-3 block hover:text-white/80" href="/#">Cookies policies
            </a>
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-white/70 font-medium"></div>

            <a class="my-3 block font-extrabold text-white">Services 
            </a>
            <a class="my-3 block hover:text-white/80" href="/aboutUs">Branding 
            </a>
            <a class="my-3 block hover:text-white/80" href="/#">Marketing 
            </a>
        </div>
        <div class="p-5">
            <div class="text-xs uppercase text-white/70 font-medium"></div>

            <a class="my-3 block hover:text-white/80" href="/#">XXX XXXX, lorem ipsum,abcd
            </a>

            <a class="my-3 block hover:text-white/80" href="/#">contact@company.com
            </a>
        </div>
    </div>
</div>
        </>
    );
}