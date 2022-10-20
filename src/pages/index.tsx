import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  );
};

export default HomePage;
