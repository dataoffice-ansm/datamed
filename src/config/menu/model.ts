export interface SectionPage {
  id: string;
  label: string;
}

export interface MenuPage {
  id: string;
  items: SectionPage[];
}
