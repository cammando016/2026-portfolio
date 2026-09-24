import globalStyles from '../../styles/global.module.scss';
import contentStyles from '../../styles/content.module.scss';

interface Props {
    projectLink?: string,
    githubLink?: string
}

export default function ProjectLinks (props : Props) {
    return (
        <div className={`${globalStyles.rowFlex} ${contentStyles.projectLinks}`}>
            {props.projectLink && <a className={`${contentStyles.linkButton}`} target="blank" href={props.projectLink} >Visit Project</a>}
            {props.githubLink && <a className={`${contentStyles.linkButton}`} target="blank" href={props.githubLink} >Visit Repo</a>}
        </div>
    )
}