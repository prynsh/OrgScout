// "use client";

// import React from "react";
// import { Github, Linkedin } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className=" px-4 py-6 w-full border-t border-gray-300 bg-black  backdrop-blur-md shadow-inner  transition-all">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm dark:text-gray-300 text-white">
//         <p className="text-center sm:text-left">
//           © {new Date().getFullYear()} OrgScout
//         </p>
//         <div className="flex gap-4">
//           <a
//             href="https://github.com/prynsh"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-teal-500 dark:hover:text-amber-400 transition-colors"
//             aria-label="GitHub"
//           >
//             <Github className="w-5 h-5" />
//           </a>
//           <a
//             href="https://www.linkedin.com/in/priyanshhverma/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-teal-500 dark:hover:text-amber-400 transition-colors"
//             aria-label="LinkedIn"
//           >
//             <Linkedin className="w-5 h-5" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-6 border-t border-gray-700 bg-black text-white transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {/* Text */}
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} OrgScout
        </p>

        {/* Icons */}
        <div className="flex gap-5">
          <a
            href="https://github.com/prynsh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/priyanshhverma/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
