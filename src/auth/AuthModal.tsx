import type { FormEvent } from 'react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { setCookie } from 'cookies-next';
import { useLoginMutation } from '../graphql/__generated__/generated-documents';
import { useLayoutContext } from '../contexts/LayoutContext';
import { Button } from '../components/Button/Button';
import { config } from '../config/config';

type LoginFormElements = {
  username: HTMLInputElement;
  password: HTMLInputElement;
} & HTMLFormControlsCollection;

type LoginForm = {
  readonly elements: LoginFormElements;
} & HTMLFormElement;

export const AuthModal = () => {
  const { authed, setAuthed } = useLayoutContext();
  const [openModal, setOpenModal] = useState(!authed);
  const [error, setError] = useState<string | null>(null);
  const [loginMutation] = useLoginMutation();

  const handleSubmit = async (e: FormEvent<LoginForm>) => {
    e.preventDefault();

    const { data } = await loginMutation({
      variables: {
        username: e.currentTarget?.username?.value as string,
        password: e.currentTarget?.password?.value as string,
      },
    });

    if (data?.login?.token) {
      setOpenModal(false);
      setError(null);
      setAuthed(true);
      setCookie(config.tokenName, data?.login?.token, {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      return;
    }

    setError('login failed');
  };

  if (openModal) {
    return (
      <Modal
        isOpen={openModal}
        closeClassName="absolute top-0 right-0 m-4"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <h2>Datamed Restricted Access </h2>
        <form className="flex flex-col gap-3 my-4" onSubmit={handleSubmit}>
          <input required type="text" name="username" placeholder="username" />
          <input required type="password" name="password" placeholder="password" />
          <Button as="button" type="submit">
            Se connecter
          </Button>
        </form>

        {error && <p className="text-red">{error}</p>}
      </Modal>
    );
  }

  return null;
};
