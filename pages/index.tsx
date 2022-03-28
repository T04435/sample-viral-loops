import Copy from '/public/assets/copy.svg';
import Facebook from '/public/assets/facebook.svg';
import Mail from '/public/assets/mail.svg';
import Twitter from '/public/assets/twitter.svg';
import Whatsapp from '/public/assets/whatsapp.svg';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';

interface HomeProps {
  link: string,
  code: string,
  rank: string,
  referralCount: string,
  shareCount: string,

}

const Home: NextPage<HomeProps> = (referral: HomeProps) => {
  const {
    link,
    rank,
    code,
    referralCount,
    shareCount,
  } = referral;
  return (
      <>
        <h1>OneDeferral</h1>
        <p>Referral Link: {link}
          <i style={{ marginLeft: '0.5rem' }}/>
          <a onClick={() => navigator.clipboard.writeText(link)}>
            <Image src={Copy}/>
          </a>
          <i style={{ marginLeft: '0.5rem' }}/>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}>

            <Image src={Facebook}/>
          </a>
          <i style={{ marginLeft: '0.5rem' }}/>
          <a href={`https://twitter.com/intent/tweet?text=${link}`}>

            <Image src={Twitter}/>
          </a>
          <i style={{ marginLeft: '0.5rem' }}/>
          <a href={`https://wa.me/?text=${encodeURI(link)}`}>

            <Image src={Whatsapp}/>
          </a>
          <i style={{ marginLeft: '0.5rem' }}/>
          <a href={`mailto:?body=${encodeURI(link)}`}>

            <Image src={Mail}/>
          </a>
        </p>
        <pre>Referral Code: {code}</pre>
        <pre>Rank: {rank}</pre>
        <pre>Referrals Count: {referralCount}</pre>
        <pre>Shares Count: {shareCount}</pre>
      </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = `https://stoplight.io/mocks/viral-loops/api/75013/v2/participant_data?apiToken=${process.env.VIRAL_LOOPS_API_KEY}&participants=%5B%7B%22email%22%3A%20%22efi%40viral-loops.com%22%7D%5D`;

  const options = {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json'
    }
  };

  const res = await fetch(url, options);
  const data = await res.json();

  return {
    props: {
      link: data.data[0].user.uniqueLink,
      code: data.data[0].user.referralCode,
      rank: data.data[0].user.rank,
      referralCount: data.data[0].counters.referrals.total,
      shareCount: data.data[0].counters.shares.total,
    },
  };
};

export default Home;
