import Img from "next/image";

export default function BgImage({ theme, toggleTheme }) {
  return (
    <div>
      <div className="relative w-full ">
        {/* Light mode - Mobile */}
        <Img
          src="/bg-mobile-light.jpg"
          width={375}
          height={200}
          alt="Background"
          priority
          className={`md:hidden w-full h-auto object-cover ${theme === "dark" ? "hidden" : ""}`}
        />
        {/* Light mode - Desktop */}
        <Img
          src="/bg-desktop-light.jpg"
          alt="Background"
          width={1440}
          height={300}
          priority
          className={`hidden md:block w-full ${theme === "dark" ? "md:hidden" : ""}`}
        />

        {/* Dark mode - Mobile */}
        <Img
          src="/bg-mobile-dark.jpg"
          width={375}
          height={200}
          alt="Background"
          priority
          className={`md:hidden w-full h-auto object-cover ${theme === "light" ? "hidden" : ""}`}
        />
        {/* Dark mode - Desktop */}
        <Img
          src="/bg-desktop-dark.jpg"
          alt="Background"
          width={1440}
          height={300}
          priority
          className={`hidden md:block w-full ${theme === "light" ? "md:hidden" : ""}`}
        />

        <div className="absolute inset-0 flex items-center justify-between px-6 mb-16 md:justify-center md:gap-90 md:items-center md:mt-0  ">
          <h1 className="text-white text-2xl font-bold tracking-widest md:text-3xl">
            T O D O
          </h1>

          {/* Theme toggle button */}
          <button onClick={toggleTheme} className="cursor-pointer">
            <Img
              src={theme === "light" ? "/icon-moon.svg" : "/icon-sun.svg"}
              alt={theme === "light" ? "Moon icon" : "Sun icon"}
              width={24}
              priority
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
