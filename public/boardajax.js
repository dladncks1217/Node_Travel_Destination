/*function getComment(id) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        var comments = JSON.parse(xhr.responseText);
        var tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        comments.map(function (Post) {
          let row = document.createElement('tr');
          let td = document.createElement('td');
          td.textContent = Post.nick;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = Post.place;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = Post.comment;
          row.appendChild(td);
          
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
              if (xhr.status === 200) {
                console.log(xhr.responseText);
                getComment(id);
              } else {
                console.error(xhr.responseText);
              }
            };

          
          td = document.createElement('td');
          td.appendChild(edit);
          row.appendChild(td);
          td = document.createElement('td');
          td.appendChild(remove);
          row.appendChild(td);
          tbody.appendChild(row);
        });
      } 
    };
    xhr.open('GET', '/comments/' + id);
    xhr.send();
  }
  */