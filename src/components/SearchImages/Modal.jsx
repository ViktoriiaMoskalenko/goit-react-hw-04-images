import styles from './SearchImages.module.css'

export function Modal({onClose, img}) {

    window.addEventListener('keydown', handleKeyDown)
    
    function handleKeyDown(event) {
        if (event.code === 'Escape') {
                console.log(event.code)
                onClose()
            }
    }

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose()
        }
    }

        return (
        <div className={styles.Overlay} onClick = {handleBackdropClick}>
  <div className={styles.Modal}>
    <img src={img} alt="" />
  </div>
</div>
    )
}