import Footer from "@/components/Footer";
import MainContainer from "@/components/HomeComponents/MainContainer";
import Navbar from "@/components/Navbar";
import Image from "next/image";



export default function Home() {
  return (
    <div>
      {/* <Image className="lg:flex hidden absolute cursor-grab top-48 left-20" height={100} width={100} src="/doughnut.svg" alt="" />
      <Image className="lg:flex hidden absolute cursor-grab bottom-48 left-24" height={150} width={150} src="/bars.svg" alt="" />
      <Image className="lg:flex hidden absolute cursor-grab top-48 right-24" height={200} width={200} src="/radar.svg" alt="" />
      <Image className="lg:flex hidden absolute cursor-grab bottom-56 right-36" height={100} width={100} src="/doughnut.svg" alt="" /> */}

      <Navbar/>
      <MainContainer/>
      <Footer/>
    </div>
  );
}
