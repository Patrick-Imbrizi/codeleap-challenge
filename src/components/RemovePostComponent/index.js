import React from 'react';
import styles from './RemovePostComponent.module.css'

function RemovePostComponent({ onClose, onRemovePost }) {

    const handleRemovePost = () => {
        onRemovePost()
        onClose()
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Are you sure you want to delete this item?</h1>
            <div className={styles.contentActions}>
                <button className={styles.cancelbtn} onClick={onClose}>Cancel</button>
                <button className={styles.deletebtn} onClick={handleRemovePost}>Delete</button>
            </div>
        </div>
    )
}

export default RemovePostComponent;