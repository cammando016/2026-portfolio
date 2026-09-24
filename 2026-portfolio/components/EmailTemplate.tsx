interface Props {
    sender: string,
    company?: string,
    returnEmail: string,
    emailContent: string,
}

export default function EmailTemplate(props: Props) {
    return (
        <div>
            <h2>Hi Cam</h2>
            <br />
            <p>{`${props.sender}${props.company ? ` from ${props.company}` : ''} sent you a message:`}</p>
            <br />
            <p>{props.emailContent}</p>
            <br />
            <p>{`Respond to ${props.sender} at ${props.returnEmail}`}</p>
        </div>
    )
}