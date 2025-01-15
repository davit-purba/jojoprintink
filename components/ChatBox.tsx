import Link from 'next/link'
import React from 'react'

const ChatBox = () => {
    return (
        <Link
            href='/'
            aria-label="Contact us on WhatsApp"
            className="fixed bottom-4 right-4 inline-flex items-center justify-center w-14 h-14 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 font-semibold"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M20.52 3.48A11.94 11.94 0 0012 0a11.94 11.94 0 00-8.52 3.48A11.94 11.94 0 000 12c0 2.02.5 3.98 1.47 5.76L0 24l6.33-1.44A11.94 11.94 0 0012 24c3.02 0 5.82-1.17 8.01-3.29A11.94 11.94 0 0024 12a11.94 11.94 0 00-3.48-8.52zm-8.52 19.2c-1.7 0-3.34-.46-4.8-1.33l-.34-.2-3.76.86.8-3.57-.23-.36A9.93 9.93 0 012 12c0-5.52 4.48-10 10-10 2.66 0 5.17 1.04 7.07 2.93A9.93 9.93 0 0122 12c0 2.66-1.04 5.17-2.93 7.07a9.93 9.93 0 01-7.07 2.93zm5.65-7.8l-.06-.08c-.29-.3-1.7-1.32-2.06-1.47-.36-.15-.63-.22-.9.22-.26.43-1.03 1.47-1.26 1.77-.23.3-.46.33-.85.14-.4-.2-1.7-.63-3.24-2-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.61.17-.8.18-.18.4-.46.6-.69.2-.23.26-.4.4-.67.13-.26.07-.5-.04-.69-.11-.2-.9-2.14-1.23-2.9-.32-.78-.65-.67-.9-.68l-.75-.01a1.45 1.45 0 00-1.05.48c-.36.39-1.37 1.34-1.37 3.26s1.4 3.77 1.6 4.03c.2.26 2.7 4.1 6.54 5.76 3.84 1.67 4.6 1.36 5.42 1.27.83-.09 2.6-1.06 2.97-2.09.37-1.03.37-1.91.26-2.09z" />
            </svg>
        </Link>
    )
}

export default ChatBox