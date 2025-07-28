document.addEventListener("DOMContentLoaded", () => {
    window.MicroModal.init({
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
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
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
          window.MicroModal.show("feedback-modal");
          form.reset();
  
          setTimeout(() => {
            window.MicroModal.close("feedback-modal");
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
        window.MicroModal.show("feedback-modal");
      }
    });
  
    closeBtn?.addEventListener("click", () => {
      modal?.classList.add("hidden");
    });
  });
  