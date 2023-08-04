const PopUp = () => {
  function OpenPopUp(titulo) {
    var popUp = document.getElementById("PopUp");

    if (popUp.style.display === "flex") {
      popUp.style.display = "none";
    } else {
      popUp.style.display = "flex";
    }
    console.log(titulo);
  }
};

export default PopUp;
