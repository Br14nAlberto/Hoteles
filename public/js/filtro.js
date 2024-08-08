function myFunction() {
  let filter, input, valor, card;
  input = document.getElementById("entrada");
  filter = input.value.toUpperCase();
  nombre = document.getElementsByClassName("nombreH");
  card = document.getElementsByClassName("hoteles");
  for (let index = 0; index < nombre.length; index++) {
    valor = nombre[index].textContent || nombre[index].innerText;
    if (valor.toUpperCase().indexOf(filter) > -1) {
      card[index].style.display = "";
    } else {
      card[index].style.display = "none";
    }
  }
}