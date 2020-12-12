import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import styled from "styled-components";

const Grid = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Container = styled("div")`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const TitleColor = styled.h1`
  color: #7fffd4;
`;

const Title = styled(TitleColor)`
  font-size: 40px;
`;

const LinkWrapper = styled.a`
  max-width: 400px;
`;

interface InnerData {
  mission_name: string | number | null | undefined;
  links: { video_link: string };
  launch_date_local: string;
}

export default function Home({ data }: any) {
  console.log("data", data);
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title>SpaceX search</Title>

        <Grid>
          {data.map(({ mission_name, links, launch_date_local }: InnerData) => (
            <LinkWrapper
              key={mission_name}
              href={links.video_link}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{mission_name} &rarr;</h3>
              <p>mission time: `${launch_date_local}`</p>
            </LinkWrapper>
          ))}
        </Grid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src={`${"/space_x_launch_search"}/vercel.svg`}
            alt="Vercel Logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </Container>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const {
    data: { launchesPast },
  } = await client.query({
    query: gql`
      query Getlaunches {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
          }
          rocket {
            rocket_name
            first_stage {
              cores {
                flight
                core {
                  reuse_count
                  status
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      data: launchesPast,
    },
  };
}
