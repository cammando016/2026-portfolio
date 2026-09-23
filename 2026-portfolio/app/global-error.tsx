'use client'

import { useRouter } from "next/navigation";

interface Props {
    error: Error & { digest?: string },
    reset: () => void;
}

const containerStyle: React.CSSProperties = { 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
}

const htmlBodyStyle: React.CSSProperties = {
    height: '100%',
    margin: 0,
}

const buttonDiv: React.CSSProperties = {
    margin: '10px',
}

const button: React.CSSProperties = {
    backgroundColor: '#0071c1',
    padding: '15px',
    cursor: 'pointer',
    margin: '10px',
    borderRadius: '5px',
    color: 'white',
}

export default function GlobalError(props : Props) {
    const router = useRouter();
    return (
        <html style={htmlBodyStyle}>
            <body style={htmlBodyStyle}>
                <div style={containerStyle}>
                    <div>
                        <h2>Something went wrong</h2>
                        <p>Error: {props.error.message}</p>
                    </div>
                    <div style={buttonDiv}>
                        <button style={button} onClick={() => router.replace('/')}>Return Home</button>
                    </div>
                </div>
            </body>
        </html>
    )
}