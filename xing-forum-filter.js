(() => {
  return new Promise((resolve, reject) => {
    function scrollDownUntilYesterday() {
      if ((now - last) / 1000 / 60 / 60 < 36) {
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
          last = new Date(
            document
              .getElementById('stream')
              .getElementsByTagName('article')
              [
                document
                  .getElementById('stream')
                  .getElementsByTagName('article').length - 1
              ].getElementsByTagName('time')[0]
              .getAttribute('datetime')
          );
          scrollDownUntilYesterday();
        }, 1500);
      } else {
        alert('ready');
        setTimeout(() => {
          resolve(true);
        }, 1500);
      }
    }
    let now = Date.now();
    let last = new Date(
      document
        .getElementById('stream')
        .getElementsByTagName('article')
        [
          document.getElementById('stream').getElementsByTagName('article')
            .length - 1
        ].getElementsByTagName('time')[0]
        .getAttribute('datetime')
    );
    scrollDownUntilYesterday();
  }).then((result) => {
    for (let post of document
      .getElementById('stream')
      .getElementsByTagName('article')) {
      let text = post.innerText.toLowerCase();
      if (
        text.search('javascript') === -1 &&
        text.search('react') === -1 &&
        text.search('vue') === -1 &&
        text.search('typescript') === -1 &&
        text.search('nodejs') === -1
      ) {
        post.innerText = '';
      }
    }
    window.scrollTo(0, 0);
  });
})();
