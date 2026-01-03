import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaCheck } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLFormElement>(null);

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    emailjs
      .sendForm(
        "service_cpdvlui", // service id
        "template_o1kbtsc", // template id
        formRef.current!,
        {
          publicKey: "vnlt9eOGz7CExZao6",
        }
      )
      .then(
        () => {
          setSubmitStatus("success");
          setName("");
          setEmail("");
          setMessage("");

          // Reset status after 3 seconds
          setTimeout(() => {
            setSubmitStatus("idle");
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSubmitStatus("error");

          // Reset status after 3 seconds
          setTimeout(() => {
            setSubmitStatus("idle");
          }, 3000);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section id="contact" className="py-20 scroll-mt-20 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-orange-600 after:mt-2 after:rounded-full">
          Contact
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-white dark:bg-stone-800 border dark:border-stone-700 shadow-xl rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              placeholder="How can I help you?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || submitStatus === "success"}
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${
              isSubmitting || submitStatus === "success"
                ? "bg-stone-400 cursor-not-allowed"
                : submitStatus === "error"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-orange-600 hover:bg-orange-700 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              "Sending..."
            ) : submitStatus === "success" ? (
              <>
                Message sent <FaCheck />
              </>
            ) : submitStatus === "error" ? (
              <>
                Error sending <BiErrorCircle />
              </>
            ) : (
              <div className="flex justify-center items-center gap-2">
                Send Message
                <IoIosMail className="size-5 mt-[2px]" />
              </div>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
