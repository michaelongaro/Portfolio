import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./Contact.module.css";
import "../../index.css";

export function Contact(props: any) {
  const formRef = useRef<HTMLFormElement>(null);

  // const [showVerticalStyling, setShowVerticalStyling] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   if (window.innerWidth <= 725) {
  //     setShowVerticalStyling(true);
  //   }

  //   function resizeHandler() {
  //     if (window.innerWidth <= 725) {
  //       setShowVerticalStyling(true);
  //     }
  //   }

  //   window.addEventListener("resize", resizeHandler);
  // }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dhu4wg4",
        "template_u5w960t",
        formRef.current!,
        "iYPC-ZOsD3bdvV7lu"
      )
      .then(
        () => {
          toast.success("Message sent!");
        },
        () => {
          toast.error(
            "An error occurred while sending your message. Please try again later."
          );
        }
      );
  };

  return (
    <div id={"contact"} className={`${classes.contactContainer} baseVertFlex`}>
      <ToastContainer />

      <div className={"heading"}>Contact</div>

      <div style={{ textAlign: "center" }}>
        <p className={classes.contactText}>
          I would love to answer any questions, comments, or invitation to work
          together!
        </p>
        <p>Inquiries will be responded to promptly.</p>
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
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
        </div>
        <div style={{ gap: ".75rem" }} className={"baseVertFlex"}>
          <label>Message</label>
          <textarea className={classes.messageInput} name="message" rows={4} />
        </div>
        <input className={classes.submitButton} type="submit" value="Send" />
      </form>
    </div>
  );
}
