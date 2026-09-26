import Image, { StaticImageData } from "next/image";
import styles from '../../styles/content.module.scss';

import htmlLogo from '../../assets/html.png';
import cssLogo from '../../assets/css.png';
import tsLogo from '../../assets/typescript.png';
import scssLogo from '../../assets/scss.png';
import nextLogo from '../../assets/nextlogo.png';
import nodeLogo from '../../assets/node2.png';
import postgresLogo from '../../assets/postgre.png';
import pythonLogo from '../../assets/python.png';
import vercelLogo from '../../assets/vercel.png';
import reactLogo from '../../assets/react.png';
import claudeLogo from '../../assets/claude.png';
import expoLogo from '../../assets/expo.png';
import supabaseLogo from '../../assets/supabase2.png';

type Skill = {
    logo: StaticImageData,
    alt: string,
    label: string,
}

export default function Skills () {
    const skillLogos : Skill[] = [
        {logo: htmlLogo, alt: 'Html Logo', label: 'HTML'},
        {logo: cssLogo, alt: 'CSS Logo', label: 'CSS'},
        {logo: tsLogo, alt: 'TS Logo', label: 'TypeScript'},
        {logo: reactLogo, alt: 'React Logo', label: 'React'},
        {logo: nextLogo, alt: 'Next Logo', label: 'NextJS'},
        {logo: vercelLogo, alt: 'Vercel Logo', label: 'Vercel'},
        {logo: nodeLogo, alt: 'Node Logo', label: 'NodeJS'},
        {logo: postgresLogo, alt: 'Postgres Logo', label: 'PostgreSQL'},
        {logo: supabaseLogo, alt: 'Supabase Logo', label: 'Supabase'},
        {logo: scssLogo, alt: 'SCSS Logo', label: 'SCSS'},
        {logo: reactLogo, alt: 'React Logo', label: 'Native'},
        {logo: expoLogo, alt: 'Expo Logo', label: 'Expo Go'},
        {logo: claudeLogo, alt: 'Claude Logo', label: 'Claude'},
        {logo: pythonLogo, alt: 'Python Logo', label: 'Python'},
    ];

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