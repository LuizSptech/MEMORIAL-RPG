const input = document.getElementById("inputMidia");
const galeria = document.getElementById("galeria");

// Carregar mídias salvas
let midias = JSON.parse(localStorage.getItem("midias")) || [];

function renderizar() {
  galeria.innerHTML = "";

  midias.forEach((item) => {
    if (item.tipo.startsWith("image")) {
      const img = document.createElement("img");
      img.src = item.dado;
      img.width = 150;
      galeria.appendChild(img);
    } else if (item.tipo.startsWith("video")) {
      const video = document.createElement("video");
      video.src = item.dado;
      video.width = 200;
      video.controls = true;
      galeria.appendChild(video);
    }
  });
}

// Evento de upload
input.addEventListener("change", () => {
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    midias.push({
      tipo: file.type,
      dado: e.target.result
    });

    localStorage.setItem("midias", JSON.stringify(midias));
    renderizar();
  };

  reader.readAsDataURL(file);
});

// Limpar tudo
function limpar() {
  localStorage.removeItem("midias");
  midias = [];
  renderizar();
}

// Render inicial
renderizar();