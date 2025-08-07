import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer>
      <p className='w-full h-[1px] bg-gray-300'></p>
    <div className="bg-gray-50 w-full flex gap-10 py-28">
        <div>
            <Image width={100} height={100} className='mx-10' src="/Logo.svg" alt="Logo" />
        </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Column 1: Social Media Links */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-indigo-500" size={24} />
            <a href="https://www.linkedin.com/in/shlok-kohli-1b902025b/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">LinkedIn</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaTwitter className="text-blue-500" size={24} />
            <a href="https://x.com/shlok_kohli" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">Twitter</a>
          </div>
        </div>
        
        {/* Column 2: GitHub and Owner Info */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <FaGithub className="text-gray-500" size={24} />
            <a href="https://github.com/shlokkohli" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">GitHub</a>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm">© 2025 WiseUp | All Rights Reserved</p>
          </div>
        </div>

      </div>
    </div>
    </footer>
  );
}

export default Footer;
