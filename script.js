let textInput = document.querySelector('#task');

let buttonActive = document.querySelector('#liveToastBtn');

let toDoList = document.querySelector('#list');
//DOM işlemleri icin queryler seçildi.

buttonActive.addEventListener('click', newElement);
//'ekle' butonu tıklandığında 'newElement()' fonksiyonu çağırılacak.

function newElement() {

    let text = textInput.value; 

    if (text === "") { 
        //Boşluk girilirse hata mesajı içeren div toast ile çağırılıyor
        $(document).ready(function () {
            $('.error').toast('show');
        });
        return;
    }
    if (text != "") {
        localSave(text); // local storage'a kayıt


        var newListElement = document.createElement('li');  // text inputu liste elemanı olarak yaratıldı.
        newListElement.innerHTML = text;


        var trash = document.createElement('a'); // çöp kutusu 
        trash.setAttribute('href', '#');
        trash.setAttribute("style", "float: right; color: black;");
        trash.innerHTML = '<i class="fas fa-trash-alt"></i>';

        newListElement.appendChild(trash);
        toDoList.appendChild(newListElement);


        $(document).ready(function () { // Toast mesajı çağırılıyor
            $('.success').toast('show');
        });
        input.value = "";
    }
}


toDoList.addEventListener('click', removeItem); // liste elemanı silme için DOM ve fonksiyon
function removeItem(param) {
    if (param.target.className === 'fas fa-trash-alt') { // hedef çöp kutusu 
        param.target.parentElement.parentElement.remove(); // parentElement.parentElement sayesinde eklenen son elemanı siliyoruz.
        
        removeFromLocal(); // local storage'dan da sil.
    }
    
}


function localSave(text) { // local storage kaydetme fonksiyonu

    let keys;

    if (localStorage.getItem('key') === null) {
        keys = []; 
    }
    else {
        keys = JSON.parse(localStorage.getItem('key'));
    }
    keys.push(text);
    localStorage.setItem('key', JSON.stringify(keys));
}


document.addEventListener('DOMContentLoaded', getList); //DOM içeriğini yükleme fonk. için event 
function getList() {
    let elements;
    if (localStorage.getItem('key') === null) { // local storageda key değeri null olanlar
        elements = [];
    }
    else {
        elements = JSON.parse(localStorage.getItem('key'));
    }
    elements.forEach(function (text) {

        var li = document.createElement('li');
        li.innerHTML = text;
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute("style", "float: right; color: black;");
        a.innerHTML = '<i class="fas fa-trash-alt"></i>';
        li.appendChild(a);
        toDoList.appendChild(li);
    })
}


function removeFromLocal(text) {
    let keys;
    if (localStorage.getItem('key') === null) {
        keys = [];
    }
    else {
        keys = JSON.parse(localStorage.getItem('key'));
    }
    const data = text;
    keys.splice(keys.indexOf(data), 1);
    localStorage.setItem('key', JSON.stringify(keys));
}