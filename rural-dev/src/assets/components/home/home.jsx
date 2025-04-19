import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/marketplace');  
    };
    const handleClick2 = () => {
        navigate('/job');  
    };
    const handleClick3 = () => {
        navigate('/workshop');  
    };

    return (
        <>
 <section className="flex flex-col items-center justify-center px-4 py-12 md:px-8 md:py-16 text-[#000000]">
  {/* Main Content Container */}
  <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6">
    {/* Left Content */}
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6 w-full">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 md:mb-4 text-black">
          Empowering Women to Build, Grow, and Thrive – Together.
        </h1>
        <p className="text-base md:text-lg mx-auto max-w-2xl">
          A one-stop platform for women entrepreneurs, job seekers, and career returners.
          Access funding, mentorship, jobs, and tools to succeed.
        </p>
      </div>

      {/* 📸 Carousel - Full Width */}
      <div className="mb-6 w-full h-90 max-w-6xl">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          {/* Slide 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
            <img src="image3.jpeg" alt="Women entrepreneurs working" className="w-full h-90 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-start gap-2">
                <span className="text-xl text-white">🚀</span>
                <p className="text-white font-medium text-sm">Launch & Grow Your Business</p>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
            <img src="image2.jpeg" alt="Women at workplace" className="w-full h-90 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-start gap-2">
                <span className="text-xl text-white">💼</span>
                <p className="text-white font-medium text-sm">Find Flexible Jobs</p>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity"></div>
            <img src="image1.jpeg" alt="Women in workshop" className="w-full h-90 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-start gap-2">
                <span className="text-xl text-white">🎓</span>
                <p className="text-white text-center font-medium text-sm">Learn & Upskill</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col w-full max-w-6xl gap-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <button onClick={handleClick} className="px-4 py-2 bg-[#1f375d] text-white font-semibold rounded-lg hover:bg-[#addfde] hover:text-black hover:shadow-md transition-all duration-200 w-full">
            Join as Entrepreneur
          </button>
          <button onClick={handleClick2} className="px-4 py-2 bg-[#1f375d] text-white font-semibold rounded-lg hover:bg-[#addfde] hover:text-black hover:shadow-md transition-all duration-200 w-full">
            Find Jobs
          </button>
          <button onClick={handleClick3} className="px-4 py-2 bg-[#1f375d] text-white font-semibold rounded-lg hover:bg-[#addfde] hover:text-black hover:shadow-md transition-all duration-200 w-full">
            Be a Mentor
          </button>
        </div>
      </div>

      {/* 💬 Info + Partners Section */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-6 py-10 gap-6">
        {/* Left: Lorem Ipsum */}
        <div className="w-full md:w-1/2 p-6 border-2 border-blue-500 rounded-lg">
          <h1 className='text-center font-bold'>About Us</h1>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum perspiciatis consequuntur eius ipsum corporis, numquam illo ab earum dolor minus, impedit expedita dignissimos reprehenderit laudantium nostrum repudiandae repellendus at alias.
          </p>
        </div>

        {/* Right: Supporting Companies */}
        <div id="aboutUs" className="w-full md:w-1/2 flex flex-col justify-center border-2 border-blue-500 rounded-lg p-6">
  <div className="text-center md:text-left">
    <p className="text-black/80 mb-4 text-base sm:text-lg">
      Supported by <strong>10,000+</strong> women-led businesses
    </p>
    <div className="flex flex-wrap justify-center md:justify-start gap-2">
      <span className="text-sm px-3 py-1.5 bg-[#1f375d] rounded-full hover:bg-[#addfde] hover:text-black transition-colors text-white cursor-pointer">
        Forbes
      </span>
      <span className="text-sm px-3 py-1.5 bg-[#1f375d] rounded-full hover:bg-[#addfde] hover:text-black transition-colors text-white cursor-pointer">
        UN Women
      </span>
      <span className="text-sm px-3 py-1.5 bg-[#1f375d] rounded-full hover:bg-[#addfde] hover:text-black transition-colors text-white cursor-pointer">
        She Leads
      </span>
    </div>
  </div>
</div>

      </div>

    </div>
  </div>
</section>

        </>
    );
}

export default Home;