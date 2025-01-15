import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <>
            <footer className="footer bg-gradient-to-b from-gray-100 to-gray-200 py-10 text-base-content p-10">
                <nav className="space-y-2">
                    <h6 className="footer-title text-lg font-semibold text-gray-800 tracking-wide">Services</h6>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Branding</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Design</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Marketing</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Advertisement</Link>
                </nav>

                <nav className="space-y-2">
                    <h6 className="footer-title text-lg font-semibold text-gray-800 tracking-wide">Company</h6>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">About us</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Contact</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Jobs</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Press kit</Link>
                </nav>

                <nav className="space-y-2">
                    <h6 className="footer-title text-lg font-semibold text-gray-800 tracking-wide">Legal</h6>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Terms of use</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Privacy policy</Link>
                    <Link href="" className="link link-hover text-base text-gray-600 hover:text-gray-900">Cookie policy</Link>
                </nav>

                <nav className="flex mt-6 text-center lg:mt-0 lg:text-left">
                    <Image 
                        src="https://res.cloudinary.com/dx1wjwf5o/image/upload/v1736438995/owwnjbp4kj6mr4gcxbt3.png"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <p className="text-base text-gray-700 font-medium">
                        PT.JOJO TIGA PUTRA JUNGJUNGAN
                        <br />
                        <span className="text-sm text-gray-500">Copyright © {new Date().getFullYear()}</span>
                    </p>
                </nav>
            </footer>

        </>

    )
}

export default Footer;