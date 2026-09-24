'use client'

import { useShowTagsContext } from '../../store/showTagsContext';
import contentStyles from '../../styles/content.module.scss';
import codeFileStyles from '../../styles/codeFile.module.scss';

export default function Landing () {
    const {showTags} = useShowTagsContext();
    return (
        <div className={`${contentStyles.landing}`}>
            <h1>
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`<h1>`}
                </span>}
                Welcome to Cam's Portfolio
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`</h1>`}
                </span>}
            </h1>

            <br />

            <h4>
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`<h4>`}
                </span>}
                About This Site
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`</h4>`}
                </span>}
            </h4>

            <br />

            {showTags && <span className={codeFileStyles.tagLabel}>{`<ul>`}</span>}
            <ul>
                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    Use the files icon to navigate between pages
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>

                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    You can open and close the files within each file folder
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>

                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    Click on any of my project folders in the files tab to fetch the README from my github repo and see project screenshots
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>

                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    Rearrange file layout by dragging and dropping around the screen as you would on VS Code
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>

                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    Try visiting on a larger screen to rearrange files across multiple windows
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>

                <li>
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`<li>`}
                    </span>}
                    Customise the page to your preferences from the settings tab
                    {showTags && <span className={codeFileStyles.tagLabel}>
                        {`</li>`}
                    </span>}
                </li>
            </ul>
            {showTags && <span className={codeFileStyles.tagLabel}>{`</ul>`}</span>}

            <br />

            <p>
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`<p>`}
                </span>}
                Thank you for visiting!
                {showTags && <span className={codeFileStyles.tagLabel}>
                    {`</p>`}
                </span>}
            </p>
            
        </div>
    )
}