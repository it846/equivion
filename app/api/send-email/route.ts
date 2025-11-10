import { NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import LoanApplication from "@/models/LoanApplication";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...formData } = body;

    // Connect to MongoDB
    await connectDB();

    // Get IP address for tracking (optional)
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown';

    // Save to database based on form type
    let savedRecord;
    try {
      if (type === "application") {
        // Save loan application
        savedRecord = await LoanApplication.create({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          loanAmount: formData.loanAmount,
          employmentType: formData.employmentType,
          service: formData.service,
          ipAddress: ipAddress,
          status: 'new'
        });
        console.log("Loan application saved to database:", savedRecord._id);
      } else {
        // Save contact submission
        savedRecord = await ContactSubmission.create({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || 'General Inquiry',
          message: formData.message,
          ipAddress: ipAddress,
          status: 'new'
        });
        console.log("Contact submission saved to database:", savedRecord._id);
      }
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
      // Continue with email sending even if database fails
    }

    // Email configuration
    const TO_EMAIL = "info@equivion.in";

    // Create email subject based on form type
    const subject = type === "application"
      ? `New Loan Application - ${formData.service || "General"}`
      : `New Contact Form Submission - ${formData.service || "General"}`;

    // Create email body
    let emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #14b8a6; }
            .value { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New ${type === "application" ? "Loan Application" : "Contact"} Submission</h2>
            </div>
            <div class="content">
    `;

    // Add form fields to email body
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
        emailBody += `
          <div class="field">
            <span class="label">${label}:</span>
            <span class="value">${value}</span>
          </div>
        `;
      }
    });

    emailBody += `
              <div class="field" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                <span class="label">Submitted at:</span>
                <span class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Equivion Website <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject: subject,
        html: emailBody,
      });

      console.log("Email sent successfully to:", TO_EMAIL);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue even if email fails - we still want to respond to the user
    }

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully! We'll contact you soon."
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact us directly."
      },
      { status: 500 }
    );
  }
}
