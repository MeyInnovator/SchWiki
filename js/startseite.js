document.addEventListener("DOMContentLoaded", () => {
    const progressData = [
      { lernfeld: "Lernfeld 1", completed: 9, total: 15 },
      { lernfeld: "Lernfeld 2", completed: 9, total: 15 },
      { lernfeld: "Lernfeld 3", completed: 9, total: 15 },
    ];
  
    // Dynamisch Fortschrittskreise aktualisieren
    const lernfeldItems = document.querySelectorAll(".lernfeld-item");
    lernfeldItems.forEach((item, index) => {
      const progressCircle = item.querySelector(".progress-circle circle:last-child");
      const percentage = progressData[index].completed / progressData[index].total;
      progressCircle.style.strokeDashoffset = 113 - percentage * 113;
      item.querySelector(".progress-circle span").textContent = `${progressData[index].completed}/${progressData[index].total}`;
    });
  });
  