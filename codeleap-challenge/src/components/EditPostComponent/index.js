import React from 'react';
import { useForm } from 'react-hook-form';
import { updatePost } from '@/services/careers';
import { useMutation, useQueryClient } from 'react-query';
import styles from './Edit.module.css';
import { toast } from 'react-toastify';


function EditPostComponent({ onClose, postId, data }) {

    const queryClient = useQueryClient()
    const mutation = useMutation(updatePost, {
        onSuccess: (e) => {
            toast.success("Post updated!")
            queryClient.invalidateQueries('careers')
            onClose()
        }
    })


    const onEditPost = (data) => {
        const patchModel = {
            title: data.title,
            content: data.content
        }
        mutation.mutate({ id: postId, data: patchModel });
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const titleWatch = watch('title');
    const contentWatch = watch('content');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit item</h1>
            <div>
                <form onSubmit={handleSubmit(onEditPost)}>
                    <div>
                        <label>
                            Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            className={styles.titleEdit}
                            placeholder={'Hello world'}
                            type={'text'}
                            defaultValue={data.title}
                        />
                        {errors.title && <span className={styles.requiredtext}>Title field is required</span>}
                    </div>
                    <div>
                        <label>
                            Content
                        </label>
                        <textarea
                            rows={8}
                            {...register("content", { required: true })}
                            className={styles.content}
                            placeholder={'Content here'}
                            defaultValue={data.content}
                        />
                        {errors.content && <span className={styles.requiredtext}>Content field is required</span>}
                    </div>
                    <div className={styles.contentActions}>
                        <button
                            className={styles.cancelbtn}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className={styles.savebtn}
                            disabled={!titleWatch || !contentWatch}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPostComponent;