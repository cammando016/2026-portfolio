import contentStyles from '../../styles/content.module.scss';

export default function Landing () {
    return (
        <div className={`${contentStyles.landing}`}>
            <h1>Welcome to Cam's portfolio</h1>
            <br />
            <h4>About This Site</h4>
            <br />
            <ul>
                <li>Use the files icon to navigate between pages</li>
                <li>You can open and close the files within each file folder</li>
                <li>Click on any of my project folders in the files tab to fetch the README from my github repo and see project screenshots</li>
                <li className={`${contentStyles.landingDesktop}`}>Rearrange file layout by dragging and dropping around the screen as you would on VS Code</li>
                <li className={`${contentStyles.landingMobile}`}>Try visiting on a larger screen to rearrange files across multiple windows</li>
                <li>Customise the page to your preferences from the settings tab</li>
            </ul>
            <br />
            <p>Thank you for visiting!</p>
        </div>
    )
}