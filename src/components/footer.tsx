import Image from "next/image";
const Footer = () => {
  return (
    <footer className=" w-full p-4 bg-[#161527] font-medium">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex mt-4 space-x-3 sm:justify-center sm:mt-0">
            <Image src="/tokenXDC.png" width={25} height={20} alt="logo" />
            <a
              href="https://github.com/neel-ds/TokenX"
              target="_blank"
              className="text-[#E8F0F3] hover:text-[#DBE6EB]"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <span className="text-md text-[#DBE6EB] sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="" className="hover:underline">
              TokenX
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
