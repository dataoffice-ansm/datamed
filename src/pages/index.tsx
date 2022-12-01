import { SearchSection } from '../componentsPages/Landing/SearchSection/SearchSection';
import { IntroSection } from '../componentsPages/Landing/IntroSection/IntroSection';
import { MoreInfoSection } from '../componentsPages/Landing/MoreInfoSection/MoreInfoSection';
import { FaqSection } from '../componentsPages/Landing/FaqSection/FaqSection';

const HomePage = () => (
  <>
    <IntroSection />
    <SearchSection />
    <MoreInfoSection />
    <FaqSection />
  </>
);

export default HomePage;
