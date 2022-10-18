(function() {
  function genTitleNav() {
    var titles = document.querySelectorAll('.card-title');
    if (titles.length === 0) {
      return;
    }
    var ul = document.createElement('ul');
    for (var i = 0; i < titles.length; i++) {
      var title = titles[i];
      var li = document.createElement('li');
      var a = document.createElement('a');
      li.appendChild(a);
      a.innerHTML = title.textContent;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    
  });
})();