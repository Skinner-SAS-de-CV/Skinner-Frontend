import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2025 SKINNER S.A.S de C.V. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Twitter size={30} />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <Github size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

