const IMG_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const upload = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = '../img/muffin-grey.svg';
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const DEFAULT_PHOTO = '';
const previewPhoto = document.createElement('img');
previewPhoto.style.display = 'flex';
previewPhoto.style.maxWidth = '100%';
previewPhoto.style.height = 'auto';
upload.append(previewPhoto);

export const clearOutImages = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhoto.src = DEFAULT_PHOTO;
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
