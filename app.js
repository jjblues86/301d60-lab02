'use strict';

const allImages = [];
const keys = [];

const imgShown = Handlebars.compile($('#image-template').html());


// creating a constructor for all the images
function Images(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  allImages.push(this);
  this.renderWithHandlebars();
  this.optionMenu();
}


// creating a cloned copy for rendering the images
Images.prototype.renderClonedImages = function () {

  let clone = $(`#image-template`).clone();

  clone.find('h2').text(this.title);
  clone.find('img').attr('src', this.image_url);
  clone.attr('id', this.keyword);
  clone.find('p').text(this.description);
  clone.removeAttr('class');
  $('#page-1-div').append(clone);
}

Images.prototype.renderWithHandlebars = function () {
  const myShownImgs = imgShown(this);
  console.log('myShownImgs :', myShownImgs);
  $('#page-1-div').append(myShownImgs);
}



function dataOneArrayLoad() {
  $.get('data/data.json').then(
    (data) => {
      data.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
      })
      data.forEach(allImagesFile => {
        new Images(allImagesFile.title, allImagesFile.image_url, allImagesFile.description, allImagesFile.keyword, allImagesFile.horns);
      })
    });
}
function dataOneSortByHorns() {
  $.get('data/data.json').then(
    (data) => {
      data.sort(function (a, b) {
        if (a.horns > b.horns) {
          return 1;
        } else if (a.horns < b.horns) {
          return -1;
        }
      })
      data.forEach(allImagesFile => {
        new Images(allImagesFile.title, allImagesFile.image_url, allImagesFile.description, allImagesFile.keyword, allImagesFile.horns);
      })
    });
}



// allImages.forEach(imgs => {
//   imgs.renderWithHandlebars();
// })

// creating the option
Images.prototype.optionMenu = function () {
  if (keys.indexOf(this.keyword) === -1) {
    $('select[name="horn-images"]').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');
    $option.attr('value', this.keyword);
    $option.text(this.keyword);
    $option.removeClass('option');

    keys.push(this.keyword);
  }
};

// //selecting box filtering
$('select[name="horn-images"]').on('change', function () {
  let $selection = $(this).val();

  if ($selection === 'default') {
    $('section').show()
  } else {

    $('section').hide()
    $(`section[id="${$selection}"]`).show()
  }
})

$('select[name="sort"]').on('change', function () {
  let $selection = $(this).val();

  if ($selection === 'horns') {
    $('div[id="page-2-div"]').empty();
    $('div[id="page-1-div"]').empty();
    removeDataFromArray()
    dataOneSortByHorns();
  } else if ($selection === 'title') {
    $('div[id="page-2-div"]').empty();
    $('div[id="page-1-div"]').empty();
    removeDataFromArray()
    dataOneArrayLoad();
  }
})


////////////Page-2 data load
// creating a constructor for all the images
function datatwoRender() {
  $.get('data/page-2.json').then(
    (data) => {
      data.forEach(allImagesFile => {
        let images = new Images(allImagesFile.title, allImagesFile.image_url, allImagesFile.description, allImagesFile.keyword, allImagesFile.horns);
        images.renderDataTwoWithHandlebars();
        images.optionMenuFromData2();
      })
      $('#data2-photo-template').hide();

    });

}

Images.prototype.renderClonedImagesFromData2 = function () {

  let clone = $(`#data2-photo-template`).clone();

  clone.find('h2').text(this.title);
  clone.find('img').attr('src', this.image_url);
  clone.attr('id', this.keyword);
  clone.find('p').text(this.description);
  clone.removeAttr('class');
  $('div[id="page-2-div"]').append(clone);
}

Images.prototype.renderDataTwoWithHandlebars = function () {
  const myShownImgs = imgShown(this);
  console.log('myShownImgs :', myShownImgs);
  $('#page-2-div').append(myShownImgs);
}


Images.prototype.optionMenuFromData2 = function () {
  if (keys.indexOf(this.keyword) === -1) {
    $('select[name="data2-images"]').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');

    $option.attr('value', this.keyword);
    $option.text(this.keyword);

    $option.removeClass('option');

    keys.push(this.keyword);
  }
};



///////onclick event for button
$('nav[id="changeData"]').on('click', 'button', function () {
  // console.log('nav[id="changeData"] :', $('nav[id="changeData"]'));
  // console.log('li :', $('li'));
  let $selection = $(this).val();

  if ($selection === 'page1') {
    $('div[id="page-2-div"]').empty();
    $('div[id="page-1-div"]').empty();
    removeDataFromArray();
    dataOneArrayLoad()
    $('div[id="dataTwoOptions"]').children().hide();
    $('div[id="dataOneOptions"]').children().show();

  } else if ($selection === 'page2') {
    $('div[id="page-2-div"]').empty();
    $('div[id="page-1-div"]').empty();
    removeDataFromArray();
    datatwoRender();
    $('div[id="dataOneOptions"]').children().hide();
    $('div[id="dataTwoOptions"]').children().show();

  }
})


function removeDataFromArray() {
  for (let i = allImages.length; i > 0; i--) {
    console.log('allImages.length :', allImages.length);
    allImages.pop();
    console.log('allImages :', allImages);
  }
}

$('select[name="data2-images"]').on('change', function () {
  let $selection = $(this).val();
  console.log($selection);

  if ($selection === 'default') {
    $('section').show()
    $('div[id="page-1-div"]').children().hide();
    $('#data2-photo-template').hide();
  } else {

    $('section').hide()
    $(`section[id="${$selection}"]`).show()
  }
})
