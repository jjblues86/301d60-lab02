'use strict';

const allImages = [];
const keys = [];

const imgShown = Handlebars.compile($('#image-template').html());


// creating a constructor for all the images
function Images(animal, page) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.page = page

  allImages.push(this);
  this.renderWithHandlebars();
  this.optionMenu();
}

Images.prototype.renderWithHandlebars = function () {
  const myShownImgs = imgShown(this);
  $('#imgContainer').append(myShownImgs);
}

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


function loadDataFromPage(newData) {
  $.get(newData, 'json').then(data => createImagesContructor(data, currentPage))
}

function createImagesContructor(data, currentPage) {
  data.forEach(animal => {
    new Images(animal, currentPage);
  })

}



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
    allImages.sort(function(a,b) {
      if(a.horns > b.horns) return 1;
      if(b.horns > a.horns) return -1;
      return 0;
    });
    $('section').remove();
    allImages.forEach(images => images.renderWithHandlebars());
    $('section').hide();
    $(`section[data-page="${currentPage}"]`).show();
  } else if ($selection === 'title') {
    allImages.sort(function(a,b) {
      if(a.title > b.title) return 1;
      if(b.title > a.title) return -1;
      return 0;
    });
    $('section').remove();
    allImages.forEach(images => images.renderWithHandlebars());
    $('section').hide();
    $(`section[data-page="${currentPage}"]`).show();

  }
})

let currentPage = '';
///////onclick event for button
$('nav[id="changeData"]').on('click', 'button', function () {
  let $selection = $(this).val();
  $('section').hide();

  if ($selection === 'page1') {
    const section = $('section[data-page="data/data.json"]');
    if(!section.length){
      loadDataFromPage('data/data.json');
    }
    section.show();
    currentPage = 'data/data.json';
  } else if ($selection === 'page2') {
    const section = $('section[data-page="data/page-2.json"]');
    if(!section.length){
      loadDataFromPage('data/page-2.json');
    }
    section.show();
    currentPage = 'data/page-2.json';
  }
})

$('select[name="data2-images"]').on('change', function () {
  let $selection = $(this).val();
  console.log($selection);
  if ($selection === 'default') {
    $('section').show()
  } else {
    $('section').hide()
    $(`section[id="${$selection}"]`).show()
  }
})
