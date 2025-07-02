// DONNÉES DES MEMBRES
window.members = [
  {
    nom: "JoweL Homeskillz",
    role: ["Dev", "creative 360", "musique", "founder"],
    image: "https://www.jow-l.com/uploads/9/7/1/8/9718598/published/homeskillz-450px-2017-discogs.jpg?1716919812",
    website: "https://www.jow-l.com/",
    metier: ["Dev", "creative 360", "musique"]
  },
  {
    nom: "Ethabo Jackson",
    role: ["Security", "logistic"],
    image: "https://github.com/bw-n/JWL/blob/main/IMG_20250701_215001_554.jpg?raw=true",
    fiche: "https://www.instagram.com/ethabojackson/?igsh=MW9xM3IzcmE3MHN0Yw%3D%3D#",
    metier: ["Security", "logistic"]
  }
]; // 👈 N’oublie pas ce point-virgule pour fermer proprement l’array

// Logique du Hub
document.addEventListener("DOMContentLoaded", function () {
  const membersData = window.members;

  // Extraire la liste unique des métiers
  const allMetiers = membersData.flatMap(m =>
    Array.isArray(m.metier) ? m.metier : [m.metier]
  );
  const uniqueFilters = [...new Set(allMetiers)].sort();

  const filtersDiv = document.getElementById("filters");
  const memberGrid = document.getElementById("member-grid");
  const backButton = document.getElementById("backButton");

  if (!filtersDiv || !memberGrid || !backButton) {
    console.warn("Certains éléments HTML manquent : vérifie l'existence des IDs filters, member-grid et backButton.");
    return;
  }

  // Afficher les membres passés en liste
  function renderMembers(list) {
    memberGrid.innerHTML = "";
    if (list.length === 0) {
      memberGrid.innerHTML = "<p>Aucun membre trouvé.</p>";
      return;
    }
    list.forEach(m => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${m.image}" alt="Photo de ${m.nom}">
        <div class="nom">${m.nom}</div>
        <div class="role">${Array.isArray(m.role) ? m.role.join(", ") : m.role}</div>
        <a href="${m.fiche}" target="_blank" rel="noopener noreferrer">Voir la fiche</a>
      `;
      memberGrid.appendChild(card);
    });

    if (window.innerWidth <= 768) {
      const y = memberGrid.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 20, behavior: "smooth" });
    }
  }

  // Afficher tous les membres et ré-afficher les filtres
  function showAll() {
    renderMembers(membersData);
    filtersDiv.style.display = "flex";
    backButton.style.display = "none";

    const y = filtersDiv.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerWidth > 768 ? 100 : 20;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  }

  // Filtrer les membres par métier sélectionné
  function filterBy(metier) {
    const filtered = membersData.filter(m =>
      Array.isArray(m.metier) ? m.metier.includes(metier) : m.metier === metier
    );
    renderMembers(filtered);
    filtersDiv.style.display = "none";
    backButton.style.display = "block";
  }

  // Créer un bouton pour chaque métier unique dans le filtre
  uniqueFilters.forEach(metier => {
    const btn = document.createElement("button");
    btn.textContent = metier;
    btn.onclick = () => filterBy(metier);
    filtersDiv.appendChild(btn);
  });

  // Bouton retour
  backButton.addEventListener("click", showAll);

  // Afficher tous les membres par défaut au chargement
  showAll();

  console.log("✅ script-V2.js chargé avec", window.members.length, "membres");
});
