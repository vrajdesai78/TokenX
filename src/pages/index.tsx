import Footer from "@/components/footer";
import GradientButton from "@/components/gradient-button";
import Head from "next/head";
import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Home() {
  return (
    <>
      <Head>
        <title>TokenX</title>
        <meta name="description" content="TokenX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#030413] opacity-90">
        <div className="bg-[url('/bg.svg')] bg-no-repeat bg-cover bg-center">
          <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[100vh]">
            <div className="flex justify-center flex-row">
              <div className="flex flex-col justify-between text-center h-[100vh] py-10 md:py-32">
                <Image
                  src="/builtXDC.svg"
                  width="150"
                  height="100"
                  className="mx-auto animate__animated animate__zoomIn"
                  alt="TokenX"
                />
                <h1 className="text-7xl sm:text-6xl font-extrabold text-[#9FF3FF] animate__animated animate__zoomIn">
                  TokenX
                </h1>
                <div className="text-4xl tracking-tight font-extrabold text-[#FFE5E8] mt-[2rem] sm:text-5xl md:text-6xl lg:px-4 space-y-5">
                  <h2 className="animate__animated animate__slideInRight">
                    Supercharge Community
                  </h2>
                  <h2 className="animate__animated animate__slideInLeft">
                    Growth & Engagement
                  </h2>
                  <h3 className="block text-[#DBE6EB] font-medium text-2xl lg:px-32 animate__animated animate__slideInRight">
                    Leading protocols trust our no-code tools for airdrop and XRC1155
                  </h3>
                </div>
                <div className="animate__animated animate__pulse mt-10">
                  <GradientButton link="/dashboard" title="Use TokenX" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[80vh] bg-[url('/arch.png')] bg-no-repeat bg-contain bg-center">
          <div className="flex justify-center flex-row">
            <div className="flex flex-col justify-center text-center h-[80vh] py-32 lg:px-32 space-y-20">
              <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className="text-4xl font-medium text-[#CDF2E8] sm:text-5xl md:text-6xl mb-5">
                  Empower your Community <br /> with Superpowers
                </h2>
                <h3 className="text-[#A098D5] leading-relaxed font-medium text-2xl lg:px-32">
                  Share claimable link to whitelisted address and track your mint counts on dashboard
                </h3>
              </AnimationOnScroll>
            </div>
          </div>
        </div>
        <div className="lg:px-0 mx-auto flex justify-center flex-col min-h-[60vh] space-y-4">
          <div className="flex justify-center text-[#E4E4ED] space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row">
            <div className="bg-black w-full md:w-2/3 rounded-l-lg p-r-10 flex flex-col items-center justify-center text-center lg:text-left">
              <AnimationOnScroll animateIn="animate__slideInLeft">
                <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center space-x-5 md:space-x-2 lg:space-x-5 max-w-[720px]">
                  <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[10px] rounded-full">
                    <Image src="/xdc.svg" width="60" height="60" alt="icon" />
                  </div>
                  <div>
                    <p className="text-sm text-[#9FF3FF]">COMPATIBLE</p>
                    <p className="text-4xl font-medium">Network</p>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
            <div className="bg-black w-full md:w-1/3 rounded-l-lg p-12 flex flex-col items-center md:items-start justify-center text-center lg:text-left">
              <AnimationOnScroll animateIn="animate__slideInRight">
                <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center space-x-5 md:space-x-2 lg:space-x-5 max-w-[720px]">
                  <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[10px] rounded-full">
                    <Image
                      src="/smart-contract.svg"
                      width="60"
                      height="60"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#9FF3FF]">BATTLE TESTED</p>
                    <p className="text-4xl font-medium">Smart Contracts</p>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
          </div>
          <div className="flex justify-center text-[#E4E4ED] space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row">
            <div className="bg-black w-full md:w-1/3 rounded-r-lg p-r-10 p-12 flex flex-col justify-center items-center text-center space-y-4">
              <AnimationOnScroll animateIn="animate__slideInLeft">
                <div className="flex items-center space-x-3 max-w-[360px] w-full">
                  <div className="w-full">
                    <p className="text-sm text-[#9FF3FF]">POWERFUL</p>
                    <p className="text-4xl font-medium">Integrations</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[5px] rounded-full">
                    <Image
                      src="/spheron.png"
                      className="overflow-hidden rounded-full"
                      width="60"
                      height="60"
                      alt="icon"
                    />
                  </div>
                  <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[5px] rounded-full">
                    <Image
                      src="/worldcoin.png"
                      className="overflow-hidden rounded-full"
                      width="60"
                      height="60"
                      alt="icon"
                    />
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
            <div className="bg-black w-full md:w-2/3 rounded-l-lg p-l-10 p-12 flex flex-col items-start justify-center">
              <AnimationOnScroll animateIn="animate__slideInRight">
                <div className="flex items-center space-x-5 max-w-[720px]">
                  <div>
                    <p className="text-sm text-[#9FF3FF]">
                      COMPATIBLE WITH YOUR
                    </p>
                    <p className="text-4xl font-medium">Trusted Wallets</p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[0px] rounded-full">
                      <Image
                        src="/metamask.png"
                        width="60"
                        height="60"
                        alt="icon"
                      />
                    </div>
                    <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[5px] rounded-full">
                      <Image
                        src="/walletConnect.png"
                        width="60"
                        height="60"
                        alt="icon"
                      />
                    </div>
                    <div className="bg-[#39376C] w-[60px] h-[60px] flex items-center justify-center p-[5px] rounded-full">
                      <Image
                        src="/coinbase.png"
                        className="w-30 overflow-hidden"
                        width="100"
                        height="70"
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
              </AnimationOnScroll>
            </div>
          </div>
        </div>
        <div className="bg-[url('/chess.png')] bg-top bg-cover bg-fixed">
          <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[70vh]">
            <div className="flex justify-center flex-row">
              <div className="flex flex-col justify-center text-center h-[70vh] py-32 lg:px-32 space-y-20">
                <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                  Grow Your Community <br /> Today With Us
                </h2>
                <GradientButton link="/dashboard" title="Let's go 🚀" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
