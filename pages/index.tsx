import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Countdown } from '../components/Countdown';
import { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next'
import { Donut } from '../models/Donuts'
import donuts from '../data/donuts.json';
import types from '../data/types.json';
import AJPrimary from '../components/AJPrimary';


const getDonuts = (type?: string) => {
  let ds: Donut[] = (donuts as unknown) as Donut[];
  if (type) {
    const types = type.split(',');
    ds = ds.filter((donut) =>
      donut.types.reduce((acc: any, type: any) => {
        return acc || types.includes(type);
      }, false),
    );
  }
  return ds;
}

const getTypes = () => {
  return types;
}

export const getStaticProps = async () => {
  return {
    props: {
      types: getTypes(),
      donuts: getDonuts(),
    },
  }
}

const Home = ({ types, donuts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [correctDecember, setCorrectDecember] = useState(Date.now())
  useEffect(() => {
    var today = new Date()
    var checkYear = today.getFullYear()
    var checkDate = new Date('12/2/' + checkYear)
    // If today is larger than 12/2 of current year use next year
    var yearToCheck = today > checkDate ? checkYear + 1 : checkYear;
    // Valid date to check
    setCorrectDecember(new Date('12/2/' + yearToCheck).getTime());
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Fritter Fun</title>
        <meta name="description" content="A Fun Fritter countdown to Fritter Day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://codingcat.dev/tutorial/fritter-fun">Fritter Fun</a>
        </h1>

        <p className={styles.description}>
          It is only{' '}
          <code className={styles.code}>
            <Countdown targetTime={correctDecember} />
          </code>
          {' '} away!
        </p>

        <div className={styles.grid}>
          {donuts.map(donut =>
            <a href={donut.url} target="_blank" key={donut.id} className={styles.card} rel="noopener noreferrer">
              <h2>{donut.title}</h2>
              <Image src={donut.img} alt={donut.imgAlt} height="200px" width="200px" />
            </a>

          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://codingcat.dev/tutorial/fritter-fun"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <div style={{ width: '100px' }}>
            <AJPrimary />
          </div>
        </a>
      </footer>
    </div>
  )
}

export default Home
