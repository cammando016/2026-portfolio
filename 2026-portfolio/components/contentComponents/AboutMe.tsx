'use client'

import { useShowTagsContext } from "../../store/showTagsContext"
import styles from '../../styles/codeFile.module.scss';

export default function AboutMe () {
    const {showTags} = useShowTagsContext();
    return (
        <div className={styles.text}>
            <h3>
                {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                Introduction
                {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
            </h3>

            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                I am a full stack software engineer, looking for an opportunity to continue my IT career.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
            <br />
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                I completed a 6 month graduate program as a Software Support Consultant.
                My responsibilities were software support for existing customers, writing bespoke SQL reports per customer requests, and assisting with product implementation for new clients.
                The implementations were a mix of remote and on site, including being the supporting consultant for the 2 largest clients assisting with both on site at the clients' offices in New Zealand.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
            <br />
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                Due to strong technical skills shown in my role as a manager at Village Cinemas, I was offered a fixed term developer secondment within the projection support department. 
                During this secondment I was tasked with building a python script run on through a small user interface on an M5Stack device to send and receive MQTT messages via AWS to each cinema's sound system for external volume control.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>

            <br />
            <h3>
                {showTags && <span className={styles.tagLabel}>{`<h3>`}</span>}
                About Me
                {showTags && <span className={styles.tagLabel}>{`</h3>`}</span>}
            </h3>
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                I enjoy software development due to the mix of problem solving and creativity, and off my laptop I am an avid sports fan, throughout the year enjoying the AFL, NRL, Cricket, NBA, NHL & NFL seasons.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
            <br />
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                I also love snowboarding, going every winter including travelling to snowboarded twice in Japan, and am hoping to travel to Canada next.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
            <br />
            <p>
                {showTags && <span className={styles.tagLabel}>{`<p>`}</span>}
                I have played the flute for 16 years, and am currently teaching myself to play saxophone for a new challenge.
                {showTags && <span className={styles.tagLabel}>{`</p>`}</span>}
            </p>
        </div>
    )
}