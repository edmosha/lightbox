import styles from '../styles/Gallary.module.css'

const Gallery = (props) => {

  const handleImport = async (e) => {
    e.preventDefault();

    const PhotoSwipeLightbox = (await import('photoswipe/lightbox')).default
    await import('photoswipe/style.css').default

    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();

    const gallery = e.target.closest('#' + props.galleryID);
    const targetIndex = [...gallery.children].indexOf(e.target.parentNode)

    lightbox.loadAndOpen(
      targetIndex, {
        gallery: gallery
      }
    );
  }

  return (
    <div className={styles.gallery} id={props.galleryID}>
      {props.images.map((image, index) => (
        <a className={styles.gallery__item}
           href={image.largeURL}
           data-pswp-width={image.width}
           data-pswp-height={image.height}
           key={props.galleryID + '-' + index}
           target="_blank"
           rel="noreferrer"
           onClick={handleImport}
        >
        <img className={styles.gallery__img} src={image.thumbnailURL} alt="" />
        </a>
      ))}
    </div>
  );
};

export default Gallery;