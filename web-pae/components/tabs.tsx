import Styles from '../css/components/tabs.module.css';

type TabsProps = {
  handleClick: any;
  text: string | undefined;
  active: boolean;
};

const Tabs = ({ handleClick, text, active }: TabsProps) => {
  return (
    <button
      className={active ? Styles.buttonActive : Styles.buttonInactive}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Tabs;
