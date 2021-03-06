import React from "react";
import Header from "@/components/shared/Header";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import BlogApi from "lib/api/blogs";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";
import Avatar from "components/shared/Avatar";

const BlogDetail = ({ blog, author }) => {
  //debugger;

  const { data, loading } = useGetUser();
  //  debugger
  return (
    <BaseLayout user={data} loading={loading} navClass="transparent">
      <BasePage
        className="slate-container background3 cover cover-sunrise"
        title={`${blog.title} - Arhan Choudhury`}
        metaDescription={blog.subTitle}
      >
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <div className="hhh"></div>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Avatar
              title={author.name}
              image={author.picture}
              date={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// export async function getStaticPaths() {
//   const { data } = await new BlogApi().getAll();
//   const paths = data.map(({ blog }) => ({ params: { slug: blog.slug } }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }) {
//   const {
//     data: { blog, author },
//   } = await new BlogApi().getBySlug(params.slug);
//   return { props: { blog, author } };

export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  const paths = data.map(({ blog }) => ({ params: { slug: blog.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const {
    data: { blog, author },
  } = await new BlogApi().getBySlug(params.slug);
  return { props: { blog, author }, revalidate: 1 };
}

export default BlogDetail;
