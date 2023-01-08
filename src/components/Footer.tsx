import LogoWhite from '../assets/logo-ansm-white.svg';
import { footerLinks } from '../config/layoutConfig';

export const Footer = () => (
  <footer className="text-center lg:text-left bg-black text-gray-600">
    <div className="py-10 text-center md:text-left container">
      <div className="grid grid-1 md:grid-cols-3 gap-8">
        {footerLinks.map((footerLink) => (
          <div key={footerLink.title}>
            <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start text-white">
              {footerLink.title}
            </h3>
            {footerLink.links.map((link) => (
              <p key={link.name} className="mb-4">
                <a href={link.url} className="text-sm text-white">
                  {link.name}
                </a>
              </p>
            ))}
          </div>
        ))}
        <div className="mb-4 flex flex-auto justify-center items-center md:justify-end">
          <LogoWhite height={200} width={200} />
        </div>
      </div>
    </div>
  </footer>
);
