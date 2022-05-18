import Image from 'next/image'
import cardTutorsStyles from '../css/components/cardTutors.module.css';
import Carousel from "react-elastic-carousel";

const CardTutors = () => {

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
];
    
    return (
        <div className={cardTutorsStyles.cardTutorsSection}>
             <Carousel breakPoints={breakPoints}>
             <div className={cardTutorsStyles.cardTutors}>
                        <div className={cardTutorsStyles.studentInfo}>
                            <div className={cardTutorsStyles.profileIcon}><i className="bi bi-person-circle"></i></div>
                            <b className={cardTutorsStyles.firstName}>José Antonio</b>
                            <p className={cardTutorsStyles.lastName}>Bobadilla García</p>
                            <div className={cardTutorsStyles.degreeSection}>
                                <p className={cardTutorsStyles.degree}>ITC</p>
                                <p className={cardTutorsStyles.matricula}>A01734433</p>
                            </div>
                        </div>
                        <div className={cardTutorsStyles.itemsWrap}>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Lunes 21 de Marzo</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-alarm"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>3:00 - 4:00 PM</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Zoom ID: 1234 5678 91021</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-stack"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Programación Orientada a Objetos</p>
                            </div>
                            <button className={cardTutorsStyles.button}>Consultar duda</button>
                        </div>
                    </div>
                    <div className={cardTutorsStyles.cardTutors}>
                        <div className={cardTutorsStyles.studentInfo}>
                            <div className={cardTutorsStyles.profileIcon}><i className="bi bi-person-circle"></i></div>
                            <b className={cardTutorsStyles.firstName}>José Antonio</b>
                            <p className={cardTutorsStyles.lastName}>Bobadilla García</p>
                            <div className={cardTutorsStyles.degreeSection}>
                                <p className={cardTutorsStyles.degree}>ITC</p>
                                <p className={cardTutorsStyles.matricula}>A01734433</p>
                            </div>
                        </div>
                        <div className={cardTutorsStyles.itemsWrap}>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Lunes 21 de Marzo</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-alarm"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>3:00 - 4:00 PM</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Zoom ID: 1234 5678 91021</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-stack"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Programación Orientada a Objetos</p>
                            </div>
                            <button className={cardTutorsStyles.button}>Consultar duda</button>
                        </div>
                    </div>
                    <div className={cardTutorsStyles.cardTutors}>
                        <div className={cardTutorsStyles.studentInfo}>
                            <div className={cardTutorsStyles.profileIcon}><i className="bi bi-person-circle"></i></div>
                            <b className={cardTutorsStyles.firstName}>José Antonio</b>
                            <p className={cardTutorsStyles.lastName}>Bobadilla García</p>
                            <div className={cardTutorsStyles.degreeSection}>
                                <p className={cardTutorsStyles.degree}>ITC</p>
                                <p className={cardTutorsStyles.matricula}>A01734433</p>
                            </div>
                        </div>
                        <div className={cardTutorsStyles.itemsWrap}>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Lunes 21 de Marzo</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-alarm"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>3:00 - 4:00 PM</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Zoom ID: 1234 5678 91021</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-stack"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Programación Orientada a Objetos</p>
                            </div>
                            <button className={cardTutorsStyles.button}>Consultar duda</button>
                        </div>
                    </div>
                    <div className={cardTutorsStyles.cardTutors}>
                        <div className={cardTutorsStyles.studentInfo}>
                            <div className={cardTutorsStyles.profileIcon}><i className="bi bi-person-circle"></i></div>
                            <b className={cardTutorsStyles.firstName}>José Antonio</b>
                            <p className={cardTutorsStyles.lastName}>Bobadilla García</p>
                            <div className={cardTutorsStyles.degreeSection}>
                                <p className={cardTutorsStyles.degree}>ITC</p>
                                <p className={cardTutorsStyles.matricula}>A01734433</p>
                            </div>
                        </div>
                        <div className={cardTutorsStyles.itemsWrap}>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Lunes 21 de Marzo</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-alarm"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>3:00 - 4:00 PM</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Zoom ID: 1234 5678 91021</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-stack"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Programación Orientada a Objetos</p>
                            </div>
                            <button className={cardTutorsStyles.button}>Consultar duda</button>
                        </div>
                    </div>
                    <div className={cardTutorsStyles.cardTutors}>
                        <div className={cardTutorsStyles.studentInfo}>
                            <div className={cardTutorsStyles.profileIcon}><i className="bi bi-person-circle"></i></div>
                            <b className={cardTutorsStyles.firstName}>José Antonio</b>
                            <p className={cardTutorsStyles.lastName}>Bobadilla García</p>
                            <div className={cardTutorsStyles.degreeSection}>
                                <p className={cardTutorsStyles.degree}>ITC</p>
                                <p className={cardTutorsStyles.matricula}>A01734433</p>
                            </div>
                        </div>
                        <div className={cardTutorsStyles.itemsWrap}>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-calendar"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Lunes 21 de Marzo</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-alarm"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>3:00 - 4:00 PM</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Zoom ID: 1234 5678 91021</p>
                            </div>
                            <div className={cardTutorsStyles.itemCard}>
                                <div className={cardTutorsStyles.itemIcon} >
                                    <i className="bi bi-stack"></i>
                                </div>
                                <p className={cardTutorsStyles.itemText}>Programación Orientada a Objetos</p>
                            </div>
                            <button className={cardTutorsStyles.button}>Consultar duda</button>
                        </div>
                    </div>
             </Carousel>
        </div>
    )
}

export default CardTutors;