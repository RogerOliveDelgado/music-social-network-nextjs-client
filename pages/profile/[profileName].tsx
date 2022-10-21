import React from "react";
import Layout from "../../components/Layout/Layout";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { parseCookies } from "../../helpers";

type Props = {
  userID: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req }: any) => {
  const data = parseCookies(req);

  console.log(data.userID);
  return {
    props: data,
  };
};

const ProfilePage = ({ userID }: Props) => {
  return (
    <Layout>
      <h1></h1>
    </Layout>
  );
};

export default ProfilePage;
