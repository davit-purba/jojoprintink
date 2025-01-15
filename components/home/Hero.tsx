import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 via-green-500 to-green-400 text-white">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-10">
                <div className="text-center lg:text-left lg:w-1/2 space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                        Layanan Percetakan Berkualitas Tinggi
                    </h1>
                    <p className="text-lg lg:text-xl">
                        Wujudkan desain Anda dengan solusi pencetakan profesional kami.
                        Dari kartu nama hingga spanduk, kami siap membantu Anda!
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <Link
                            href="#services"
                            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-100 transition"
                        >
                            Lihat Layanan
                        </Link>
                        <Link
                            href="#contact"
                            className="bg-blue-600 border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                        >
                            Kontak Kami
                        </Link>
                    </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:w-1/2 flex justify-center">
                    <Image
                        src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJpbnRpbmclMjBzYWxlc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Printing Services"
                        width={600}
                        height={600}
                        className="w-full max-w-lg rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero