const externalUrl = "https://dev.to";

(function () {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((_) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }
})();

function fetchDocument() {
  axios
    .get(externalUrl)
    .then((res) => {
      const root = document.getElementById("root");
      const html = res.data
      root.innerHTML = html;
    })
    .catch(console.log);

  return false;
}

// function attachIframe() {
//   const iframe = document.createElement("iframe");
//   iframe.setAttribute("src", externalUrl);
//   iframe.style.width = "100vw";
//   iframe.style.height = "100vh";

//   const root = document.getElementById("root");
//   root.innerHTML = "";
//   root.append(iframe);

//   return false;
// }
