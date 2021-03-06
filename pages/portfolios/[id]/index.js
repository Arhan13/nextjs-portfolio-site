import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
//import { useGetPostsById } from "@/actions";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import { formatDate } from "helpers/functions";

const Portfolio = ({ portfolio }) => {
  const router = useRouter();
  const { data: dataU, loading: loadingU } = useGetUser();

  if (router.isFallback) {
    return "Loading...";
  }
  return (
    <BaseLayout
      user={dataU}
      loading={loadingU}
      navClass="transparent"
      className="cover cover-black"
    >
      <BasePage
        noWrapper
        indexPage
        title={`${portfolio.title} - Arhan Choudhury`}
        metaDescription={portfolio.description}
        className="cover cover-black"
      >
        <div className="portfolio-detail background5">
          <span></span>
          <span></span>
          <span></span>

          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              <h1 className="cover-heading">{portfolio.title}</h1>
              <p className="lead dates">
                {formatDate(portfolio.startDate)} -{" "}
                {formatDate(portfolio.endDate) || "Present"}
              </p>
              <p className="lead info mb-0">
                {portfolio.jobTitle} | {portfolio.company} |{" "}
                {portfolio.location}
              </p>
              <p className="lead">{portfolio.description}</p>
              <p className="lead">
                <a
                  href={portfolio.companyWebsite}
                  target="_"
                  className="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

//Statically Optimised and Dynamic Data
//Similar to getStaticProps

// export async function getServerSideProps({ query }) {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;

//   return { props: { portfolio } };
// }

//This function is executed at build time
// export async function getStaticPaths() {
//   const json = await new PortfolioApi().getAll();
//   const portfolios = json.data;

//   //Get paths that we want to re-render based on portfolio id
//   const paths = portfolios.map((portfolio) => {
//     //We will return an array of objects with params of id.
//     return {
//       params: { id: portfolio._id },
//     };
//   });

//   // fallback : false means that "not found pages" will be resolved into 404 page.
//   return { paths, fallback: true };
// }

// //The difference between the first one and this on is the params, we get all the params
// export async function getStaticProps({ params }) {
//   const json = await new PortfolioApi().getById(params.id);
//   const portfolio = json.data;
//   return { props: { portfolio } };
// }

//[{params : {id : '  ....   '}},  {}, {}]



export async function getStaticPaths() {
  console.log('reexecuting getStaticPaths');
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  const paths = portfolios.map(portfolio => {
    return {
      params: {id: portfolio._id}
    }
  })

  return { paths, fallback: true };
}

export async function getStaticProps({params}) {
  console.log('reexecuting getStaticProps');
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: {portfolio}, revalidate: 1};
}

export default Portfolio;
