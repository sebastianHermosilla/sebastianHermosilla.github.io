document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const projectUrl = card.dataset.project;

      fetch(projectUrl)
        .then(response => response.text())
        .then(data => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data;

          const content = tempDiv.querySelector("main");
          if (content) {
            modalBody.innerHTML = content.outerHTML;

            // Aplica la animación con la clase 'show'
            modal.classList.add("show");
          } else {
            modalBody.innerHTML = "<p>Oops! Could not load content.</p>";
            modal.classList.add("show");
          }

          // Botón de cierre (ahora se re-busca después de insertar el contenido)
          const closeBtn = document.querySelector(".close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              modal.classList.remove("show");
              setTimeout(() => modalBody.innerHTML = "", 300); // Espera animación
            });
          }
        })
        .catch(error => {
          console.error("Error loading project:", error);
          modalBody.innerHTML = "<p>Error loading project.</p>";
          modal.classList.add("show");
        });
    });
  });

  // Cierra modal haciendo clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => modalBody.innerHTML = "", 300);
    }
  });
});
