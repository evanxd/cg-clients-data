var fs = require('fs');
var pdfText = require('pdf-text');

pdfText(__dirname + '/cg-clients-data.pdf', function(err, chunks) {
  var length = chunks.length;
  var data = [];
  var json;

  for (var i = 0; i < length; i++) {
    // Search for the data id.
    if (chunks[i].match(/[A-Z]{1}\d+/)) {
      // Create company info data set.
      data.push({
        id: chunks[i],
        name: chunks[++i],
        amount: chunks[++i],
        city: chunks[++i],
        address: chunks[++i],
        tel: chunks[++i]
      });
    }
  }

  json = JSON.stringify(data);
  fs.writeFileSync('data.json', json, {
    encoding: 'utf8'
  });
});
