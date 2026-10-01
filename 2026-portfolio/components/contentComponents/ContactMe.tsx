'use client'

import React, { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
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

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

const validateForm = (values: FormState) : FormErrors => {
    const errors: FormErrors = {};
    if (!values.submittedName.trim()) errors.submittedName = 'Required';
    if (!values.returnEmail.trim()) {
        errors.returnEmail = 'Required';
    } else if (!EMAIL_REGEX.test(values.returnEmail)) {
        errors.returnEmail = 'Invalid';
    }
    if (!values.subject.trim()) errors.subject = 'Required';
    if (!values.emailContent.trim()) errors.emailContent = 'Required';
    return errors;
}

export default function ContactMe () {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [emailError, setEmailError] = useState<string | null>(null);

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

    const handleSendEmail = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!formValid) {
            setEmailError('Invalid values in form');
            return;
        }
        if (!captchaToken) {
            setEmailError('ReCAPTCHA not valid');
            return;
        }

        setSubmitStatus('sending');

        try {
            const res = await fetch ('/api/send', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ 
                    submittedName: form.submittedName,
                    subject: form.subject,
                    company: form.company,
                    returnEmail: form.returnEmail,
                    emailContent: form.emailContent,
                    receiveCC: form.receiveCC ? form.returnEmail : null,
                    captchaToken, 
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setEmailError(data.error.message ?? 'Sending failed');
                throw new Error(data.error.message ?? 'Sending failed');
            }

            setSubmitStatus('success');
            setForm({
                submittedName: '',
                subject: '',
                company: '',
                returnEmail: '',
                emailContent: '',
                receiveCC: false,
            });
            setEmailError(null);
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
        } catch {
            setSubmitStatus('error');
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
        }
    }

    return (
        <div style={{marginLeft: '20px', marginTop: '15px'}}>
            <form onSubmit={handleSendEmail}>
                <fieldset className={styles.contactFieldset}>
                    <legend className={styles.contactLegend}>Contact Me</legend>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <div className={`${styles.label} ${globalStyles.rowFlex}`} >
                            <label htmlFor='submittedName'>Name *</label>
                            {errors.submittedName && <em><p className={styles.errorMessage}>{errors.submittedName}</p></em>}
                        </div>
                        <input
                            maxLength={25}
                            placeholder="Please enter your name"
                            className={`${styles.input} ${errors.submittedName ? styles.invalidInput : ''}`}
                            id="submittedName"
                            type="text"
                            value={form.submittedName}
                            onChange={(e) => setForm(prev => ({...prev, submittedName: e.target.value})) }
                        />
                        
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <div className={`${styles.label} ${globalStyles.rowFlex}`} >
                            <label className={styles.label} htmlFor='returnEmail'>Return Email Address *</label>
                            {errors.returnEmail && <em><p className={styles.errorMessage}>{errors.returnEmail}</p></em>}
                        </div>
                        <input
                            maxLength={50}
                            placeholder="Please enter an email for my response"
                            className={`${styles.input} ${errors.returnEmail ? styles.invalidInput : ''}`}
                            id="returnEmail"
                            type="text"
                            value={form.returnEmail}
                            onChange={(e) => setForm(prev => ({...prev, returnEmail: e.target.value})) }
                        />
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <label className={styles.label} htmlFor='company'>Company</label>
                        <input
                            maxLength={40}
                            placeholder="Please enter your company name"
                            className={`${styles.input} `}
                            id="company"
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm(prev => ({...prev, company: e.target.value})) }
                        />
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <div className={`${styles.label} ${globalStyles.rowFlex}`} >
                            <label className={styles.label} htmlFor='subject'>Email Subject *</label>
                            {errors.subject && <em><p className={styles.errorMessage}>{errors.subject}</p></em>}
                        </div>
                        <input
                            maxLength={50}
                            placeholder="Please enter the email subject"
                            className={`${styles.input} ${errors.subject ? styles.invalidInput : ''}`}
                            id="subject"
                            type="text"
                            value={form.subject}
                            onChange={(e) => setForm(prev => ({...prev, subject: e.target.value})) }
                        />
                    </div>
                    <div className={`${globalStyles.columnFlex} ${styles.inputDiv}`}>
                        <div className={`${styles.label} ${globalStyles.rowFlex}`} >
                            <label className={styles.label} htmlFor='content'>Email Message *</label>
                            {errors.emailContent && <em><p className={styles.errorMessage}>{errors.emailContent}</p></em>}
                        </div>
                        <textarea
                            maxLength={1000}
                            placeholder="Please enter your message"
                            className={`${styles.input} ${errors.emailContent ? styles.invalidInput : ''}`}
                            rows={10}
                            id="content"
                            value={form.emailContent}
                            onChange={(e) => setForm(prev => ({...prev, emailContent: e.target.value})) }
                        ></textarea>
                    </div>
                    <div className={`${styles.inputDiv} ${globalStyles.rowFlex}`}>
                        <input
                            className={`${styles.checkbox}`}
                            type="checkbox"
                            value={styles.receiveCC}
                            onChange={() => setForm(prev => ({...prev, receiveCC: !prev.receiveCC})) }
                        />
                        <label className={styles.label} htmlFor='cc'>Receive CC?</label>
                    </div>
                    <div>
                        <ReCAPTCHA 
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token : any) => setCaptchaToken(token)}
                        />

                        <button
                            className={`${(!formValid || !captchaToken) ? styles.formButtonDisabled : styles.formButton}`}
                            style={{marginTop: '10px', marginBottom: '10px'}}
                            type="submit"
                            disabled={!formValid || !captchaToken}
                        >Send</button>
                        { 
                            submitStatus === 'sending' && <p>Sending Email...</p>
                        }
                        {
                            submitStatus === 'success' && <p>Email Sent!</p>
                        }
                        {
                            submitStatus === 'error' && <p>{`Error: ${emailError}`}</p>
                        }
                    </div>
                </fieldset>
            </form>
        </div>
    )
}