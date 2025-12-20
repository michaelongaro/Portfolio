import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

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
          toast.success("Message sent!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section id="contact" className="py-20 scroll-mt-20 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative after:content-[''] after:block after:w-full after:h-1 after:bg-blue-500 after:mt-2 after:rounded-full">
          Contact
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-xl rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="How can I help you?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Contact;
