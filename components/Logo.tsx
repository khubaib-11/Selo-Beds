import Image from "next/image";
import Link from "next/link";
import LogoImage from "../app/assets/public/logo.svg";

function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl font-extrabold leading-none tracking-tight text-foreground hover:text-primary transition-colors uppercase flex "
    >
      <Image
        src={LogoImage}
        width={48}
        height={48}
        alt="Selo bed's logo"
      />
      <div className="flex flex-col">
        SELO
        <br />
        BEDS
      </div>
    </Link>
  );
}

export default Logo;
