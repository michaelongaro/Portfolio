import { useState, useEffect, useRef } from "react";

import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./Contact.module.css";
import "../../index.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [reachedMobileViewportWidth, setReachedMobileViewportWidth] =
    useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setReachedMobileViewportWidth(true);
      } else {
        setReachedMobileViewportWidth(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_dhu4wg4",
        "template_u5w960t",
        formRef.current!,
        "iYPC-ZOsD3bdvV7lu"
      )
      .then(
        () => {
          toast.success("Message sent!", {
            position: reachedMobileViewportWidth
              ? toast.POSITION.BOTTOM_CENTER
              : toast.POSITION.TOP_RIGHT,
          });
          setName("");
          setEmail("");
          setMessage("");
        },
        () => {
          toast.error(
            "An error occurred while sending your message. Please try again later.",
            {
              position: reachedMobileViewportWidth
                ? toast.POSITION.BOTTOM_CENTER
                : toast.POSITION.TOP_RIGHT,
            }
          );
        }
      );
  }

  return (
    <div id={"contact"} className={`${classes.contactContainer} baseVertFlex`}>
      <ToastContainer
        style={
          reachedMobileViewportWidth
            ? undefined
            : {
                top: "6rem",
                right: "1rem",
              }
        }
      />

      <h2 className={"heading"}>Contact</h2>

      <div style={{ textAlign: "center" }}>
        <p className={classes.contactText}>
          I am happy to address any questions, comments, or opportunities for
          collaboration that you may have. Please feel free to reach out to me,
          and I will respond as soon as possible.
        </p>
      </div>

      <form
        ref={formRef}
        style={{ gap: "1.5rem" }}
        className={`${classes.formContainer} baseVertFlex`}
        onSubmit={sendEmail}
      >
        <div
          style={{ gap: "1rem" }}
          className={`${classes.nameAndEmail} baseFlex`}
        >
          <label htmlFor={"user_name"}>Name</label>
          <input
            tabIndex={39}
            type="text"
            name="user_name"
            id={"user_name"}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor={"user_email"}>Email</label>
          <input
            tabIndex={40}
            type="email"
            name="user_email"
            id={"user_email"}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ gap: ".75rem" }} className={"baseVertFlex"}>
          <label htmlFor={"message"}>Message</label>
          <textarea
            tabIndex={41}
            className={classes.messageInput}
            name="message"
            id={"message"}
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button tabIndex={42} className={classes.submitButton} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
