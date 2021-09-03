/************************ Menu **********************************/
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
    d.addEventListener("click", (e) => {
      if (!e.target.matches(".menu a")) return false;
      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
    });
  });
})(document);

/************************ Contact Form **********************************/

((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/ikari14.igret@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);

/**************************** DARK THEME ***************************/

((d) => {
  const $btnDark = d.querySelector(".btn-dark"),
    $btnLight = d.querySelector(".btn-light"),
    ls = localStorage,
    $selectors = d.querySelectorAll("[data-dark]"),
    $logo = d.querySelector(".logo"),
    classDark = "dark-mode";

  const lightMode = () => {
    $logo.src = "./assets/Logo-color-transparente.png";
    $btnLight.classList.add("none");
    $btnDark.classList.remove("none");

    $selectors.forEach((el) => el.classList.remove(classDark));

    ls.setItem("theme", "light");
  };
  const darkMode = () => {
    $logo.src = "./assets/Logo-color-negativo.png";
    $btnDark.classList.add("none");
    $btnLight.classList.remove("none");

    $selectors.forEach((el) => el.classList.add(classDark));

    ls.setItem("theme", "dark");
  };

  $btnDark.addEventListener("click", (e) => {
    darkMode();
  });

  $btnLight.addEventListener("click", (e) => {
    lightMode();
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
    if (ls.getItem("theme") === "light") lightMode();
    if (ls.getItem("theme") === "dark") darkMode();
  });
})(document);
