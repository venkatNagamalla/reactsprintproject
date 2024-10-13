import { FaSquareInstagram } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => (
    <footer id="contact" className="bg-black flex justify-center mt-8 px-3 py-2 text-white min-h-[90vh]">
        <section className="w-[90%] md:w-[85%]">
             <div className="flex h-[45%]  items-center py-8 justify-between">
                 <div className="w-[45%]  h-[100%]">
                 <h1 className="font-[560] text-md">BE THE FIRST TO KNOW</h1>
                 <p className="text-xs mt-2 font-[300] text-[#ffffffdb]">Sign up for updates from V-Mart</p>
                 <div className="h-6 flex items-center mt-5">
                    <input className="outline-none px-2 text-black h-[100%] text-sm w-[100px] md:w-[180px]" placeholder="E-mail.." type="email"/>
                    <button className="border text-[8px] px-1  text-[#fff5] border-[#fff5] h-[100%]" type="button">SUBSCRIBE</button>
                 </div>
                 </div>
             <div className="w-[45%] h-[100%]">
                <div>
                <h1 className="font-[560] text-md">CONTACT US</h1>
                <p className="text-xs mt-2 font-[300] text-[#ffffffdb]">+44 221 133 5360</p>
                <p className="text-xs mt-1 font-[300] text-[#ffffffdb]">customercare@vmart.com</p>
                </div>
                <div className="mt-5">
                    <h1 className="font-[560] text-md">CURRENCY</h1>
                    <div className="flex items-center mt-2">
                    <img className="w-[25px] rounded-xl h-[25px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1t_jDEXicv3KNzLcodqcWfd15HE6F7FWYg&s" alt="flag" />
                    <h3 className="font-[500] text-sm  ml-1">. USD</h3>
                    </div> 
                    <p className="text-xs mt-3 font-[300] text-[#ffffffdb]">Transactions will be completed in Euros and a currency reference is available on hover</p>                   
                </div>
             </div>
             </div>
             <hr className="mt-5 md:mt-8 mb-8" />
             <div className="mt-5 md:flex justify-between md:items-center">
                 
                 <div className="flex md:w-[50%] flex-items justify-between">
                 <div>
                 <h1 className="font-[560] text-md mb-2">V-Mart</h1>
                <ul>
                    <li className="text-xs text-[#ffffffdb] mb-1">About Us</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Stories</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Artisans</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Boutiques</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Contact Us</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">EU Compliances Docs</li>
                </ul>
                 </div>
                 <div>
                 <h1 className="font-[560] text-md mb-2">QUICK LINKS</h1>
                <ul>
                    <li className="text-xs text-[#ffffffdb] mb-1">Orders & Shipping</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Join/Login as a Seller</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Payment & Pricing</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Return & Refunds</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">FAQs</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Privacy Policy</li>
                    <li className="text-xs text-[#ffffffdb] mb-1">Terms & Conditions</li>
                </ul>
                 </div>
                 </div>

                 <div className="mt-4 md:mt-0">
                    <h1 className="font-[560] text-md mb-2">FOLLOW US</h1>
                    <div className="flex items-center">
                        <FaSquareInstagram className="mr-2" />
                        <GrLinkedin/>
                    </div>
                    <h3 className="mt-8">V Mart ACCEPTS All Cards</h3>
                 </div>
             </div>
        </section>
    </footer>
)

export default Footer