import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, subject, message } = await request.json();

    const emailContent = `
姓名：${name}
聯絡信箱：${email}

訊息內容：
${message}
    `.trim();

    const result = await resend.emails.send({
      from: "noreply@ezeetech.tw",
      to: ["info@ezeetech.tw", "info.ezeetech.sustain@gmail.com"],
      replyTo: email,
      subject: subject || "網站聯絡表單",
      text: emailContent,
    });

    if (result.error) {
      return Response.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return Response.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
