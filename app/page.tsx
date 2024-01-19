"use client"

import Navbar from "./ui/navbar";
import Card from "./ui/spaces-card";


export default function Home() {
  return (
    <>
      <Navbar/>
   
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
     
 

    </div>
  </div>
</div>
<Card />
  
    </>
  );
}
