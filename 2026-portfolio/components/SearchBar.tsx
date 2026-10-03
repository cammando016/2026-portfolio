import styles from '../styles/home-layout.module.scss';
import contentStyles from '../styles/content.module.scss';

export default function SearchBar () {
    return (
        <div className={`${styles.filesPane} ${styles.linkText}`} style={{paddingLeft: '5px', paddingTop: '15px'}}>
            <p style={{marginBottom: '10px'}}>SEARCH</p>

            <input 
                type='text'
                placeholder='Search...'
                className={contentStyles.input}
                style={{maxWidth: '95%'}}
                maxLength={15}
            />
        </div>
    )
}