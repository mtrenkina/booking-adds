const IMG_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const upload = document.querySelector('.ad-form__photo');

export const DEFAULT_AVATAR = '../img/muffin-grey.svg';
export const previewAvatar = document.querySelector('.ad-form-header__preview img');
export const DEFAULT_PHOTO = '';
export const previewPhoto = document.createElement('img');
previewPhoto.style.display = 'flex';
previewPhoto.style.maxWidth = '100%';
previewPhoto.style.height = 'auto';

upload.append(previewPhoto);

export const clearOutImage = (element, source) => {
  element.src = source;
};

const onFileUpload = (chooser, preview, fileTypes) => (evt) => {
  evt.preventDefault();
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

fileChooserAvatar.addEventListener('change', onFileUpload(fileChooserAvatar, previewAvatar, IMG_TYPES));
fileChooserPhoto.addEventListener('change', onFileUpload(fileChooserPhoto, previewPhoto, IMG_TYPES));
