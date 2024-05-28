import LogoWhite from '../assets/logo-ansm-white.svg';
import { footerLinks } from '../config/layoutConfig';

export const Footer = () => (
    <footer className="text-center lg:text-left bg-black text-gray-600 relative">
        <div className="py-10 text-center md:text-left container">
            <div className="grid grid-1 md:grid-cols-3 gap-8">
                {footerLinks.map((footerLink) => (
                    <div key={footerLink.title}>
                        <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start text-white">
                            {footerLink.title}
                        </h3>

                        {footerLink?.links &&
                            footerLink.links.map((link) => (
                                <p key={link.url} className="mb-4">
                                    <a href={link.url} className="text-sm text-white">
                                        {link.title}
                                    </a>
                                </p>
                            ))}
                    </div>
                ))}

                <div className="flex flex-auto justify-center items-center md:justify-end">
                    <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr">
                        <LogoWhite className="h-[100px] w-[200px]" />
                    </a>
                </div>
            </div>
        </div>
        <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-t-[40px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>
    </footer>
);
