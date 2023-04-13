import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useAppSelector } from '@/components/redux/store';
import Modal from '@/components/Modal';
import Signup from '@/components/SignupComponent';
import Main from './Main';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';


TimeAgo.addDefaultLocale(en);
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  const { user } = useAppSelector(state => state.user);

  return (
    <>
      <Head>
        <title>CodeLeap Frontend Test - Patrick Imbrizi</title>
        <meta name="description" content="CodeLeap Test - Frontend (Patrick Imbrizi)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        {
          !!user.username
            ? <Main />
            :
            <Modal isOpen={true} onClose={(e) => console.log(e)}>
              <Signup />
            </Modal>
        }
      </main>
    </>
  )
}
