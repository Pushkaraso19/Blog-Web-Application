function toggleDropdown(event) {
  event.stopPropagation();
  const dropdownContent = event.target.closest(".dropdown").querySelector(".dropdown-content");
  dropdownContent.classList.toggle("active");
}

const navLinks = document.querySelectorAll('.nav-link');

const currentURL = window.location.href;

navLinks.forEach(link => {
    if (link.href === currentURL) {
        link.classList.add('active'); 
    }
});

document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-content").forEach(dropdown => {
    dropdown.classList.remove("active");
  });
});
  