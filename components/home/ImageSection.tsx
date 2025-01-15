import React from 'react'
import Image from 'next/image'


const ImageSection = () => {
    const items = [
        {
            id: 1,
            title: "Fast Processing",
            text: "The app is able to analyze symptoms and provide a possible diagnosis within seconds, ensuring users get timely information.",
            leftText: null,
            imageUrl:
                "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: 2,
            title: "User Friendly Interface",
            text: "The simple and intuitive design allows anyone, including novice users, to easily enter symptoms and receive results.",
            leftText: "1",
            imageUrl:
                "https://plus.unsplash.com/premium_photo-1661835495814-f07d70f2a71e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRhdGF8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 3,
            title: "Desain kustom",
            text: "Leveraging on an extensive medical database, this feature ensures that analysis is performed efficiently without compromising on accuracy.",
            leftText: null,
            imageUrl:
                "https://plus.unsplash.com/premium_photo-1661881801573-6506e682cbd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: 4,
            title: "Save Time",
            text: "Layanan support 24/7.",
            leftText: "2",
            imageUrl:
                "https://media.istockphoto.com/id/1677846143/photo/time-management-planning.webp?a=1&b=1&s=612x612&w=0&k=20&c=5dC0CGCaS-8Vmcql80lJHMlqAtJTCHmsnQNtOFSZaKU="
        }
    ];
    return (
        <div className='bg-base-200 py-14'>
            <h2 className="text-3xl text-center text-primary">Layanan yang kami tawarkan</h2>
            {items.map((item) => (
                <div key={item.id}>
                    {item.leftText ? (
                        <div className="hero mt-10">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <Image
                                    alt="Image description"
                                    src={item.imageUrl}
                                    layout="intrinsic"
                                    width={400}
                                    height={400}
                                    className="h-5/6 object-contain w-full rounded-lg shadow-2xl lg:ml-40"
                                />
                                <div>
                                    <h4 className="py-2 text-2xl font-bold">{item.title}</h4>
                                    <p className='text-xl'>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="hero mt-10">
                            <div className="hero-content flex-col lg:flex-row">
                                <Image
                                    alt="Image description"
                                    src={item.imageUrl}
                                    layout="intrinsic"
                                    width={400}
                                    height={400}
                                    className="h-5/6 object-contain w-full rounded-lg shadow-2xl"
                                />
                                <div className='lg:ml-40'>
                                    <h4 className="py-2 text-2xl font-bold">{item.title}</h4>
                                    <p className='text-xl'>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ImageSection