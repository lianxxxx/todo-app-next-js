import Img from "next/image";
export default function BgImage() {
  return (
    <div>
      <div className="relative w-full ">
        <Img
          src="/bg-mobile-light.jpg"
          width={375}
          height={200}
          alt="Background"
          className="md:hidden w-full h-auto object-cover"
        />
        <Img
          src="/bg-desktop-light.jpg"
          alt="Background"
          width={1440}
          height={300}
          className="hidden md:block w-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex items-start justify-between px-6 md:px-16 mt-10 md:justify-center md:gap-96">
          <h1 className="text-white text-3xl font-semibold tracking-widest">
            T O D O
          </h1>

          <Img src="/icon-moon.svg" alt="Moon icon" width={24} height={24} />
        </div>
      </div>
    </div>
  );
}
