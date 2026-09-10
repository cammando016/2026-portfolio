import { FileData } from "../types/Files"
import QuarterContent from "./QuarterContent"
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';

interface Props {
    quarterArrays: FileData[][]
}

export default function ScreenQuarters (props : Props) {
    const loopIndices : number[] = [0, 1];
    return (
        loopIndices.map((i) => {
            const first = i*2;
            const second = i*2+1;

            return (
                (props.quarterArrays[first].length > 0 || props.quarterArrays[second].length > 0) && (
                    <div key={i} className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`} >
                        { props.quarterArrays[first].length > 0 && <QuarterContent quarterFiles={props.quarterArrays[first]} quarter={first + 1} />}
                        { props.quarterArrays[second].length > 0 && <QuarterContent quarterFiles={props.quarterArrays[second]} quarter={second + 1} /> }
                    </div>
                )
            )
        })
    )
}