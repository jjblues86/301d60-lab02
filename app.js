'use strict';

const allImages = [];


// creating a constructor for all the images
function Images(title,image_url,description,keyword,horn){
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horn = horn;

  allImages.push(this);
}


// creating a cloned copy for rendering the images
Images.prototype.renderClonedImages = function(){

  let clone = $(`#photo-template`).clone();

  clone.find('h2').text(this.title);
  clone.find('img').attr('src', this.image_url);
  clone.find('p').text(this.description);

  $('main').append(clone);
}

$.get('data.json').then(
  (data) => {
    data.forEach(allImagesFile => {
      let images = new Images(allImagesFile.title, allImagesFile.image_url, allImagesFile.description, allImagesFile.keyword);
      images.renderClonedImages();
    });
  });

