interface Props {
    projectLink?: string,
    githubLink?: string
}

export default function ProjectLinks (props : Props) {
    return (
        <div>
            {props.projectLink && <a target="blank" href={props.projectLink} >click to visit project</a>}
            {props.githubLink && <a target="blank" href={props.githubLink} >click to visit repo</a>}
        </div>
    )
}