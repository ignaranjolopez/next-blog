/* import Link from 'next/link';
import Image from 'next/image'; */
import Layout from '../../components/Layout';

export default function primerPost({ data }) {
  return (
    <Layout>
      <div key={data.id}>
        <h3>{data.id} - {data.title}</h3>
        <p>{data.body}</p>
      </div>
      {/*  <Image src="/img/1_600x600.jpeg"
        width={600}
        height={600}
        alt="1_600x600.jpeg" />
      <Link href="/">
        Volver al inicio
      </Link> */}
    </Layout>
  )
}

export async function getStaticPaths() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));

    return {
      paths,
      fallback: false
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const data = await res.json();
    return {
      props: { data }
    }
  } catch (error) {
    console.log(error);
  }
}
