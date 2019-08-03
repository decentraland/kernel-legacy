setTimeout(function() {
  define('main', function(require) {
    require(['react', 'react-dom', 'dcl/webb/fakelib'], function(fakelib) {
      fakelib.show()
    })
  })
}, 1000)
