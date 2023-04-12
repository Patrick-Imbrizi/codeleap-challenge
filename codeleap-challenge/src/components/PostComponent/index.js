import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './Post.module.css'
import del from '../../../public/assets/delete.png';
import edit from '../../../public/assets/edit.png';
import ReactTimeAgo from 'react-time-ago';
import { useAppSelector } from '../redux/store';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost, updatePost } from '@/services/careers';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import RemovePostComponent from '../RemovePostComponent';
import EditPostComponent from '../EditPostComponent';

const Post = ({ title, username, content, id, datetime }) => {
    const { user } = useAppSelector(state => state.user);
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const mutation = useMutation(deletePost, {
        onSuccess: () => {
            toast.success("Post deleted!")
            queryClient.invalidateQueries('careers')
        }
    })

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleEditOpenModal = (e) => {
        setIsEditModalOpen(true);
    };

    const handleEditCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleCanAction = () => {
        if (username === user.username) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (isModalOpen || isEditModalOpen) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [isModalOpen, isEditModalOpen]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <p>{title}</p>
                    {handleCanAction() && (
                        <div>
                            <button
                                onClick={handleOpenModal}
                                className={styles.icon}
                            >
                                <Image src={del} width={32} alt="Delete post" />
                            </button>
                            <button
                                onClick={handleEditOpenModal}
                                className={styles.icon}
                            >
                                <Image src={edit} width={32} alt="Edit post" />
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.label}>
                        <p>@{username}</p>
                        <p>{datetime}</p>
                    </div>
                    <div className={styles.text}>
                        <p>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <RemovePostComponent onClose={handleCloseModal} onRemovePost={() => mutation.mutate(id)} />
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={handleEditCloseModal}>
                <EditPostComponent onClose={handleEditCloseModal} postId={id} data={{ title, username, content, id, datetime }} />
            </Modal>
        </>
    )
}

export default Post;

