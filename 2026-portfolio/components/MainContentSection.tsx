import { FileData } from "../types/Files";
import ScreenQuarters from "./ScreenQuarters";
import styles from '../styles/home-layout.module.scss';

interface Props {
    fileData: FileData[]
}

export default function MainContentSection (props : Props) {
    const quarterFiles : FileData[][] = [[], [], [], []];

    props.fileData.forEach(f => {
        if (!f.fileOpen) return;
        quarterFiles[f.screenQuarter - 1].push(f);
    });

    return <div className={`${styles.rowFlex} ${styles.contentPane}`}><ScreenQuarters quarterArrays={quarterFiles} /></div>
}