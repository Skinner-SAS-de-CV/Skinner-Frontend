import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <Link href={"/"} className="flex items-center">
            <Image 
                src="/skinner-logo.png" 
                alt="Skinner Logo" 
                width={150} 
                height={40} 
                className="h-auto w-auto max-h-[50px] mr-4"
                priority
            />
        </Link>
    );
};

export default Logo;
