import styles from '../styles/home-layout.module.scss';
import Image, { StaticImageData } from 'next/image';
import { iconOptions } from '../types/Files';

interface Props {
    activeIcon: iconOptions,
    iconType: iconOptions,
    handleClickIcon: (iconKey: iconOptions) => void,
    selectedIconSrc: StaticImageData,
    selectedIconAlt: string,
    unselectedIconSrc?: StaticImageData,
    unselectedIconAlt?: string 
}

export default function Icon(props : Props) {
    const isActiveIcon: boolean = props.activeIcon === props.iconType;
    return (
        <>
        { (props.unselectedIconAlt && props.unselectedIconSrc) ?
            <button 
                className={`${styles.iconContainer} ${isActiveIcon ? styles.iconContainerActive : styles.iconContainerInactive} `}
                onClick={() => props.handleClickIcon(props.iconType)}    
            >
                {isActiveIcon ?
                    <Image src={props.selectedIconSrc} alt={props.selectedIconAlt} />
                    :
                    <Image src={props.unselectedIconSrc} alt={props.unselectedIconAlt} />
                }
            </button>
            :
            <button 
                className={`${styles.iconContainer} ${styles.iconContainerInactive} `}
                onClick={() => props.handleClickIcon(props.iconType)}    
            >
                <Image src={props.selectedIconSrc} alt={props.selectedIconAlt} />
            </button>
        }
        </>
    )
}