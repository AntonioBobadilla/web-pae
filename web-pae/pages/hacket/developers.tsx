import Head from 'next/head';
import Link from 'next/link';
import styles from '../../css/hacket/developers.module.css';

const Developers = () => {
  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src="/images/hacket.png" />
        </div>
        <div className={styles.sections}>
          <Link href="/hacket/developers">
            <a className={styles.section}> Desarrolladores </a>
          </Link>
          <Link href="/hacket/copy-rights">
            <a className={styles.section}> Derechos de autor </a>
          </Link>
          <Link href="/hacket/terms">
            <a className={styles.section}> Términos y conidicones </a>
          </Link>
          <Link href="/hacket/privacy">
            <a className={styles.section}> Política de privacidad </a>
          </Link>
        </div>
      </div>
      <div className={styles.page}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h1 className={styles.title}>Desarrolladores</h1>
            <span className={styles.name}>
              {' '}
              · Salvador Alejandro Gaytán Ibáñez{' '}
            </span>
            <span className={styles.name}> · Bryan González Arellano </span>
            <span className={styles.name}> · Alejandro Castro Reus </span>
            <span className={styles.name}>
              {' '}
              · José Antonio Bobadilla García{' '}
            </span>
            <span className={styles.name}> · Karen Rugerio Armenta </span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <img className={styles.teamImage} src="/images/landing.jpeg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
