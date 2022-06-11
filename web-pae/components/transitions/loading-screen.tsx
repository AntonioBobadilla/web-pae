import Styles from '../../css/components/transitions/loadingScreen.module.css';

const LoadingScreen = () => (
  <div className={Styles.fullScreen}>
    <div className={Styles.animationContainer}>
      <div className={Styles.paeContainer}>
        <img src="/images/pae-logo.png" className={Styles.logo} />
        <span className={Styles.paeText}>|PAE</span>
      </div>
      <div className={Styles.loader}>
        <div className={Styles.loader__bar} />
        <div className={Styles.loader__bar} />
        <div className={Styles.loader__bar} />
        <div className={Styles.loader__bar} />
        <div className={Styles.loader__bar} />
        <div className={Styles.loader__ball} />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
