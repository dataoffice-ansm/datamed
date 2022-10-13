import { GetStaticPaths, GetStaticProps } from 'next';

export const Index = () => {
  return <p> TODO </p>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // Call an external API endpoint to get posts
  try {
    const res = await fetch('/api/paths/cis');
    const cisIds: string[] = await res.json();

    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)

    // const paths = cisIds.map((cisId) => ({
    //     params: {id: cisId},
    // }))

    return { paths: cisIds, fallback: false };
  } catch (err) {
    console.log(err);
  }
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id as string;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`/api/cis/${id}`);
  const posts = await res.json();

  return {
    // Passed to the page component as props
    props: { post: {} },
  };
};
