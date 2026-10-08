import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from app.config import settings

logger = logging.getLogger("uvicorn.error")

def send_notification_email(subject: str, body: str, recipient: str = None) -> bool:
    to_email = recipient or settings.ADMIN_EMAIL
    if not settings.SMTP_HOST or not settings.SMTP_USERNAME:
        logger.info(f"[MOCK EMAIL to {to_email}] Subject: {subject} | Body: {body[:100]}...")
        return True

    try:
        msg = MIMEMultipart()
        msg["From"] = settings.SMTP_USERNAME
        msg["To"] = to_email
        msg["Subject"] = f"[JSD Group] {subject}"
        msg.attach(MIMEText(body, "html"))

        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USERNAME, to_email, msg.as_string())
        server.quit()
        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False
