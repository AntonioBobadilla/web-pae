import ButtonTemplateStyles from '../css/components/ButtonTemplate.module.css';

const ButtonTemplate = () => {
  // creo un Stateless Functional Component

  return (
    <div className={ButtonTemplateStyles.buttonTemplate}>
      <button className={ButtonTemplateStyles.primaryButton}>
        CONTINUAR CON REGISTRO
      </button>
    </div>
  );
};

export default ButtonTemplate; // exporto la función
