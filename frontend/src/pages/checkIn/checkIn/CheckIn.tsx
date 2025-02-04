import styles from './CheckIn.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../../shared/ui/page/CheckInPage/CheckInPage';
import Input from '../../shared/ui/input/input/Input';
import Password from '../../shared/ui/input/password/Password';
import Politics from './policy/Policy';
import { Button } from 'shared/ui';
import { mapUserForm } from 'entities/profile';
import { Auth } from 'shared/api';
import { useDispatch } from 'react-redux';
import { selectProfile, setProfile } from 'app/providers/store';
import { useSelector } from 'react-redux';

export default function CheckInPage({ login = false }: any) {
	const [err, setErr]: any = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { role } = useSelector(selectProfile);

	useEffect(() => {
		if (role) {
			navigate('/');
		}
	}, [role]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		checkIn(e);
	}

	async function checkIn(e: FormEvent) {
		const data = mapUserForm(e);
		let profile, err;
		if (login) {
			[profile, err] = await Auth.login(data);
		} else {
			[profile, err] = await Auth.register(data);
		}

		if (!err) {
			dispatch(setProfile(profile));
			navigate('/', { replace: true });
		}
		setErr(err);
	}

	return (
		<Wrapper>
			<div className={styles.container}>
				<h1 className={styles.header}>
					{login ? 'Войти' : 'Зарегистрироваться'}
				</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					{!login && (
						<>
							<Input
								label="ФИО"
								dataKey="name"
								type="text"
								required
								// pattern="^[а-яА-ЯёЁ]{3,} [а-яА-ЯёЁ]{3,} [а-яА-ЯёЁ]{3,}$"
								placeholder="Иванов Иван Иванович"
							/>
						</>
					)}
					{!login && (
						<>
							<Input
								label="Введите дату рождения"
								dataKey="birthday"
								type="date"
								min="1900-01-01"
								max="2024-01-01"
								required
							/>
						</>
					)}

					<Input
						label="Ваш e-mail"
						dataKey="email"
						type="email"
						required
						placeholder="ivanov@example.com"
					/>

					<Password />

					{login && (
						<div className={styles.forget_password}>
							<Link to="/change-password" className={styles.link}>
								Забыли пароль?
							</Link>
						</div>
					)}

					{err && <div className={styles.error}>{err}</div>}

					<Politics />

					<div className={styles.btn_container}>
						<Button
							title={login ? 'Войти' : 'Зарегистрироваться'}
							type="submit"
							width="100%"
							height="53px"
							bgColor="light"
						/>

						{login && (
							<>
								<label htmlFor="registration" className={styles.link}>
									Нет аккаунта?
								</label>
								<Button
									title="Зарегистрироваться"
									id="registration"
									onClick={() => {
										setErr(null);
										navigate('/registration');
									}}
									className={styles.register_btn}
									bgColor="dark"
								/>
							</>
						)}
					</div>
				</form>
			</div>
		</Wrapper>
	);
}
