// Gallery photos. Put image files in photos/gallery/ and add one entry per photo;
// photos are grouped under year headings, newest year first.
//   { year: 2025, src: "photos/gallery/2025-xxx.jpg", en: "English caption", zh: "中文說明" },
// Optional `position` (CSS object-position, e.g. "center 60%") picks which part of a tall photo shows in the thumbnail.
const GALLERY = [
  {
    year: 2026,
    src: "photos/gallery/2026-snu-visit.jpg",
    en: "Visiting Seoul National University, Korea, October 2026.",
    zh: "參訪韓國首爾大學，2026 年 10 月。",
  },
  {
    year: 2026,
    src: "photos/gallery/2026-weed-workshop-group.jpg",
    en: "We co-organized the International Weed Science Training Workshop Series, June 2026.",
    zh: "本研究室協辦「國際雜草科學訓練工作坊系列」（International Weed Science Training Workshop Series），2026 年 6 月。",
  },
  {
    year: 2026,
    src: "photos/gallery/2026-weed-workshop-session.jpg",
    en: "A training session at the International Weed Science Training Workshop Series, June 2026.",
    zh: "國際雜草科學訓練工作坊課程實況，2026 年 6 月。",
  },
  {
    year: 2026,
    src: "photos/gallery/berasategui-ntm-visit.jpg",
    position: "center 62%",
    en: "Visiting the National Taiwan Museum with Aileen Berasategui during her visit to Taiwan.",
    zh: "Aileen Berasategui 來臺訪問，與研究室成員一同參觀國立臺灣博物館。",
  },
  {
    year: 2026,
    src: "photos/gallery/2026-kemanian-visit.jpg",
    en: "Armen Kemanian (Penn State) visited us.",
    zh: "美國賓州州立大學 Armen Kemanian 來訪。",
  },
  {
    year: 2025,
    src: "photos/gallery/2025-gregg-howe-seminar.jpg",
    en: "Prof. Gregg Howe (Michigan State University; member of the U.S. National Academy of Sciences) gave a seminar, June 2025.",
    zh: "美國密西根州立大學 Gregg Howe 講座教授（美國國家科學院院士）蒞校演講，2025 年 6 月。",
  },
  {
    year: 2025,
    src: "photos/gallery/2025-anjel-lab-visit.jpg",
    en: "Anjel Helms (Texas A&M University) visited us.",
    zh: "美國德州農工大學 Anjel Helms 來訪。",
  },
  {
    year: 2024,
    src: "photos/gallery/2024-ipri2024-group.jpg",
    en: "IPRI2024 participants at the World Vegetable Center, Tainan, Taiwan.",
    zh: "IPRI2024 與會者於世界蔬菜中心（亞蔬）合影，臺南。",
  },
  {
    year: 2024,
    src: "photos/gallery/2024-ipri2024.jpg",
    en: "We hosted the 26th International Plant Resistance to Insects Symposium (IPRI2024), April 2024, Tainan, Taiwan.",
    zh: "本研究室主辦第 26 屆國際植物抗蟲性研討會（IPRI2024），2024 年 4 月，臺南。",
  },
];

(function () {
  const root = document.getElementById("gallery");
  if (!root) return;
  const lang = document.documentElement.lang.startsWith("zh") ? "zh" : "en";

  if (GALLERY.length === 0) {
    root.outerHTML = '<div class="placeholder">' +
      (lang === "zh" ? "照片即將更新。" : "Photos coming soon.") + "</div>";
    return;
  }

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = "<img alt=\"\"><p></p>";
  dialog.addEventListener("click", () => dialog.close());
  document.body.appendChild(dialog);

  const years = [...new Set(GALLERY.map((p) => p.year))].sort((a, b) => b - a);
  for (const year of years) {
    const heading = document.createElement("h3");
    heading.className = "year";
    heading.textContent = year;
    root.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "gallery";
    root.appendChild(grid);

    for (const photo of GALLERY.filter((p) => p.year === year)) {
      const caption = photo[lang] || photo.en || "";
      const fig = document.createElement("figure");
      const btn = document.createElement("button");
      btn.type = "button";
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = caption;
      img.loading = "lazy";
      if (photo.position) img.style.objectPosition = photo.position;
      btn.appendChild(img);
      btn.addEventListener("click", () => {
        dialog.querySelector("img").src = photo.src;
        dialog.querySelector("img").alt = caption;
        dialog.querySelector("p").textContent = caption;
        dialog.showModal();
      });
      fig.appendChild(btn);
      if (caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = caption;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    }
  }
})();
