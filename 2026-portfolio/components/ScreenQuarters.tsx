'use client'

import { FileData } from "../types/Files"
import VerticalSplitPair from "./VerticalSplitPair";

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
                    <VerticalSplitPair 
                        key={i}
                        firstFiles={props.quarterArrays[first]}
                        firstQuarter={first + 1}
                        secondFiles={props.quarterArrays[second]}
                        secondQuarter={second + 1}
                        offerVerticalDropTarget={offerVerticalDropTarget}
                        offerHorizontalDropTarget={offerHorizontalDropTarget}
                        isOnMobile={props.isOnMobile}
                    />
                )
            })}
        </>
    )
}