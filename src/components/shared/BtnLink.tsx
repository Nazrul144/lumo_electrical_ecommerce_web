import Link from 'next/link';
import React from 'react';

type BtnLinkProps = {
    link : string;
    text : string;
    className? : string;

}


const BtnLink: React.FC<BtnLinkProps> = ({
    link = "/",
    text = "Click Here",
    className="bg-[linear-gradient(90deg,#088347_0%,#C6E824_100%)] text-white"
}) => {
    return (
        <Link className={`active:scale-95 px-5 py-2 rounded-lg  ${className}`} href={link}>
            {text}
        </Link>
    );
};

export default BtnLink;