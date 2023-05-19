const blob = document.getElementById("blob");

window.onpointermove = function(event) {
  const { clientX, clientY } = event;
  if (event.target) {
    blob.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  }
};
export default blob;
