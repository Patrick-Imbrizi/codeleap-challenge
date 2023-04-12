import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/userSlice";
import styles from "./Signup.module.css";


const Signup = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch
    } = useForm();

    const usernameWatch = watch('username')

    const onSubmit = (data) => {
        try {
            setLoading(true)
            if (data.username) {
                dispatch(setUser(data))
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.signup}>
            <h1>Welcome to CodeLeap network!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        Please enter your username
                    </label>
                    <input
                        {...register("username")}
                        type={'text'}
                    />
                </div>
                <button
                    type='submit'
                    loading={loading}
                    disabled={!usernameWatch}
                    className={usernameWatch ? styles.signupbtn : styles.signupbtnDisabled}
                >
                    ENTER
                </button>
            </form>
        </div>
    )
}

export default Signup;