import cx from 'classnames';
import cardInfoStyles from '../css/components/cardInfo.module.css';
import ButtonTemplate from './button-template';

export const interpretation = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'confirm':
      return 'Confirmado';
    case 'cancel':
      return 'Cancelado';
    case 'info': // cambiar por completada
      return 'Completada';
    case 'PE':
      return 'Pendiente';
    case 'AP':
      return 'Aprobada';
    case 'CO':
      return 'Completada';
    case 'CA':
      return 'Cancelada';
    default:
      return 'Pendiente';
  }
};

const CardInfo = (props: {
  date: string;
  subject: string;
  student: string;
  status: string;
}) => {
  const { date } = props; // descomposición del objeto props
  const { subject } = props;
  const { student } = props;
  const { status } = props;

  return (
    <div className={cardInfoStyles.box}>
      <div className={cardInfoStyles.dateSize}>
        <h1 className={cx('bi bi-alarm', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {date} </span>
      </div>

      <div className={cardInfoStyles.subjectSize}>
        <h1 className={cx('bi bi-stack', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {subject} </span>
      </div>

      <div className={cardInfoStyles.studentSize}>
        <h1 className={cx('bi bi-person-circle', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {student} </span>
      </div>

      <div className={cardInfoStyles.statusSize}>
        <ButtonTemplate variant={status} clickable={false}>
          {' '}
          {interpretation(status)}
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default CardInfo;
