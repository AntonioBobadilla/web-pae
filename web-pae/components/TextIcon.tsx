

import Image from 'next/image'; // importamos el componente de Image de Next
import styles from '../css/TextIcon.module.css'; // importamos los estilos como "styles"

const TextIcon = () => { // creo un Stateless Functional Component
    return (
        <div className={styles.containerTextIcon}>
            <Image className={styles.textIconImg} src="/icons/calendar-minus.svg" width={19} height={19} />
            <p className={styles.textIconP}>Lunes 21 de Marzo</p>
        </div>
    );
}

export default TextIcon; // exporto la función 