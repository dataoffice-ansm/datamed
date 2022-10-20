import React from 'react';
import { FamilyLink } from './models';
import Image from 'next/image';

export type FooterProps = { familyLinks: FamilyLink[] };

export default function Footer({ familyLinks }: FooterProps) {
  return (
    <footer className="text-center lg:text-left bg-black text-gray-600">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {familyLinks.map((familyLink) => (
            <div key={familyLink.title}>
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start text-white">
                {familyLink.title}
              </h6>
              {familyLink.links.map((link) => (
                <p key={link.name} className="mb-4">
                  <a href={link.url} className="text-white">
                    {link.name}
                  </a>
                </p>
              ))}
            </div>
          ))}
          <div className="mb-4  flex">
            <Image alt="logo ansm" height={200} width={200} src="./logo-ansm-white.svg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
