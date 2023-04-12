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

const Post = ({ title, username, content, id, datetime }) => {
    const { user } = useAppSelector(state => state.user);
    const queryClient = useQueryClient();

    const handleCanAction = () => {
        if (username === user.username) {
            return true
        } else {
            return false
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p>{title}</p>
                {handleCanAction() && (
                    <div>
                        <button
                            onClick={(e) => console.log(e)}
                            className={styles.icon}
                        >
                            <Image src={del} width={32} alt="Delete post" />
                        </button>
                        <button
                            onClick={(e) => console.log(e)}
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
    )
}

export default Post;

