'use client'

interface Props {
    error: Error & { digest?: string },
    reset: () => void;
}

const htmlBodyStyle: React.CSSProperties = {
    height: '100%',
    margin: 0,
}

const css = `
  .app-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .app-header {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
  }
  .app-body {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
  }
  .app-icons {
    width: 75px;
    flex-shrink: 0;
    background-color: #2c2c2c;
  }
  .app-files {
    width: 225px;
    flex-shrink: 0;
    background-color: #f3f3f3;
  }
  .app-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
  .app-footer {
    flex-shrink: 0;
    color: #0071c1;
    background-color: #0071c1;
  }
  .app-button {
    display: inline-block;
    background-color: #0071c1;
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    text-decoration: none;
  }

  /* mobile layout: stack header, icons, content, and footer vertically but hide files pane */
  @media (max-width: 640px) {
    .app-body {
      flex-direction: column;
    }
    .app-icons {
      width: 100%;
      height: 50px;
    }
    .app-files {
      display: none;
    }
  }
`

const control = (colour : string) : React.CSSProperties => ({
    minWidth: '1vw',
    minHeight: '1vw',
    margin: '6px',
    borderRadius: '9999px',
    backgroundColor: colour,
})

export default function GlobalError(props : Props) {
    return (
        <html style={htmlBodyStyle}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>{css}</style>
            </head>
            <body style={{ height: '100%', margin: '0' }}>
                <div className="app-window">
                    <div className="app-header">
                        <div style={control('#FF4E4F')} />
                        <div style={control('#FFB33C')} />
                        <div style={control('#1DC448')} />
                    </div>

                    <div className="app-body">
                        <div className="app-icons" />
                        <div className="app-files" />

                        <div className="app-content">
                        <div>
                            <h2>Something went wrong</h2>
                            <p>Error: {props.error.message}</p>
                        </div>
                        <a className="app-button" href="/">
                            Return Home
                        </a>
                        </div>
                    </div>

                    <div className="app-footer">
                        <p>Footer</p>
                    </div>
                </div>
            </body>
        </html>
    )
}