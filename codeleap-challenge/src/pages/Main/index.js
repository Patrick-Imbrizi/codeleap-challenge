import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/components/redux/store';
import { logout } from '@/components/redux/userSlice';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPost } from '@/services/careers';

import styles from '@/styles/Main.module.css';

function Main() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user);
    const queryClient = useQueryClient();

    const mutation = useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('carrers')
        }
    });

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors }
    } = useForm();

    const addPost = (e) => {
        const postModel = {
            username: user.username,
            title: e.title,
            content: e.content
        };
        mutation.mutate(postModel);
        resetField('title');
        resetField('content');
    };

    const handleLogout = () => {
        dispatch(logout())
    };

    // add Loading component here

    // if (isLoading) {
    //     return <Loading />
    // }

    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }

    return (
        <>
            <div className={styles.heading}>
                <h1>CodeLeap Network</h1>
                <div onClick={handleLogout}>
                    <AiOutlineUserSwitch size={24} color={'white'} />
                </div>
            </div>
            <div className={styles.newpost}>
                <p>What's on your mind?</p>
                <form onSubmit={handleSubmit(addPost)}>
                    <div>
                        <label>
                            Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            className={styles.titleInput}
                            placeholder={'Hello World'}
                        />
                        {errors.title && <span className={styles.requiredtext}>Title field is required.</span>}
                    </div>
                    <div>
                        <label>
                            Content
                        </label>
                        <textarea
                            rows={8}
                            {...register('content', { required: true })}
                            className={styles.content}
                            placeholder={'Content here'}
                        />
                        {errors.content && <span className={styles.requiredtext}>Content field is required.</span>}
                    </div>
                    <button
                        type={'submit'}
                        className={styles.submitbtn}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'Wait...' : 'Create'}
                    </button>
                </form>
                {/* Render post list here
                <div>

                </div> */}
            </div>
        </>
    )
}

export default Main;