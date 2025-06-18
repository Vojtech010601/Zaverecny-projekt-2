document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  function handleScrollToTop() {
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", handleScrollToTop);
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }

  const categoryFilter = document.getElementById("movie-category-filter");
  const movieGrid = document.getElementById("movie-grid");

  // API filmy
  async function fetchMovies(query) {
    if (!movieGrid) return;
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Data:", data);

      displayMovies(data);
    } catch (error) {
      console.error("Chyba při načítání filmů:", error);
    }
  }

  function displayMovies(moviesData) {
    if (!movieGrid) return;

    movieGrid.innerHTML = "";
    if (moviesData.length === 0) {
      return;
    }

    moviesData.forEach((item) => {
      const show = item.show;
      if (show.image && show.image.medium && show.name) {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
                    <img src="${show.image.medium}" alt="${show.name}">
                `;
        movieGrid.appendChild(movieItem);
      }
    });
  }

  if (categoryFilter && movieGrid) {
    categoryFilter.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      if (selectedCategory !== "none") {
        fetchMovies(selectedCategory);
      } else {
        movieGrid.innerHTML = "";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("reg-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const registrationForm = document.getElementById("registrationForm");

  function checkPasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    passwordInput.classList.remove("password-match", "password-nomatch");
    confirmPasswordInput.classList.remove("password-match", "password-nomatch");

    if (password.length > 0 || confirmPassword.length > 0) {
      if (password === confirmPassword && password.length > 0) {
        passwordInput.classList.add("password-match");
        confirmPasswordInput.classList.add("password-match");
      } else {
        passwordInput.classList.add("password-nomatch");
        confirmPasswordInput.classList.add("password-nomatch");
      }
    }
  }

  passwordInput.addEventListener("input", checkPasswords);
  confirmPasswordInput.addEventListener("input", checkPasswords);
});
