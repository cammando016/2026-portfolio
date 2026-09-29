import EmailTemplate from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();
    const { submittedName, subject, company, returnEmail, emailContent, receiveCC, captchaToken } = body;

    if (!captchaToken) return Response.json({ error: 'Missing ReCAPTCHA token' }, { status: 400 });

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY!,
            response: captchaToken,
        }),
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success) return Response.json({ error: 'ReCAPTCHA verification failed '}, { status: 400 });

    if (
        !submittedName.trim() ||
        !returnEmail.trim() ||
        !subject.trim() ||
        !emailContent.trim()
    ) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Form <contact-me@contact.cameronanderson.au>',
            to: 'crpanderson@outlook.com',
            subject: `Portfolio Message: ${subject}`,
            react: EmailTemplate({
                sender: submittedName,
                company: company,
                returnEmail: returnEmail,
                emailContent: emailContent
            }),
            cc: receiveCC ? [returnEmail] : undefined
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return Response.json({ error: message }, { status: 500 });
    }
}