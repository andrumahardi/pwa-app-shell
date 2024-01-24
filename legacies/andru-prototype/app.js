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
  const externalUrl = "https://dev.to/aurelkurtula";
  axios
    .get(externalUrl)
    .then((res) => {
      const root = document.getElementById("root");
      root.innerHTML = res.data;
    })
    .catch(console.log);

  return false;
}
