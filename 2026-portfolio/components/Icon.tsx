import styles from '../styles/home-layout.module.scss';
import Image, { StaticImageData } from 'next/image';
import { iconOptions } from '../types/Files';
import { usePathname } from 'next/navigation';

type ToggleableProps = {
    toggleable: true
    activeIcon: iconOptions,
    iconType: iconOptions,
    handleClickIcon: (iconKey: iconOptions) => void,
    selectedIconSrc: StaticImageData,
    selectedIconAlt: string,
    unselectedIconSrc: StaticImageData,
    unselectedIconAlt: string,
    href?: never,
}

type UntoggleableProps = {
    toggleable: false,
    activeIcon: iconOptions,
    iconType: iconOptions,
    handleClickIcon: (iconKey: iconOptions) => void,
    selectedIconSrc: StaticImageData,
    selectedIconAlt: string,
    unselectedIconSrc?: never,
    unselectedIconAlt?: never,
    href: string,
}

type Props = ToggleableProps | UntoggleableProps

export default function Icon(props : Props) {
    const isActiveIcon: boolean = props.activeIcon === props.iconType;

    return (
        <>
        { props.toggleable ?
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
            <a 
                className={`${styles.iconContainer} ${styles.iconContainerInactive} `}
                href={props.href}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image src={props.selectedIconSrc} alt={props.selectedIconAlt} />
            </a>
        }
        </>
    )
}