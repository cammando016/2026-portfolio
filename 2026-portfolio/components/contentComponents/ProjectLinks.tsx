'use client'

import globalStyles from '../../styles/global.module.scss';
import contentStyles from '../../styles/content.module.scss';
import { useShowTagsContext } from '../../store/showTagsContext';

interface Props {
    projectLink?: string,
    githubLink?: string
}

export default function ProjectLinks (props : Props) {
    const {showTags} = useShowTagsContext();
    return (
        <div className={`${globalStyles.rowFlex} ${contentStyles.projectLinks}`}>
            {props.projectLink && <a className={`${contentStyles.linkButton}`} target="blank" href={props.projectLink} >{`${showTags && '<a '}Visit Project${showTags && ' />'}`}</a>}
            {props.githubLink && <a className={`${contentStyles.linkButton}`} target="blank" href={props.githubLink} >{`${showTags && '<a '}Visit Repo${showTags && ' />'}`}</a>}
        </div>
    )
}