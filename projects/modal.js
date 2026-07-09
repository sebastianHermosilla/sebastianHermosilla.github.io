document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
  
    // Escucha clics en todas las tarjetas de proyecto
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const projectUrl = card.dataset.project;
  
        fetch(projectUrl)
          .then(response => response.text())
          .then(data => {
            // Crear un contenedor temporal para extraer solo el <main>
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;
  
            const content = tempDiv.querySelector("main");
            if (content) {
              modalBody.innerHTML = content.outerHTML;
              modal.style.display = "block";
  
              // Buscar y asignar funcionalidad al botón de cierre
              const closeBtn = document.querySelector(".close");
              if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                  modal.style.display = "none";
                  modalBody.innerHTML = "";
                });
              }
            } else {
              modalBody.innerHTML = "<p>Oops! Could not load content.</p>";
              modal.style.display = "block";
            }
          })
          .catch(error => {
            console.error("Error loading project:", error);
            modalBody.innerHTML = "<p>Error loading project.</p>";
            modal.style.display = "block";
          });
      });
    });
  
    // Cerrar modal haciendo clic fuera del contenido
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modalBody.innerHTML = "";
      }
    });
  });
  