'use client'

import Image from "next/image";
import styles from '../../styles/content.module.scss';
import { useThemeContext } from "../../store/colourSchemeContext";
import { skillLogosData } from "../../data/skills";
import { Skill } from "../../types/Files";

export default function Skills () {
    const { theme } = useThemeContext();

    const skillLogos : Skill[] = skillLogosData.filter(s => !s.theme || s.theme === theme);

    return (
        <div className={styles.skillsContainer}>
        {
            skillLogos.map(s => {
                return (
                    <div key={s.label} className={styles.skillContainer}>
                        <Image src={s.logo} alt={s.alt} className={styles.skillImage} />
                        <p>{s.label}</p>
                    </div>
                )
            })
        }
        </div>
    )
}