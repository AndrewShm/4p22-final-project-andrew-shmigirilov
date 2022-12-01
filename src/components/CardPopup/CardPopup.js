import React from "react";
import { AppContext } from '../../App';
import styles from './CardPopup.module.scss'

function CardPopup (props) {
    const {isItemAdded} = React.useContext(AppContext);

    return (
        props.isOpened && 
        <div className={styles.overlay}>
            <div className={styles.cardPopupConteiner}>
                <img onClick={props.onPopupClose} className={styles.removeButton} src='img/btn-remove.svg' alt='Remove'/>
                <h3>
                    {props.title}
                </h3>
                <img className={styles.cardPopupImg} alt={props.title} src={props.image} />
                <h2>
                    {props.price} руб.
                </h2>
                {props.onPlus &&
                    <img
                        className={styles.plus}
                        onClick={props.onClickPlus}
                        src={isItemAdded(props.id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                        alt='Plus' 
                    />
                }
                <span>Размеры: <b>{props.size}.</b></span>
                <img onClick={props.onClickFavorite} className={styles.favorite} src={props.isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt='Unliked' />
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default CardPopup