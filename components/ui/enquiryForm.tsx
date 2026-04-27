"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function EnquiryForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("sending");

    const templateParams = {
      from_name: (form.current.querySelector('[name="from_name"]') as HTMLInputElement).value,
      from_email: (form.current.querySelector('[name="from_email"]') as HTMLInputElement).value,
      to_name: (form.current.querySelector('[name="from_name"]') as HTMLInputElement).value,
      to_email: (form.current.querySelector('[name="from_email"]') as HTMLInputElement).value,
      phone: (form.current.querySelector('[name="phone"]') as HTMLInputElement).value,
      subject: (form.current.querySelector('[name="subject"]') as HTMLSelectElement).value,
      message: (form.current.querySelector('[name="message"]') as HTMLTextAreaElement).value,
    };

    try {
      // Send enquiry to YOU
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ENQUIRY!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Send AUTO REPLY to customer (won't break main flow if it fails)
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REPLY!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      } catch (replyErr) {
        console.warn("Auto-reply failed:", replyErr);
        // Don't show error — main enquiry was sent successfully
      }

      setStatus("success");
      form.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-16" id="enquiry">
      <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
      <p className="text-center text-gray-500 mb-8">
        Interested in purchasing or commissioning a piece? Send me a message!
      </p>

      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="from_name"
            type="text"
            placeholder="Your Name *"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="from_email"
            type="email"
            placeholder="Your Email *"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <input
          name="phone"
          type="tel"
          placeholder="Your Phone (optional)"
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          name="subject"
          required
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black text-gray-600"
        >
          <option value="">-- What are you interested in? *</option>
          <option value="Buy a Print">🖼️ Buy a Print</option>
          <option value="Buy an Original">🎨 Buy an Original Artwork</option>
          <option value="Commission">✏️ Commission a Custom Piece</option>
          <option value="Collaboration">🤝 Collaboration</option>
          <option value="Other">💬 Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Your message... *"
          required
          rows={5}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {status === "idle" && "Send Enquiry"}
          {status === "sending" && "Sending..."}
          {status === "success" && "✅ Sent!"}
          {status === "error" && "Try Again"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center font-medium">
            ✅ Message sent! I'll get back to you within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center font-medium">
            ❌ Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </section>
  );
}