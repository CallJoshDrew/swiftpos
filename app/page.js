import Image from "next/image";
import Tables from "./tables/page";

export default function Home() {
  return (
    <>
      <Tables />
      <div className="row-span-1 col-span-7 bg-pink-300">Footer</div>
      <div className="row-span-6 col-span-4 bg-green-900">Side COntent</div>
    </>
  );
}
