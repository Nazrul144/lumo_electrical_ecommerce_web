import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaStar } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { CiTwitter } from "react-icons/ci";
import { LuShare2 } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Playfair_Display } from "next/font/google";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});





const ProductDetails = ({ params }) => {
  const { id } = params;

  const product = Object.values(productsData)
    .flat() // সব array একত্র করি
    .find((p) => p.id === Number(params.id)); // id number হিসেবে compare

  // Current category বের করা
  const currentCategory = Object.keys(productsData).find((category) =>
    productsData[category].some((p) => p.id === Number(id))
  );

  console.log(currentCategory);

  // Related products get করা (current product বাদ দিয়ে)
  const relatedProducts = currentCategory
    ? productsData[currentCategory].filter((p) => p.id !== Number(id))
    : [];

  return (
    <div className="mt-28 lg:px-20">
      <section>
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row  lg:gap-28">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
            <Image
              src={product?.image}
              alt={product?.name}
              width={500}
              height={500}
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left ">
            <h1 className="text-xl font-bold leading-none sm:text-4xl">
              {product?.name}
            </h1>
            <div className="mt-4 text-3xl text-orange-400 flex gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="text-gray-700">4.5 {"(212 reviews)"}</span>
            </div>
            <p className="mt-2 mb-8 text-lg sm:mb-12 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              autem delectus vero, perferendis distinctio voluptas veniam, quis
              neque earum dolores architecto quam magnam inventore harum a rerum
              officia? Ullam, expedita.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded text-white flex items-center gap-2
             bg-gradient-to-r from-[#088347] to-[#C6E824]
             transition-all duration-300 hover:scale-105
             shadow-lg hover:shadow-green-500/70 cursor-pointer"
              >
                <ImWhatsapp className="text-3xl text-white" />
                Contact via Whatsapp
              </Link>
            </div>
            <div className="flex items-center text-4xl mt-8 gap-4">
              <span className="text-2xl">Share</span>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <CiTwitter />
              </a>
              <a href="#">
                <LuShare2 />
              </a>
            </div>
            <Link href={"/categories"}>
              <button
                className="mt-8 px-6 py-2 relative rounded-lg font-semibold text-white flex items-center gap-2
             bg-gradient-to-r from-[#088347] to-[#C6E824]
             transition-all duration-300 hover:scale-105
             shadow-lg hover:shadow-green-500/70 cursor-pointer"
              >
                <MdKeyboardDoubleArrowLeft />
                Back to Categories
                {/* Neon green glow */}
                <span
                  className="absolute inset-0 rounded-lg pointer-events-none
                   bg-green-400 opacity-0 hover:opacity-50
                   blur-2xl mix-blend-lighten transition-all duration-300 "
                ></span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className={`${playfair.className} text-3xl text-center mb-6 text-green-900 font-bold`}>Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={300}
                    height={300}
                    className="object-contain h-48 w-full mb-4"
                  />
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

const productsData: Record<
  string,
  { id: number; name: string; image: string }[]
> = {
  "Circuit Breakers": [
    {
      id: 1,
      name: "Mini Circuit Breaker",
      image:
        "https://download.schneider-electric.com/files?p_Doc_Ref=HDB3w_IMG&p_File_Type=rendition_1500_jpg",
    },
    {
      id: 2,
      name: "Molded Case Circuit Breaker",
      image:
        "https://www.gses.com.au/wp-content/uploads/2017/10/Mccb-e1612398523722.jpg",
    },
    {
      id: 3,
      name: "Load Breaker",
      image:
        "https://vikiwat.com/userfiles/productimages/119955/product_large_141850.jpg",
    },
    {
      id: 4,
      name: "Vacuum Circuit Breaker",
      image:
        "https://image.made-in-china.com/2f0j00wPqbQWTzavoG/Vsg1-12-Vacuum-Circuit-Breaker-Indoor-Type.webp",
    },
    {
      id: 5,
      name: "SF6 Circuit Breaker",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/3/HG/XH/PI/11340491/sf6-circuit-breaker.jpg",
    },
    {
      id: 6,
      name: "Air Circuit Breaker",
      image:
        "https://iallway.com/wp-content/uploads/2024/02/78805a221a988e79ef3f.png",
    },
  ],

  "Switches & Sockets": [
    {
      id: 7,
      name: "Modern Wall Socket",
      image:
        "https://image.made-in-china.com/202f0j00oedquznRwAks/T3-Wholesale-New-Design-PC-Ultra-Thin-Wall-Switch-Socket-Modern-Luxury-Wall-Switch-Switches-and-Socket.webp",
    },
    {
      id: 8,
      name: "Smart Switch Board",
      image:
        "https://5.imimg.com/data5/HO/SJ/PD/SELLER-67963114/smart-switch-boards.jpg",
    },
    {
      id: 9,
      name: "Universal Plug",
      image:
        "https://gadgetbreeze.com.bd/wp-content/uploads/2025/05/Mcdodo-CP-614-100W-GaN-Universal-Travel-Adapter-with-100w-C-to-C-Cable-430x430.jpg",
    },
  ],

  "Wire & Cables": [
    {
      id: 10,
      name: "Electric Copper Cable",
      image: "https://m.media-amazon.com/images/I/81opAzJl5kL._SL1465_.jpg",
    },
    {
      id: 11,
      name: "Power Wire Bundle",
      image:
        "https://m.media-amazon.com/images/I/41QqyMrjZlS._UF1000,1000_QL80_.jpg",
    },
    {
      id: 12,
      name: "Armored Cable",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/11/AU/UJ/WJ/3446694/polycab-armored-cable.jpg",
    },
    {
      id: 13,
      name: "Coaxial Cable",
      image:
        "https://milcom.edu.au/wp-content/uploads/2019/10/coaxial-cable-1280x720.png",
    },
  ],

  "Distribution Boards": [
    {
      id: 14,
      name: "Electrical Panel Board",
      image:
        "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      id: 15,
      name: "Fuse Box",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
    {
      id: 16,
      name: "Load Center Pane",
      image:
        "https://www.eaton.com/content/dam/eaton/products/low-voltage-power-distribution-controls-systems/load-centers/panelboard-loadcenter.jpg",
    },
    {
      id: 17,
      name: "Meter Distribution Box",
      image: "https://y23.hongcdn.com/uploads/2203/pole-top-box-5-2-!m.jpg",
    },
    {
      id: 18,
      name: "Electrical Panel Board",
      image:
        "https://www.brilltech.co.in/images/products/img-control-panel-boards.jpg",
    },
    {
      id: 19,
      name: "Fuse Box",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/933ab82f179745c166ceafb62efece28.png_720x720q80.png",
    },
  ],

  "Smart Devices": [
    {
      id: 20,
      name: "Smart Home Hub",
      image:
        "https://blog-cdn.athom.com/uploads/2019/08/Homey-Pro-1-2000x1125.png",
    },
    {
      id: 21,
      name: "Smart Light Controller",
      image: "https://m.media-amazon.com/images/I/61njqiDYYPS._SL1500_.jpg",
    },
    {
      id: 22,
      name: "Smart Thermostat",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HQ2E2_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90",
    },
  ],

  "Power Tools": [
    {
      id: 23,
      name: "Electric Drill",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/b8541eec74b99941faf71a25548de3e8.jpg_960x960q80.jpg_.webp",
    },
    {
      id: 24,
      name: "Cordless Screwdriver",
      image:
        "https://admin.techshopbd.com/uploads/product/Cordless-Screwdriver-Set.jpg",
    },
    {
      id: 25,
      name: "Angle Grinder",
      image:
        "https://www.eastmanshop.com/cdn/shop/files/EDG-100Nc_5b32af9f-3ecc-4c95-aabe-07d47286deca_700x700.jpg?v=1755949250",
    },
  ],

  "LED Lights": [
    {
      id: 26,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 27,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      id: 28,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 29,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
    {
      id: 30,
      name: "LED Bulb",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/f810b0275a2e3f46cbb903cf974f369b.jpg_720x720q80.jpg_.webp",
    },
    {
      id: 31,
      name: "LED Strip Light",
      image:
        "https://static-01.daraz.com.bd/p/a5b9b83cb0042b3e0ce6c8e99ce24eb4.jpg",
    },
  ],

  "Outdoor Lighting": [
    {
      id: 32,
      name: "Garden Light",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/dbba71738d214438f137c654c42e58a7.jpg_720x720q80.jpg",
    },
    {
      id: 33,
      name: "Street Lamp",
      image:
        "https://thumbs.dreamstime.com/b/victorian-style-street-lamp-night-modern-electric-build-deep-yellow-light-produced-to-illuminate-streets-198835173.jpg",
    },
  ],

  "Energy Meters": [
    {
      id: 34,
      name: "Smart Energy Meter",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolFwN0O4dYHeUCpHjPMkh3nElb1LokVUz4A&s",
    },
    {
      id: 35,
      name: "Digital Meter Display",
      image:
        "https://cdn.roboticsbd.com/11381-home_default/dc-0-100v-10a-voltage-and-current-dual-led-display-panel-meter-robotics-bangladesh.jpg",
    },
  ],

  Generators: [
    {
      id: 36,
      name: "Portable Generator",
      image:
        "https://static.thcdn.com/images/large/original//productimg/1600/1600/11655251-4715186688260835.jpg",
    },
    {
      id: 37,
      name: "Diesel Generator",
      image:
        "https://media.sakurapower.com/pub/media/catalog/product/cache/144bfaf5ae6c8001de0bfb251a4f8b1e/3/3/33_kva_diesel_generator_4.jpg",
    },
  ],

  Transformers: [
    {
      id: 38,
      name: "Power Transformer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ci769LbwmtOWSCVurka5LqdXdOtgwR2CcQ&s",
    },
    {
      id: 39,
      name: "Distribution Transformer",
      image:
        "https://www.bowerselec.co.uk/app/uploads/2022/10/Fedral-stock-1500kVA-853x1024.jpg",
    },
  ],

  "Cable Management": [
    {
      id: 40,
      name: "Cable Tray",
      image:
        "https://www.independenttechbd.com/wp-content/uploads/2024/06/cable-tray-1-500x500-1.jpg",
    },
    {
      id: 41,
      name: "Cable Clips",
      image: "https://m.media-amazon.com/images/I/517KOWvxKpL.jpg",
    },
  ],

  "Indoor Fittings": [
    {
      id: 42,
      name: "Ceiling Light",
      image:
        "https://images-cdn.ubuy.co.in/666f1d2788caec18320c4a76-caneoe-modern-led-ceiling-light-6000k.jpg",
    },
    {
      id: 43,
      name: "Wall Lamp",
      image:
        "https://www.akway.in/cdn/shop/products/61rhOE5zxdL.jpg?v=1697352251&width=1445",
    },
  ],

  "Extension Cords": [
    {
      id: 44,
      name: "Multi Plug Extension",
      image:
        "https://static-01.daraz.com.bd/p/f7f3a8b26a3f3368418881eb42c6208b.jpg",
    },
    {
      id: 45,
      name: "Heavy Duty Extension Reel",
      image:
        "https://www.tronic.co.tz/cdn/shop/products/ER6527_c417e016-6c57-4bbc-8882-3f5363d071c4.jpg?v=1757514186",
    },
  ],

  "Surge Protection": [
    {
      id: 46,
      name: "Surge Protector Power Strip",
      image:
        "https://djuly1j3idynn.cloudfront.net/userfiles/images/inriver/preview/74685_ig112663blk10.jpg",
    },
    {
      id: 47,
      name: "Surge Protector Power Strip",
      image:
        "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
    },
    {
      id: 48,
      name: "Surge Suppressor",
      image: "https://images.monoprice.com/productlargeimages/158741.jpg",
    },
    {
      id: 49,
      name: "Voltage Stabilizer",
      image:
        "https://delta.com.bd/wp-content/uploads/2021/06/Sako-120-kVA-Voltage-Stabilizer-price-Bangladesh.jpg",
    },
  ],
};
