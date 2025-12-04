import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <Image
            src="/skinner-logo.png"
            alt="Skinner Logo"
            width={150}
            height={40}
            className="h-auto w-auto max-h-[50px] mr-4"
            priority
        />
    );
};

export default Logo;
