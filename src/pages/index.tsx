import { FullWidthRow } from '../components/FullWidthRow';
import { Tooltip } from '../components/Tooltip';

const HomePage = () => {
  return (
    <div className="container">
      <FullWidthRow className="bg-blue-100 shadow-inner">
        <div className="p-8">
          <div className="text-4xl">First section</div>
          <div>
            <Tooltip
              title="Philou"
              content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos porro minus
            doloribus quod labore nesciunt, culpa cumque doloremque debitis accusamus alias vel
            amet, maxime sequi cupiditate laudantium molestiae! Nostrum, veritatis."
              render={(refCb) => <span ref={refCb}>ICON</span>}
            />
            <br />
            <Tooltip
              title="Philou"
              theme="turquoise"
              content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos porro minus
            doloribus quod labore nesciunt, culpa cumque doloremque debitis accusamus alias vel
            amet, maxime sequi cupiditate laudantium molestiae! Nostrum, veritatis."
              render={(refCb) => <span ref={refCb}>a topic</span>}
            />
          </div>
        </div>
      </FullWidthRow>

      <FullWidthRow className="bg-white">
        <div className="p-8">
          <div className="text-4xl">Second section</div>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos porro minus
            doloribus quod labore nesciunt, culpa cumque doloremque debitis accusamus alias vel
            amet, maxime sequi cupiditate laudantium molestiae! Nostrum, veritatis.
          </div>
        </div>
      </FullWidthRow>

      <FullWidthRow className="bg-blue-100 shadow-inner">
        <div className="p-8">
          <div className="text-4xl">Third section</div>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos porro minus
            doloribus quod labore nesciunt, culpa cumque doloremque debitis accusamus alias vel
            amet, maxime sequi cupiditate laudantium molestiae! Nostrum, veritatis.
          </div>
        </div>
      </FullWidthRow>
    </div>
  );
};

export default HomePage;
