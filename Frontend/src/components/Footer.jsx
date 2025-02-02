import React from 'react';
import { Github, Mail, Twitter, Coffee } from 'lucide-react';

const Footer = () => {
  return (
      <div className='bg-black text-white max-w-full overflow-x-hidden'> 
        <footer className="bg-black text-zinc-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-1">
              {/* Brand Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Donezo</h3>
                <p className="text-zinc-400">Simplify your tasks, amplify your productivity.</p>
                <div className="flex space-x-4">
                  <a href="https://github.com/Harshninave04" className="hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" className="hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:contact@donezo.com"
                    className="hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li>
                    <a href="/login" className="hover:text-white transition-colors">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/signup" className="hover:text-white transition-colors">
                      Signup
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Stay Updated</h4>
                <p className="text-zinc-400">Subscribe to our newsletter for tips and updates.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-zinc-800 px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-zinc-600 flex-grow"
                  />
                  <button className="bg-zinc-700 px-2 py-2 rounded-r hover:bg-zinc-600 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-sm">
              <p>© 2025 Donezo. All rights reserved.</p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <span>Made with</span>
                <Coffee className="w-4 h-4" />
                <span>and code</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Footer;
