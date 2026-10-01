import styles from '../styles/settings.module.scss';
import globalStyles from '../styles/global.module.scss';

interface Props {
    colours: string[],
}

export default function ThemePalette (props : Props) {
    return (
        <div className={`${globalStyles.rowFlex} ${styles.paletteDots}`}>
            {
                props.colours.map(c => (
                    <span key={c} style={{backgroundColor: c}} className={styles.paletteDot}></span>
                ))
            }
        </div>
    )
}