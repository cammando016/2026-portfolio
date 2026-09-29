interface Props {
    sender: string,
    company?: string,
    returnEmail: string,
    emailContent: string,
}

export default function EmailTemplate(props: Props) {
    return (
        <div>
            <h4>Hi Cam,</h4>
            <p>{`${props.sender}${props.company ? ` from ${props.company}` : ''} sent you a message:`}</p>
            <p>{props.emailContent}</p>
            <p>{`Respond to ${props.sender} at ${props.returnEmail}`}</p>
        </div>
    )
}