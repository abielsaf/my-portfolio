import MicroModal from "micromodal";

document.addEventListener("DOMContentLoaded", () => {
    MicroModal.init({
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
      disableScroll: true,
    });
  
    const form = document.getElementById("contact-form");
    const modal = document.getElementById("feedback-modal");
    const titleEl = document.getElementById("modal-title");
    const messageEl = document.getElementById("modal-message");
    const closeBtn = document.querySelector('[data-micromodal-close]');
    const lang = document.documentElement.lang || "es";
  
    if (modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  
    const captchaError = document.getElementById("captcha-error");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Web3Forms rejects the POST server-side when hCaptcha is enabled and
      // unsolved; check here first so the user gets an inline message instead
      // of the generic error modal.
      const captcha = form.querySelector("textarea[name=h-captcha-response]");
      if (captcha && !captcha.value) {
        captchaError?.classList.remove("hidden");
        return;
      }
      captchaError?.classList.add("hidden");

      const formData = new FormData(form);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          if (titleEl && messageEl) {
            titleEl.textContent = form.dataset.successTitle || "";
            messageEl.textContent = form.dataset.successText || "";
          }
          modal?.classList.remove("hidden");
          MicroModal.show("feedback-modal");
          form.reset();
          // form.reset() clears the field but not the widget — without this the
          // next submit reuses a spent token and Web3Forms rejects it.
          window.hcaptcha?.reset();

          setTimeout(() => {
            MicroModal.close("feedback-modal");
            modal?.classList.add("hidden");
          }, 4000);
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        if (titleEl && messageEl) {
          titleEl.textContent = form.dataset.errorTitle || "";
          messageEl.textContent = form.dataset.errorText || "";
        }
        modal?.classList.remove("hidden");
        MicroModal.show("feedback-modal");
      }
    });
  
    closeBtn?.addEventListener("click", () => {
      modal?.classList.add("hidden");
    });
  });
  