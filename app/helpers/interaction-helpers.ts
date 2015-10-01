import $ from 'jquery';

class InteractionHelper {
  scrollToElement(element) {
     $('html, body').animate({
            scrollTop: $(element).offset().top
     }, 500);
  }
}

export default new InteractionHelper();
