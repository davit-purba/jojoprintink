
import React from 'react'

const NewsLetterSection = () => {
    return (
        <div className="bg-base py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-semibold tracking-tight">Berlangganan buletin kami</h2>
                        <p className="mt-4 text-lg">
                            Kami mencintai semua orang, kecuali dengan cara kami sendiri, jika ada yang menghendaki. Dua hal terjadi pada saat bersamaan.
                        </p>
                        <div className="mt-2.5 flex max-w-md gap-x-4">
                            <input
                                required
                                placeholder="Enter your email"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                            <button
                            className='btn btn-primary'
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    rows={4}
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                                    defaultValue={''}
                                />
                                <div className='flex justify-end'>
                                    <button
                                    className='btn btn-primary'
                                    >
                                        Kirim
                                    </button>

                                </div>
                            </div>
                        </div>

                    </dl>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterSection