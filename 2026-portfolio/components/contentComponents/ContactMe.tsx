'use client'

import { useState } from "react";
import styles from '../../styles/content.module.scss';
import globalStyles from '../../styles/global.module.scss';

type FormState = {
    submittedName: string,
    subject: string,
    company: string,
    returnEmail: string,
    emailContent: string,
    receiveCC: boolean,
}

type FormErrors = {
    submittedName?: string,
    subject?: string,
    company?: string,
    returnEmail?: string,
    emailContent?: string,
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateForm = (values: FormState) : FormErrors => {
    const errors: FormErrors = {};
    if (!values.submittedName.trim()) errors.submittedName = 'Name is required';
    if (!values.emailContent.trim()) {
        errors.returnEmail = 'Return email address is required';
    } else if (!EMAIL_REGEX.test(values.returnEmail)) {
        errors.returnEmail = 'Invalid email address format';
    }
    if (!values.subject.trim()) errors.subject = 'Email subject is required';
    if (!values.emailContent.trim()) errors.emailContent = 'Email message is required';
    return errors;
}

export default function ContactMe () {
    const [form, setForm] = useState<FormState>({
        submittedName: '',
        subject: '',
        company: '',
        returnEmail: '',
        emailContent: '',
        receiveCC: false,
    });

    const errors = validateForm(form);
    const formValid = Object.keys(errors).length === 0;

    return (
        <div>
            <form>
                <fieldset className={styles.contactFieldset}>
                    <legend className={styles.contactLegend}>Contact Me</legend>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='submittedName'>Name *</label>
                        <input
                            maxLength={20}
                            placeholder="Please enter your name"
                            className={`${styles.input} `}
                            id="submittedName"
                            type="text"
                            value={form.submittedName}
                            onChange={(e) => setForm(prev => ({...prev, submittedName: e.target.value})) }
                        />
                        {errors.submittedName && <em><p className={styles.errorMessage}>{errors.submittedName}</p></em>}
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='returnEmail'>Return Email *</label>
                        <input
                            maxLength={20}
                            placeholder="Please enter an email address for my response"
                            className={`${styles.input} `}
                            id="returnEmail"
                            type="text"
                            value={form.returnEmail}
                            onChange={(e) => setForm(prev => ({...prev, returnEmail: e.target.value})) }
                        />
                        {errors.returnEmail && <em><p className={styles.errorMessage}>{errors.returnEmail}</p></em>}
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='company'>Company</label>
                        <input
                            maxLength={20}
                            placeholder="Please enter your company name"
                            className={`${styles.input} `}
                            id="company"
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm(prev => ({...prev, company: e.target.value})) }
                        />
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='subject'>Email Subject *</label>
                        <input
                            maxLength={50}
                            placeholder="Please enter the email subject"
                            className={`${styles.input} `}
                            id="subject"
                            type="text"
                            value={form.subject}
                            onChange={(e) => setForm(prev => ({...prev, subject: e.target.value})) }
                        />
                        {errors.subject && <em><p className={styles.errorMessage}>{errors.subject}</p></em>}
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='content'>Email Message *</label>
                        <textarea
                            maxLength={1000}
                            placeholder="Please enter your message"
                            className={`${styles.input} `}
                            rows={10}
                            id="content"
                            value={form.emailContent}
                            onChange={(e) => setForm(prev => ({...prev, emailContent: e.target.value})) }
                        ></textarea>
                        {errors.emailContent && <em><p className={styles.errorMessage}>{errors.emailContent}</p></em>}
                    </div>
                    <div className={`${styles.inputDiv} ${globalStyles.rowFlex}`}>
                        <input
                            className={`${styles.checkbox}`}
                            type="checkbox"
                            value="receiveCC"
                            onChange={() => setForm(prev => ({...prev, receiveCC: !prev.receiveCC})) }
                        />
                        <label className={styles.label} htmlFor='cc'>Receive CC?</label>
                    </div>
                    <div>
                        <button
                            className={`${styles.formButton} ${formValid ? '' : styles.formButtonDisabled}`}
                            disabled={!formValid}
                        >Send</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}