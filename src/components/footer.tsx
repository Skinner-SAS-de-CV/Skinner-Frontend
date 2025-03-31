import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2025 SKINNER S.A.S de C.V. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 items-center">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              {/* Fue recomendado por lucide-react usar: https://simpleicons.org/?q=twitter */}
              <svg
                role="img"
                className="fill-white hover:fill-blue-400 h-6 w-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a
              href="mailto:info@skinnersv.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <Mail size={31} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
