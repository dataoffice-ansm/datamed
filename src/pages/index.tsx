import { SearchSection } from '../components/Landing/SearchSection';
import { IntroductionSection } from '../components/Landing/IntroductionSection';
import { MoreInformationSection } from '../components/Landing/MoreInformationSection';

const HomePage = () => (
  <div className="container">
    <IntroductionSection />
    <SearchSection />
    <MoreInformationSection />
  </div>
);

export default HomePage;
