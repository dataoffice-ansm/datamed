import { SearchSection } from '../components/Landing/SearchSection';
import { IntroductionSection } from '../components/Landing/IntroductionSection';

const HomePage = () => {
  return (
    <div className="container">
      <IntroductionSection />
      <SearchSection />
    </div>
  );
};

export default HomePage;
