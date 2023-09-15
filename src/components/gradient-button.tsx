import Link from "next/link";

type GradientButtonProps = {
  title: string;
  link: string;
};

const GradientButton = ({ title, link }: GradientButtonProps) => {
  return (
    <div>
      <Link
        href={link}
        className="px-10 py-3 border-0 border-transparent text-white font-medium rounded-full text-gray-700 bg-gradient-to-r from-[#8b3fe8] to-[#dc9519] hover:drop-shadow-[0_3px_5px_#7d7d7d] md:py-4 md:text-lg"
      >
        {title}
      </Link>
    </div>
  );
};

export default GradientButton;
