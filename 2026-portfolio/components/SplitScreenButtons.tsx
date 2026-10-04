'use client'

import { useCurrentFileDataStore } from "../store/fileDataStoreContext"
import { FileData } from "../types/Files"
import styles from '../styles/codeFile.module.scss';

interface Props {
    screenQuarter: number,
    isOnMobile: boolean,
}

export default function SplitScreenButtons (props : Props) {
    const fileData : FileData[] = useCurrentFileDataStore(state => state.fileData);
    const updateFileScreenQuarter = useCurrentFileDataStore(state => state.updateFileScreenQuarter);
    const activeFileInQuarter : string = fileData.find(f => f.activeFileInQuarter && f.screenQuarter === props.screenQuarter && f.fileOpen)!.key;

    //if there are at least two files, then they can be split to left and right sides of screen
    const canMoveHorizontal : boolean = fileData.filter(f => f.fileOpen).length > 1;

    //Must be at least 2 open files in the left or right side, to allow moving between top and bottom halves of each side
    const canMoveVertical : boolean = (
        props.screenQuarter < 3 ?
            fileData.filter(f => f.screenQuarter < 3 && f.fileOpen).length > 1 :
            fileData.filter(f => f.screenQuarter > 2 && f.fileOpen).length > 1
    );

    /* 
    <--------- ---------->
    Don't need to handle whether moving files leaves a quarter empty
    Files automatically collapse if no files in quarters to left or above
    ie none in 1 or 3, files in 2 or 4 move up 1.
    ie none in 1 and 2, files in 3 or 4 move down 2.
    */

    //Quarter below 3 means it is on the left, move to the right
    //Quarter above 2 means it is on the right, move to the left

    //If quarter is even, it is below another file. Moving to the side should only place below files on adjacent side if there are already open files below
    //ie RHS only has one full height file (quarter 3), moving a quarter 2 file to the right should go into quarter 3 to match opposite side window structure
    const handleMoveHorizontal = () => {
        if (props.screenQuarter < 3) {
            const hasFilesInQuarterFour = fileData.some(f => f.screenQuarter === 4);
            const targetQuarter = props.screenQuarter === 2 && hasFilesInQuarterFour ? 4 : 3;

            updateFileScreenQuarter(activeFileInQuarter, targetQuarter);
        } else {
            const hasFilesInQuarterTwo = fileData.some(f => f.screenQuarter === 2);
            const targetQuarter = props.screenQuarter === 4 && hasFilesInQuarterTwo ? 2 : 1;

            updateFileScreenQuarter(activeFileInQuarter, targetQuarter)
        }
    };

    //Quarter is even means it is on the bottom, move to the top
    //Quarter is odd means it is on the top, move to the bottom
    const handleMoveVertical = () => {
        props.screenQuarter % 2 === 0 ? 
            updateFileScreenQuarter(activeFileInQuarter, props.screenQuarter - 1) :
            updateFileScreenQuarter(activeFileInQuarter, props.screenQuarter + 1)
    }

    return (
        (canMoveHorizontal || canMoveVertical) && !props.isOnMobile &&
            <div className={styles.splitScreenButtons}>
                { canMoveHorizontal &&
                    <button 
                        onClick={handleMoveHorizontal}
                        className={`${styles.splitScreenButton} ${styles.splitScreenButtonHorizontal} ${props.screenQuarter < 3 ? styles.hoverLastChild : styles.hoverFirstChild}`}
                    >
                        {/* Size set automatically in css properties for children of outer div */}
                        <span></span>
                        <span></span>
                    </button>
                }
                { canMoveVertical && 
                    <button 
                        onClick={handleMoveVertical}
                        className={`${styles.splitScreenButton} ${styles.splitScreenButtonVertical} ${props.screenQuarter % 2 === 0 ? styles.hoverFirstChild : styles.hoverLastChild}`}
                    >
                        {/* Size set automatically in css properties for children of outer div */}
                        <span></span>
                        <span></span>
                    </button>
                }
            </div>
    )
}