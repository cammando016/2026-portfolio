'use client'

import { FileData } from "../types/Files"
import QuarterContent from "./QuarterContent"
import styles from '../styles/home-layout.module.scss';
import globalStyles from '../styles/global.module.scss';

interface Props {
    quarterArrays: FileData[][],
    isOnMobile: boolean,
}

export default function ScreenQuarters (props : Props) {
    const loopIndices : number[] = [0, 1];
    const rightHasContent : boolean = props.quarterArrays[2].length > 0 || props.quarterArrays[3].length > 0;
    return (
        <>
            {loopIndices.map((i) => {
                const first = i*2;
                const second = i*2+1;
                const isLeftColumn = i === 0;

                const offerVerticalDropTarget = !props.isOnMobile && props.quarterArrays[second].length === 0 ? second + 1 : undefined;
                const offerHorizontalDropTarget = !props.isOnMobile && isLeftColumn && !rightHasContent ? 3 : undefined;

                return (
                    (props.quarterArrays[first].length > 0 || props.quarterArrays[second].length > 0) && (
                        <div key={i} className={`${styles.verticalFileSplit} ${globalStyles.columnFlex}`} >
                            { props.quarterArrays[first].length > 0 && 
                                <QuarterContent 
                                    quarterFiles={props.quarterArrays[first]} 
                                    quarter={first + 1} 
                                    offerHorizontalDropTarget={offerHorizontalDropTarget} 
                                    offerVerticalDropTarget={offerVerticalDropTarget} 
                                    isOnMobile={props.isOnMobile}
                                />
                            }
                            { props.quarterArrays[second].length > 0 && 
                                <QuarterContent 
                                    quarterFiles={props.quarterArrays[second]} 
                                    quarter={second + 1} 
                                    offerHorizontalDropTarget={offerHorizontalDropTarget} 
                                    offerVerticalDropTarget={offerVerticalDropTarget} 
                                    isOnMobile={props.isOnMobile}
                                /> 
                            }
                        </div>
                    )
                )
            })}
        </>
    )
}