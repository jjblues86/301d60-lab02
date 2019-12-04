'use strict';

const allImages = [];
const keys = [];


// creating a constructor for all the images
function Images(title, image_url, description, keyword, horn) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horn = horn;

  allImages.push(this);
}


// creating a cloned copy for rendering the images
Images.prototype.renderClonedImages = function () {

  let clone = $(`#photo-template`).clone();

  clone.find('h2').text(this.title);
  clone.find('img').attr('src', this.image_url);
  clone.attr('id', this.keyword);
  clone.find('p').text(this.description);
  clone.removeAttr('class');
  $('main').append(clone);
}



$.get('data.json').then(
  (data) => {
    data.forEach(allImagesFile => {
      let images = new Images(allImagesFile.title, allImagesFile.image_url, allImagesFile.description, allImagesFile.keyword);
      images.renderClonedImages();
      images.optionMenu();
    })
    $('#photo-template').hide();

  });

// creating the option
Images.prototype.optionMenu = function () {
  if (keys.indexOf(this.keyword) === -1) {
    $('select').append('<option class = "option"></option>');
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
  console.log($selection);

  if ($selection === 'default') {
    $('section').show()
    $('#photo-template').hide();
  } else {

    $('section').hide()
    $(`section[id="${$selection}"]`).show()
  }
})

