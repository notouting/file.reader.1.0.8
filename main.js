var result = document.querySelector("#result");
var form = document.querySelector("form");

form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    result.innerHTML = null;
    var folderInput = document.getElementById('folderPath');
    var searchNameInput = document.getElementById('searchName');
    var searchQuery = searchNameInput.value.trim();
    var files = folderInput.files;
    var lastIndex = files.length - 1;

    document.querySelector(".loading").innerHTML = "<p class='load'>Qidirilmoqda</p>";

    for (var i = 0; i < files.length; i++) {
        (function (file, index) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;

                if (data.indexOf(searchQuery) !== -1) {
                    result.innerHTML += '<button data-id="' + data + '" data-search="' + searchQuery + '">' + file.name + '</button>';
                }
                if (index === lastIndex) {
                    document.querySelector(".loading").innerHTML = "<p class='complete'>Qidirish tugadi</p>";
                }
            };

            reader.readAsText(file);
        })(files[i], i);
    }
});

result.addEventListener("click", function (evt) {
    if (evt.target.tagName === 'BUTTON') {
        var id = evt.target.getAttribute('data-id');
        var search = evt.target.getAttribute('data-search');
        var final = id.replace(new RegExp(search, 'g'), '<mark>' + search + '</mark>');
        document.querySelector(".last-result").innerHTML = final;
    }
});